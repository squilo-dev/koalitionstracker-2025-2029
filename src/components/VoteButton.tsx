
import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { InitiativeVote } from '@/types/supabase';

interface VoteButtonProps {
  initiativeId: string;
  initialUpvotes?: number;
  initialDownvotes?: number;
  horizontal?: boolean;
}

interface VoteResponse {
  status: string;
  vote_type: 'up' | 'down' | null;
}

const VoteButton: React.FC<VoteButtonProps> = ({ 
  initiativeId, 
  initialUpvotes = 0, 
  initialDownvotes = 0,
  horizontal = false
}) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const voteScore = upvotes - downvotes;
  
  // Get a unique user ID from localStorage or create one
  const getUserId = () => {
    let userId = localStorage.getItem('voter_id');
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem('voter_id', userId);
    }
    return userId;
  };
  
  // Fetch the user's current vote on this initiative
  const fetchUserVote = async () => {
    const userId = getUserId();
    
    try {
      const { data, error } = await supabase
        .rpc('handle_vote', {
          p_initiative_id: initiativeId,
          p_user_id: userId,
          p_vote_type: 'check'
        });
        
      if (error) throw error;
      
      // Safely cast the response
      if (data && typeof data === 'object') {
        // Make sure the data has the required structure before casting
        if ('vote_type' in data && typeof data.vote_type === 'string') {
          const voteType = data.vote_type as 'up' | 'down' | null;
          setUserVote(voteType);
        }
      }
    } catch (error) {
      console.error('Error fetching user vote:', error);
    }
  };
  
  const handleVote = async (voteType: 'up' | 'down') => {
    if (isLoading) return;
    
    setIsLoading(true);
    const userId = getUserId();
    
    try {
      const { data, error } = await supabase
        .rpc('handle_vote', {
          p_initiative_id: initiativeId,
          p_user_id: userId,
          p_vote_type: voteType
        });
      
      if (error) throw error;
      
      // Update local state based on response
      if (data && typeof data === 'object') {
        // Make sure the data has the required structure before using it
        if ('vote_type' in data) {
          const newVoteType = data.vote_type as 'up' | 'down' | null;
          
          // Get updated vote counts from the initiatives table
          const { data: updatedInitiative, error: fetchError } = await supabase
            .from('initiatives')
            .select('upvotes, downvotes')
            .eq('id', initiativeId)
            .single();
          
          if (fetchError) throw fetchError;
          
          if (updatedInitiative) {
            setUpvotes(updatedInitiative.upvotes || 0);
            setDownvotes(updatedInitiative.downvotes || 0);
          }
          
          setUserVote(newVoteType);
        }
      }
      
    } catch (error) {
      console.error('Error voting:', error);
      toast({
        title: "Fehler beim Abstimmen",
        description: "Bitte versuchen Sie es später noch einmal.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Set up realtime subscription for vote updates
  useEffect(() => {
    const channel = supabase
      .channel('vote-changes')
      .on('postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'initiatives',
          filter: `id=eq.${initiativeId}`
        }, 
        (payload) => {
          const newData = payload.new as any;
          if (newData) {
            setUpvotes(newData.upvotes || 0);
            setDownvotes(newData.downvotes || 0);
          }
        }
      )
      .subscribe();
      
    // Fetch initial vote state
    fetchUserVote();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [initiativeId]);
  
  return (
    <div className={`flex ${horizontal ? 'flex-row' : 'flex-col'} items-center gap-1`}>
      <Button 
        variant="ghost" 
        size="icon" 
        className={`text-gray-500 hover:text-green-600 ${userVote === 'up' ? 'text-green-600' : ''}`}
        onClick={() => handleVote('up')}
        disabled={isLoading}
      >
        <ArrowUp size={horizontal ? 16 : 20} />
      </Button>
      
      <span className={`text-sm font-medium ${voteScore > 0 ? 'text-green-600' : voteScore < 0 ? 'text-red-600' : 'text-gray-500'}`}>
        {voteScore}
      </span>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className={`text-gray-500 hover:text-red-600 ${userVote === 'down' ? 'text-red-600' : ''}`}
        onClick={() => handleVote('down')}
        disabled={isLoading}
      >
        <ArrowDown size={horizontal ? 16 : 20} />
      </Button>
    </div>
  );
};

export default VoteButton;
