export interface ThemeCategory {
  id: string;
  label: string;
}

export interface InitiativeStatus {
  id: string;
  label: string;
  color: string;
}

export interface Initiative {
  id: string;
  created_at: string;
  title: string;
  description: string;
  status_id: string;
  category_id: string;
  last_updated: string;
  koalitionsvertrag_text?: string;
  koalitionsvertrag_page?: number;
  upvotes?: number;
  downvotes?: number;
}

export interface VotePayload {
  initiative_id: string;
  user_id: string;
  vote_type: 'up' | 'down';
}

export interface InitiativeVote {
  id: string;
  initiative_id: string;
  user_id: string;
  vote_type: 'up' | 'down';
  created_at: string;
}

export interface SuggestionPayload {
  type: 'edit' | 'development' | 'bug';
  initiative_id?: string;
  name: string;
  email: string;
  content: string;
}

export interface RecentDevelopment {
  id: string;
  initiative_id: string;
  title: string;
  date: string;
  url?: string;
}
