
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

interface SuggestionFormProps {
  type: 'bug' | 'feature' | 'feedback' | 'development' | 'edit';
  initiativeId?: string;
  onSuccess?: () => void;
}

const SuggestionForm: React.FC<SuggestionFormProps> = ({ type, initiativeId, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast({
        title: "Bitte geben Sie Ihr Feedback ein",
        description: "Die Nachricht darf nicht leer sein.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Mock submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Vielen Dank!",
        description: "Ihre Nachricht wurde erfolgreich übermittelt.",
      });
      
      setName('');
      setEmail('');
      setContent('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'bug':
        return 'Problem melden';
      case 'feature':
        return 'Verbesserung vorschlagen';
      case 'development':
        return 'Neue Entwicklung';
      case 'edit':
        return 'Korrektur vorschlagen';
      case 'feedback':
      default:
        return 'Feedback geben';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'bug':
        return 'Haben Sie einen Fehler gefunden? Beschreiben Sie das Problem so genau wie möglich.';
      case 'feature':
        return 'Haben Sie eine Idee, wie wir den Tracker verbessern können?';
      case 'development':
        return 'Informieren Sie uns über eine neue Entwicklung bei diesem Vorhaben.';
      case 'edit':
        return 'Haben Sie eine Korrektur für die Informationen zu diesem Vorhaben?';
      case 'feedback':
      default:
        return 'Teilen Sie Ihre Gedanken, Feedback oder Ideen mit uns und tragen Sie zur Verbesserung dieses Projekts bei.';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">{getTitle()}</h3>
        <p className="text-muted-foreground mt-1">{getDescription()}</p>
      </div>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="name">Name <span className="text-sm text-muted-foreground">(freiwillig)</span></Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ihr Name"
          />
        </div>
        
        <div>
          <Label htmlFor="email">E-Mail <span className="text-sm text-muted-foreground">(freiwillig)</span></Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ihre E-Mail-Adresse"
          />
        </div>
        
        <div>
          <Label htmlFor="content">Ihre Nachricht</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Beschreiben Sie Ihr Anliegen..."
            rows={5}
            required
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-coalition-primary hover:bg-coalition-secondary"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Wird gesendet...' : 'Absenden'}
      </Button>
    </form>
  );
};

export default SuggestionForm;
