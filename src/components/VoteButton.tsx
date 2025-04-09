
import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { submitVote } from '@/services/initiativeService';

interface VoteButtonProps {
  initiativeId: string;
  initialUpvotes?: number;
  initialDownvotes?: number;
  compact?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const VoteButton: React.FC<VoteButtonProps> = ({ 
  initiativeId, 
  initialUpvotes = 0, 
  initialDownvotes = 0,
  compact = false,
  onClick
}) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  // Get vote score
  const voteScore = upvotes - downvotes;

  // Subscribe to real-time vote updates
  useEffect(() => {
    const channel = supabase
      .channel('initiative_votes_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'initiative_votes',
          filter: `initiative_id=eq.${initiativeId}`
        },
        () => {
          // Refresh the initiative data when votes change
          queryClient.invalidateQueries({
            queryKey: ['initiatives']
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [initiativeId, queryClient]);

  // Get or generate a user ID
  useEffect(() => {
    const storedUserId = localStorage.getItem('voter_id');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = uuidv4();
      localStorage.setItem('voter_id', newUserId);
      setUserId(newUserId);
    }

    // Check if user has already voted
    const checkUserVote = async () => {
      if (!userId) return;
      
      const { data, error } = await supabase
        .from('initiative_votes')
        .select('vote_type')
        .eq('initiative_id', initiativeId)
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error checking user vote:', error);
        return;
      }

      if (data) {
        setUserVote(data.vote_type as 'up' | 'down');
      }
    };

    checkUserVote();
  }, [initiativeId, userId]);

  // Handle vote
  const handleVote = async (e: React.MouseEvent, voteType: 'up' | 'down') => {
    e.stopPropagation(); // Prevent the click from bubbling up
    
    if (!userId) {
      toast({
        title: "Fehler beim Abstimmen",
        description: "Benutzer-ID nicht gefunden. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Optimistic UI update
      if (userVote === voteType) {
        // Removing vote
        if (voteType === 'up') {
          setUpvotes(prev => prev - 1);
        } else {
          setDownvotes(prev => prev - 1);
        }
        setUserVote(null);
      } else if (userVote) {
        // Changing vote
        if (userVote === 'up') {
          setUpvotes(prev => prev - 1);
          setDownvotes(prev => prev + 1);
        } else {
          setUpvotes(prev => prev + 1);
          setDownvotes(prev => prev - 1);
        }
        setUserVote(voteType);
      } else {
        // New vote
        if (voteType === 'up') {
          setUpvotes(prev => prev + 1);
        } else {
          setDownvotes(prev => prev + 1);
        }
        setUserVote(voteType);
      }

      // Call the handle_vote function in the database
      const { data, error } = await supabase.rpc('handle_vote', {
        p_initiative_id: initiativeId,
        p_user_id: userId,
        p_vote_type: voteType
      });

      if (error) {
        console.error('Error submitting vote:', error);
        toast({
          title: "Fehler beim Abstimmen",
          description: "Bitte versuchen Sie es später noch einmal.",
          variant: "destructive",
        });
        
        // Revert the optimistic update
        setUpvotes(initialUpvotes);
        setDownvotes(initialDownvotes);
        
        // Recheck user vote
        const { data: voteData } = await supabase
          .from('initiative_votes')
          .select('vote_type')
          .eq('initiative_id', initiativeId)
          .eq('user_id', userId)
          .maybeSingle();
          
        setUserVote(voteData?.vote_type as 'up' | 'down' || null);
      }
      
      // Submit vote to our service for additional processing if needed
      await submitVote({
        initiative_id: initiativeId,
        vote_type: voteType
      });
      
    } catch (error) {
      console.error('Error voting:', error);
      toast({
        title: "Fehler beim Abstimmen",
        description: "Bitte versuchen Sie es später noch einmal.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className={`flex ${compact ? 'flex-row' : 'flex-col'} items-center gap-1`}>
      <Button 
        variant="ghost" 
        size="icon" 
        className={`text-gray-500 hover:text-green-600 ${userVote === 'up' ? 'text-green-600' : ''}`}
        onClick={(e) => handleVote(e, 'up')}
      >
        <ArrowUp size={compact ? 16 : 20} />
      </Button>
      
      <span className={`text-sm font-medium ${voteScore > 0 ? 'text-green-600' : voteScore < 0 ? 'text-red-600' : 'text-gray-500'}`}>
        {voteScore}
      </span>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className={`text-gray-500 hover:text-red-600 ${userVote === 'down' ? 'text-red-600' : ''}`}
        onClick={(e) => handleVote(e, 'down')}
      >
        <ArrowDown size={compact ? 16 : 20} />
      </Button>
    </div>
  );
};

export default VoteButton;
