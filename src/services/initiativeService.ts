
import { supabase } from "@/integrations/supabase/client";
import { 
  Initiative, 
  InitiativeStatus, 
  ThemeCategory, 
  RecentDevelopment,
  VotePayload,
  SuggestionPayload
} from "@/types/supabase";

export async function getThemeCategories(): Promise<ThemeCategory[]> {
  const { data, error } = await supabase
    .from('theme_categories')
    .select('*')
    .order('label');
  
  if (error) {
    console.error('Error fetching theme categories:', error);
    return [];
  }
  
  return data || [];
}

export async function getInitiativeStatuses(): Promise<InitiativeStatus[]> {
  const { data, error } = await supabase
    .from('initiative_statuses')
    .select('*');
  
  if (error) {
    console.error('Error fetching initiative statuses:', error);
    return [];
  }
  
  return data || [];
}

export async function getInitiatives(): Promise<Initiative[]> {
  const { data, error } = await supabase
    .from('initiatives')
    .select('*');
  
  if (error) {
    console.error('Error fetching initiatives:', error);
    return [];
  }
  
  return data || [];
}

export async function getRecentDevelopmentsByInitiative(initiativeId: string): Promise<RecentDevelopment[]> {
  const { data, error } = await supabase
    .from('recent_developments')
    .select('*')
    .eq('initiative_id', initiativeId)
    .order('date', { ascending: false });
  
  if (error) {
    console.error('Error fetching recent developments:', error);
    return [];
  }
  
  return data || [];
}

export async function getInitiativeById(id: string): Promise<Initiative | null> {
  const { data, error } = await supabase
    .from('initiatives')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching initiative:', error);
    return null;
  }
  
  return data;
}

// This function submits a vote to the Supabase database
export async function submitVote(payload: VotePayload): Promise<void> {
  try {
    // Get the user_id from local storage
    const userId = localStorage.getItem('voter_id');
    
    if (!userId) {
      console.error('No user ID found for voting');
      return;
    }
    
    // Call the handle_vote RPC function
    const { error } = await supabase.rpc('handle_vote', {
      p_initiative_id: payload.initiative_id,
      p_user_id: userId,
      p_vote_type: payload.vote_type
    });
    
    if (error) {
      console.error('Error submitting vote:', error);
    }
  } catch (error) {
    console.error('Error in submitVote:', error);
  }
}

// This function submits a suggestion (edit, development, or bug)
export async function submitSuggestion(payload: SuggestionPayload): Promise<void> {
  // In a real implementation, this would send an email and/or store the suggestion
  console.log('Suggestion submitted:', payload);
  
  // In a production app, this would send an email to louis.muench2@gmail.com
  // We're just logging to console for this demo
}

export function getStatusCountsByCategory(
  initiatives: Initiative[],
  statusMap: Record<string, InitiativeStatus>,
  categoryId?: string
): Record<string, number> {
  const filtered = categoryId 
    ? initiatives.filter(item => item.category_id === categoryId)
    : initiatives;
  
  const statusCounts: Record<string, number> = {};
  
  // Initialize all status counts to 0
  Object.keys(statusMap).forEach(statusId => {
    statusCounts[statusId] = 0;
  });
  
  // Count initiatives by status
  filtered.forEach(item => {
    statusCounts[item.status_id] = (statusCounts[item.status_id] || 0) + 1;
  });
  
  return statusCounts;
}

export function getCategoriesWithStatusCounts(
  initiatives: Initiative[],
  statusMap: Record<string, InitiativeStatus>,
  categoryMap: Record<string, ThemeCategory>
): {
  category: string;
  counts: Record<string, number>;
  total: number;
}[] {
  const categoryIds = [...new Set(initiatives.map(item => item.category_id))];
  
  return categoryIds.map(categoryId => {
    const counts = getStatusCountsByCategory(initiatives, statusMap, categoryId);
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    
    return {
      category: categoryId,
      counts,
      total
    };
  });
}

export function getStatusPercentages(counts: Record<string, number>): Record<string, number> {
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  if (total === 0) {
    // Return zero percentages for all statuses
    return Object.keys(counts).reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {} as Record<string, number>);
  }
  
  // Calculate percentages
  return Object.entries(counts).reduce((acc, [key, count]) => {
    acc[key] = (count / total) * 100;
    return acc;
  }, {} as Record<string, number>);
}
