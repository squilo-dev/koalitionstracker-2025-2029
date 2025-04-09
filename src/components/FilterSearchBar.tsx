
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InitiativeStatus, ThemeCategory, statusLabels, themeLabels } from '@/data/coalitionData';
import { Search, X } from 'lucide-react';

interface FilterSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: InitiativeStatus | 'all';
  setStatusFilter: (status: InitiativeStatus | 'all') => void;
  categoryFilter: ThemeCategory | 'all';
  setCategoryFilter: (category: ThemeCategory | 'all') => void;
  hasFilters: boolean;
  clearFilters: () => void;
}

const FilterSearchBar: React.FC<FilterSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  hasFilters,
  clearFilters
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Suche nach Vorhaben..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as InitiativeStatus | 'all')}
          >
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Nach Status filtern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Status</SelectItem>
              {(Object.entries(statusLabels) as [InitiativeStatus, string][]).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={categoryFilter}
            onValueChange={(value) => setCategoryFilter(value as ThemeCategory | 'all')}
          >
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Nach Kategorie filtern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Kategorien</SelectItem>
              {(Object.entries(themeLabels) as [ThemeCategory, string][]).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {hasFilters && (
        <div className="flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="h-8 gap-1 text-sm text-muted-foreground"
          >
            <X className="h-3.5 w-3.5" />
            Filter zurücksetzen
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterSearchBar;
