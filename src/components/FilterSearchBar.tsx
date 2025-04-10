
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { InitiativeStatus } from '@/types/supabase';
import { Search, X, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface FilterSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string[];
  setStatusFilter: (status: string[]) => void;
  statusMap: Record<string, InitiativeStatus>;
  hasFilters: boolean;
  clearFilters: () => void;
}

const FilterSearchBar: React.FC<FilterSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  statusMap,
  hasFilters,
  clearFilters
}) => {
  // Order statuses for display
  const statusOrder = [
    'umgesetzt',
    'teilweise-umgesetzt',
    'begonnen',
    'nicht-begonnen',
    'verschoben',
  ].filter(id => Object.keys(statusMap).includes(id));

  const toggleStatusFilter = (status: string) => {
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter(s => s !== status));
    } else {
      setStatusFilter([...statusFilter, status]);
    }
  };

  const allSelected = statusFilter.length === 0 || statusFilter.length === Object.keys(statusMap).length;

  const toggleAll = () => {
    if (allSelected) {
      setStatusFilter([]);
    } else {
      setStatusFilter(Object.keys(statusMap));
    }
  };

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
          {searchQuery && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1 h-8 w-8" 
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="flex gap-3 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-[170px] justify-between">
                <span>{allSelected ? 'Alle Status' : `${statusFilter.length} Status ausgewählt`}</span>
                <span className="ml-2">▼</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuCheckboxItem 
                checked={allSelected}
                onCheckedChange={toggleAll}
              >
                Alle Status
              </DropdownMenuCheckboxItem>
              
              {statusOrder.map((statusId) => (
                <DropdownMenuCheckboxItem 
                  key={statusId}
                  checked={statusFilter.includes(statusId) || allSelected}
                  onCheckedChange={() => toggleStatusFilter(statusId)}
                >
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-sm mr-2" 
                      style={{ backgroundColor: statusMap[statusId]?.color || '#cbd5e1' }}
                    ></div>
                    {statusMap[statusId]?.label}
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {hasFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="h-8 gap-1 text-sm text-muted-foreground"
            >
              <X className="h-3.5 w-3.5" />
              Filter zurücksetzen
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSearchBar;
