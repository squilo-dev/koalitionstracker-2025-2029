import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Initiative, InitiativeStatus, ThemeCategory } from '@/types/supabase';
import FilterSearchBar from '@/components/FilterSearchBar';
import InitiativesList from '@/components/InitiativesList';
import StatusBarChart from '@/components/StatusBarChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThemeBasedOverview from '@/components/ThemeBasedOverview';
import { Heart } from 'lucide-react';
import { getInitiatives, getThemeCategories, getInitiativeStatuses } from '@/services/initiativeService';
import SuggestionForm from '@/components/SuggestionForm';
import CountdownTimer from '@/components/CountdownTimer';
import InfoBar from '@/components/InfoBar';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';

const Index = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'themes' | 'list'>('themes');

  // Fetch data using React Query
  const {
    data: initiatives = [],
    isLoading: isLoadingInitiatives
  } = useQuery({
    queryKey: ['initiatives'],
    queryFn: getInitiatives
  });
  const {
    data: themeCategories = [],
    isLoading: isLoadingCategories
  } = useQuery({
    queryKey: ['themeCategories'],
    queryFn: getThemeCategories
  });
  const {
    data: initiativeStatuses = [],
    isLoading: isLoadingStatuses
  } = useQuery({
    queryKey: ['initiativeStatuses'],
    queryFn: getInitiativeStatuses
  });

  // Convert arrays to lookup maps for easier access
  const categoryMap = useMemo(() => {
    return themeCategories.reduce((acc, category) => {
      acc[category.id] = category;
      return acc;
    }, {} as Record<string, ThemeCategory>);
  }, [themeCategories]);
  const statusMap = useMemo(() => {
    return initiativeStatuses.reduce((acc, status) => {
      acc[status.id] = status;
      return acc;
    }, {} as Record<string, InitiativeStatus>);
  }, [initiativeStatuses]);

  // Check if any filters are applied
  const hasFilters = searchQuery !== '' || statusFilter.length > 0 || categoryFilter !== 'all';

  // Filter initiatives based on search and filters
  const filteredInitiatives = useMemo(() => {
    return initiatives.filter(initiative => {
      // Apply search filter
      const matchesSearch = searchQuery === '' || 
        initiative.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        initiative.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Apply status filter
      const matchesStatus = statusFilter.length === 0 || statusFilter.includes(initiative.status_id);

      // Apply category filter
      const matchesCategory = categoryFilter === 'all' || initiative.category_id === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, statusFilter, categoryFilter, initiatives]);

  // Function to clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter([]);
    setCategoryFilter('all');
  };

  const isLoading = isLoadingInitiatives || isLoadingCategories || isLoadingStatuses;
  
  return (
    <div className="min-h-screen flex flex-col">
      <InfoBar />
      <Header />
      
      <main className="container mx-auto py-8 px-4 flex-grow">
        <div className="mb-10">
          <div className="text-center mb-6">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Verfolgen Sie den Fortschritt bei der Umsetzung des <a href="https://www.wiwo.de/downloads/30290756/6/koalitionsvertrag-2025.pdf" target="_blank" rel="noopener noreferrer" className="dotted-link">Koalitionsvertrags</a> der Bundesregierung aus CDU/CSU und SPD.
            </p>
          </div>
          
          <CountdownTimer />
        </div>
        
        {/* Status Chart */}
        <div className="mb-8">
          {isLoading ? 
            <div className="h-24 animate-pulse bg-gray-100 rounded-lg"></div> : 
            <StatusBarChart 
              initiatives={filteredInitiatives} 
              categoryId={categoryFilter !== 'all' ? categoryFilter : undefined} 
              statusMap={statusMap} 
              categoryMap={categoryMap} 
              showPercentages={true} 
              noCard={true}
            />
          }
        </div>
        
        {/* Filter and Search */}
        <div className="mb-8">
          <FilterSearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            statusFilter={statusFilter} 
            setStatusFilter={setStatusFilter} 
            statusMap={statusMap} 
            hasFilters={hasFilters} 
            clearFilters={clearFilters} 
          />
        </div>
        
        {/* Main Content */}
        <div className="mb-8">
          <Tabs defaultValue="themes" value={activeTab} onValueChange={value => setActiveTab(value as 'themes' | 'list')}>
            <TabsList className="mb-6">
              <TabsTrigger value="themes">Nach Thema</TabsTrigger>
              <TabsTrigger value="list">Alle Vorhaben</TabsTrigger>
            </TabsList>
            
            <TabsContent value="themes" className="space-y-8">
              <ThemeBasedOverview 
                initiatives={filteredInitiatives} 
                selectedCategory={categoryFilter} 
                onCategorySelect={setCategoryFilter} 
                isLoading={isLoading} 
                categoryMap={categoryMap} 
                statusMap={statusMap} 
              />
              
              {categoryFilter !== 'all' && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">
                    {categoryMap[categoryFilter]?.label} ({filteredInitiatives.length} Vorhaben)
                  </h2>
                  <InitiativesList 
                    initiatives={filteredInitiatives} 
                    isLoading={isLoading} 
                    categoryMap={categoryMap} 
                    statusMap={statusMap} 
                  />
                </div>
              )}
              
              {categoryFilter === 'all' && hasFilters && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Gefilterte Vorhaben ({filteredInitiatives.length})
                  </h2>
                  <InitiativesList 
                    initiatives={filteredInitiatives} 
                    isLoading={isLoading} 
                    categoryMap={categoryMap} 
                    statusMap={statusMap} 
                  />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="list" className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  {categoryFilter !== 'all' ? 
                    `${categoryMap[categoryFilter]?.label} (${filteredInitiatives.length} Vorhaben)` : 
                    `Alle Vorhaben (${filteredInitiatives.length})`
                  }
                </h2>
                
                <InitiativesList 
                  initiatives={filteredInitiatives} 
                  isLoading={isLoading} 
                  categoryMap={categoryMap} 
                  statusMap={statusMap} 
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-4 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">Entwickelt in Deutschland 🇩🇪</p>
            <div className="flex items-center gap-4">
              <Link 
                to="/about"
                className="text-sm text-muted-foreground hover:text-coalition-primary dotted-link"
              >
                Über das Projekt
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
