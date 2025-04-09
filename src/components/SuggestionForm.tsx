
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SuggestionPayload } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';

const suggestionSchema = z.object({
  name: z.string().min(2, { message: 'Name muss mindestens 2 Zeichen lang sein.' }),
  email: z.string().email({ message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' }),
  content: z.string().min(10, { message: 'Inhalt muss mindestens 10 Zeichen lang sein.' }),
});

interface SuggestionFormProps {
  type: 'edit' | 'development' | 'bug';
  initiativeId?: string;
  onSuccess?: () => void;
}

const SuggestionForm: React.FC<SuggestionFormProps> = ({ type, initiativeId, onSuccess }) => {
  const form = useForm<z.infer<typeof suggestionSchema>>({
    resolver: zodResolver(suggestionSchema),
    defaultValues: {
      name: '',
      email: '',
      content: '',
    },
  });

  const getTitle = () => {
    switch(type) {
      case 'edit': return 'Änderung vorschlagen';
      case 'development': return 'Neue Entwicklung vorschlagen';
      case 'bug': return 'Fehler melden';
      default: return 'Vorschlag einreichen';
    }
  };

  const getDescription = () => {
    switch(type) {
      case 'edit': return 'Schlagen Sie eine Änderung für dieses Vorhaben vor.';
      case 'development': return 'Teilen Sie uns eine neue Entwicklung zu diesem Vorhaben mit.';
      case 'bug': return 'Bitte beschreiben Sie den gefundenen Fehler so genau wie möglich.';
      default: return 'Reichen Sie Ihren Vorschlag ein.';
    }
  };

  const getContentPlaceholder = () => {
    switch(type) {
      case 'edit': return 'Ihre vorgeschlagene Änderung...';
      case 'development': return 'Beschreiben Sie die neue Entwicklung und fügen Sie ggf. einen Link hinzu...';
      case 'bug': return 'Beschreiben Sie den Fehler. Welche Schritte haben zum Fehler geführt?';
      default: return 'Ihr Vorschlag...';
    }
  };

  const onSubmit = async (data: z.infer<typeof suggestionSchema>) => {
    try {
      // In a real app we would send this to an API endpoint
      const payload: SuggestionPayload = {
        type,
        initiative_id: initiativeId,
        name: data.name,
        email: data.email,
        content: data.content,
      };

      console.log('Sending suggestion:', payload);
      
      // Simulate submission success
      toast({
        title: "Vielen Dank!",
        description: "Ihr Vorschlag wurde erfolgreich eingereicht.",
      });
      
      if (onSuccess) {
        onSuccess();
      }
      
      form.reset();
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      toast({
        title: "Fehler",
        description: "Es gab einen Fehler beim Einreichen Ihres Vorschlags. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4 p-1">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold">{getTitle()}</h2>
        <p className="text-muted-foreground">{getDescription()}</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ihr Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input placeholder="ihre-email@beispiel.de" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inhalt</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={getContentPlaceholder()}
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full">Absenden</Button>
        </form>
      </Form>
    </div>
  );
};

export default SuggestionForm;
