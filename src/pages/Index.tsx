
import React, { useState, useMemo } from 'react';
import { 
  Initiative, 
  InitiativeStatus, 
  ThemeCategory, 
  initiatives as initialInitiatives 
} from '@/data/coalitionData';
import FilterSearchBar from '@/components/FilterSearchBar';
import InitiativesList from '@/components/InitiativesList';
import StatusBarChart from '@/components/StatusBarChart';
import CategoryBarCharts from '@/components/CategoryBarCharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<InitiativeStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<ThemeCategory | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'byTheme'>('all');

  // Check if any filters are applied
  const hasFilters = searchQuery !== '' || statusFilter !== 'all' || categoryFilter !== 'all';

  // Filter initiatives based on search and filters
  const filteredInitiatives = useMemo(() => {
    return initialInitiatives.filter((initiative) => {
      // Apply search filter
      const matchesSearch = 
        searchQuery === '' || 
        initiative.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        initiative.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Apply status filter
      const matchesStatus = statusFilter === 'all' || initiative.status === statusFilter;
      
      // Apply category filter
      const matchesCategory = categoryFilter === 'all' || initiative.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, statusFilter, categoryFilter]);

  // Function to clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('all');
  };

  // Get selected category for the themed view
  const selectedCategory = categoryFilter !== 'all' ? categoryFilter : null;

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-coalition-dark">
          Koalitionskompass Deutschland
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Verfolgen Sie den Fortschritt bei der Umsetzung des Koalitionsvertrags der aktuellen Bundesregierung.
        </p>
      </header>
      
      <div className="mb-8">
        <FilterSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          hasFilters={hasFilters}
          clearFilters={clearFilters}
        />
      </div>
      
      <div className="mb-8">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'all' | 'byTheme')}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">Gesamtübersicht</TabsTrigger>
            <TabsTrigger value="byTheme">Nach Themen</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-8">
            <StatusBarChart 
              initiatives={filteredInitiatives}
              title="Statusverteilung aller Initiativen"
            />
            
            <h2 className="text-2xl font-semibold mb-4">Initiativen ({filteredInitiatives.length})</h2>
            <InitiativesList initiatives={filteredInitiatives} />
          </TabsContent>
          
          <TabsContent value="byTheme" className="space-y-8">
            <CategoryBarCharts 
              initiatives={filteredInitiatives}
              selectedCategory={selectedCategory}
            />
            
            <h2 className="text-2xl font-semibold mb-4">
              {selectedCategory ? `${selectedCategory} Initiativen` : 'Initiativen nach Themen'}
              {' '}({filteredInitiatives.length})
            </h2>
            <InitiativesList initiatives={filteredInitiatives} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
