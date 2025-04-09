
import React, { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';

interface VoteButtonProps {
  initiativeId: string;
  initialUpvotes?: number;
  initialDownvotes?: number;
  compact?: boolean;
}

const VoteButton: React.FC<VoteButtonProps> = ({ 
  initiativeId, 
  initialUpvotes = 0, 
  initialDownvotes = 0,
  compact = false
}) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  
  const voteScore = upvotes - downvotes;
  
  const handleVote = async (voteType: 'up' | 'down') => {
    try {
      // If user already voted this type, remove the vote
      if (userVote === voteType) {
        if (voteType === 'up') {
          setUpvotes(prev => prev - 1);
        } else {
          setDownvotes(prev => prev - 1);
        }
        setUserVote(null);
        
        // Here you would make an API call to remove the vote
        // await removeVote(initiativeId, voteType);
        
        return;
      }
      
      // If user already voted the opposite type, change the vote
      if (userVote !== null) {
        if (userVote === 'up') {
          setUpvotes(prev => prev - 1);
          setDownvotes(prev => prev + 1);
        } else {
          setUpvotes(prev => prev + 1);
          setDownvotes(prev => prev - 1);
        }
      } else {
        // New vote
        if (voteType === 'up') {
          setUpvotes(prev => prev + 1);
        } else {
          setDownvotes(prev => prev + 1);
        }
      }
      
      setUserVote(voteType);
      
      // Here you would make an API call to register the vote
      // await registerVote(initiativeId, voteType);
      
      localStorage.setItem(`vote-${initiativeId}`, voteType);
      
    } catch (error) {
      console.error('Error voting:', error);
      toast({
        title: "Fehler beim Abstimmen",
        description: "Bitte versuchen Sie es später noch einmal.",
        variant: "destructive",
      });
    }
  };
  
  React.useEffect(() => {
    // Check if user has already voted
    const savedVote = localStorage.getItem(`vote-${initiativeId}`);
    if (savedVote === 'up' || savedVote === 'down') {
      setUserVote(savedVote as 'up' | 'down');
    }
  }, [initiativeId]);
  
  return (
    <div className={`flex ${compact ? 'flex-row' : 'flex-col'} items-center gap-1`}>
      <Button 
        variant="ghost" 
        size="icon" 
        className={`text-gray-500 hover:text-green-600 ${userVote === 'up' ? 'text-green-600' : ''}`}
        onClick={() => handleVote('up')}
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
        onClick={() => handleVote('down')}
      >
        <ArrowDown size={compact ? 16 : 20} />
      </Button>
    </div>
  );
};

export default VoteButton;
