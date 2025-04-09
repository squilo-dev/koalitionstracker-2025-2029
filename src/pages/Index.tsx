import React, { useState, useMemo } from 'react';
import { 
  Initiative, 
  InitiativeStatus, 
  ThemeCategory, 
  initiatives as initialInitiatives,
  themeLabels 
} from '@/data/coalitionData';
import FilterSearchBar from '@/components/FilterSearchBar';
import InitiativesList from '@/components/InitiativesList';
import StatusBarChart from '@/components/StatusBarChart';
import CategoryBarCharts from '@/components/CategoryBarCharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThemeBasedOverview from '@/components/ThemeBasedOverview';
import OverallProgress from '@/components/OverallProgress';

const Index = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<InitiativeStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<ThemeCategory | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'themes' | 'list'>('themes');

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

  return (
    <div className="min-h-screen flex flex-col">
      {/* German flag-inspired header */}
      <header className="bg-gradient-to-r from-black via-red-600 to-[#FFCC00] h-2" />
      
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-coalition-dark">
            Koalitionstracker 2025–2029
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Verfolgen Sie den Fortschritt bei der Umsetzung des Koalitionsvertrags der aktuellen Bundesregierung.
          </p>
        </div>
        
        {/* Overall Progress Bar */}
        <div className="mb-8">
          <OverallProgress initiatives={initialInitiatives} />
        </div>
        
        {/* Filter and Search */}
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
        
        {/* Main Content */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'themes' | 'list')}>
            <TabsList className="mb-6">
              <TabsTrigger value="themes">Themenbasierte Übersicht</TabsTrigger>
              <TabsTrigger value="list">Listenansicht</TabsTrigger>
            </TabsList>
            
            <TabsContent value="themes" className="space-y-8">
              <ThemeBasedOverview 
                initiatives={filteredInitiatives}
                selectedCategory={categoryFilter}
                onCategorySelect={setCategoryFilter}
              />
              
              {categoryFilter !== 'all' && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">
                    {themeLabels[categoryFilter as ThemeCategory]} ({filteredInitiatives.length} Vorhaben)
                  </h2>
                  <InitiativesList initiatives={filteredInitiatives} />
                </div>
              )}
              
              {categoryFilter === 'all' && hasFilters && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Gefilterte Vorhaben ({filteredInitiatives.length})
                  </h2>
                  <InitiativesList initiatives={filteredInitiatives} />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="list" className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  {categoryFilter !== 'all' 
                    ? `${themeLabels[categoryFilter as ThemeCategory]} (${filteredInitiatives.length} Vorhaben)` 
                    : `Alle Vorhaben (${filteredInitiatives.length})`}
                </h2>
                
                <StatusBarChart 
                  initiatives={filteredInitiatives}
                  category={categoryFilter !== 'all' ? (categoryFilter as ThemeCategory) : undefined}
                  title="Statusverteilung"
                  className="mb-6"
                />
                
                <InitiativesList initiatives={filteredInitiatives} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* German flag-inspired footer */}
      <footer className="mt-auto">
        <div className="bg-gradient-to-r from-black via-red-600 to-[#FFCC00] h-2" />
      </footer>
    </div>
  );
};

export default Index;
