
import React from 'react';
import { Button } from './ui/button';

interface VoteButtonProps {
  horizontal?: boolean;
}

const VoteButton: React.FC<VoteButtonProps> = ({ horizontal = false }) => {
  // This component has been simplified and no longer contains voting functionality
  return (
    <div className={`flex ${horizontal ? 'flex-row' : 'flex-col'} items-center gap-1`}>
      {/* Empty component - voting functionality removed */}
    </div>
  );
};

export default VoteButton;
