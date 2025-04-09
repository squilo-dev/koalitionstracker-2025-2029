
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
  title: string;
  description: string;
  status_id: string;
  category_id: string;
  date_added: string;
  last_updated: string;
  koalitionsvertrag_text?: string;
  koalitionsvertrag_page?: number;
}

export interface RecentDevelopment {
  id: string;
  initiative_id: string;
  date: string;
  title: string;
  url?: string;
}
