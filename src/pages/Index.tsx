
import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Initiative, InitiativeStatus, ThemeCategory } from '@/types/supabase';
import FilterSearchBar from '@/components/FilterSearchBar';
import InitiativesList from '@/components/InitiativesList';
import StatusBarChart from '@/components/StatusBarChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThemeBasedOverview from '@/components/ThemeBasedOverview';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ExternalLink, Bug, Heart } from 'lucide-react';
import { getInitiatives, getThemeCategories, getInitiativeStatuses } from '@/services/initiativeService';
import SuggestionForm from '@/components/SuggestionForm';

const Index = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'themes' | 'list'>('themes');
  const [showBugReport, setShowBugReport] = useState(false);
  const [showDonation, setShowDonation] = useState(false);

  // Fetch data using React Query
  const { data: initiatives = [], isLoading: isLoadingInitiatives } = useQuery({
    queryKey: ['initiatives'],
    queryFn: getInitiatives
  });

  const { data: themeCategories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['themeCategories'],
    queryFn: getThemeCategories
  });

  const { data: initiativeStatuses = [], isLoading: isLoadingStatuses } = useQuery({
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
  const hasFilters = searchQuery !== '' || statusFilter !== 'all' || categoryFilter !== 'all';

  // Filter initiatives based on search and filters
  const filteredInitiatives = useMemo(() => {
    return initiatives.filter(initiative => {
      // Apply search filter
      const matchesSearch = searchQuery === '' || 
        initiative.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        initiative.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Apply status filter
      const matchesStatus = statusFilter === 'all' || initiative.status_id === statusFilter;

      // Apply category filter
      const matchesCategory = categoryFilter === 'all' || initiative.category_id === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, statusFilter, categoryFilter, initiatives]);

  // Function to clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('all');
  };

  const isLoading = isLoadingInitiatives || isLoadingCategories || isLoadingStatuses;

  return <div className="min-h-screen flex flex-col">
      {/* German flag-inspired header */}
      <header className="bg-gradient-to-r from-black via-red-600 to-[#FFCC00] h-2" />
      
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-coalition-dark">
            Koalitionstracker 2025–2029
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Verfolgen Sie den Fortschritt bei der Umsetzung des <a href="https://www.wiwo.de/downloads/30290756/6/koalitionsvertrag-2025.pdf" target="_blank" rel="noopener noreferrer" className="text-coalition-primary underline inline-flex items-center">Koalitionsvertrags <ExternalLink className="h-3 w-3 ml-0.5" /></a> der Bundesregierung aus CDU/CSU und SPD.
          </p>
        </div>
        
        {/* Status Chart */}
        <div className="mb-8">
          {isLoading ? (
            <div className="h-24 animate-pulse bg-gray-100 rounded-lg"></div>
          ) : (
            <StatusBarChart 
              initiatives={filteredInitiatives} 
              categoryId={categoryFilter !== 'all' ? categoryFilter : undefined}
              statusMap={statusMap}
              categoryMap={categoryMap}
              showPercentages={true} 
            />
          )}
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
              
              {categoryFilter !== 'all' && <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">
                    {categoryMap[categoryFilter]?.label} ({filteredInitiatives.length} Vorhaben)
                  </h2>
                  <InitiativesList 
                    initiatives={filteredInitiatives} 
                    isLoading={isLoading}
                    categoryMap={categoryMap}
                    statusMap={statusMap}
                  />
                </div>}
              
              {categoryFilter === 'all' && hasFilters && <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Gefilterte Vorhaben ({filteredInitiatives.length})
                  </h2>
                  <InitiativesList 
                    initiatives={filteredInitiatives} 
                    isLoading={isLoading}
                    categoryMap={categoryMap}
                    statusMap={statusMap}
                  />
                </div>}
            </TabsContent>
            
            <TabsContent value="list" className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  {categoryFilter !== 'all' 
                    ? `${categoryMap[categoryFilter]?.label} (${filteredInitiatives.length} Vorhaben)` 
                    : `Alle Vorhaben (${filteredInitiatives.length})`}
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
      </div>
      
      {/* Custom footer with German flag and action buttons */}
      <footer className="mt-auto bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">Entwickelt in Deutschland für Deutschland 🇩🇪</p>
            
            <div className="flex items-center gap-4">
              <AlertDialog open={showBugReport} onOpenChange={setShowBugReport}>
                <AlertDialogTrigger asChild>
                  <button className="text-sm text-muted-foreground hover:text-coalition-primary flex items-center gap-1">
                    <Bug className="h-4 w-4" /> Fehler melden
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-md">
                  <SuggestionForm 
                    type="bug" 
                    onSuccess={() => setShowBugReport(false)} 
                  />
                </AlertDialogContent>
              </AlertDialog>
              
              <AlertDialog open={showDonation} onOpenChange={setShowDonation}>
                <AlertDialogTrigger asChild>
                  <button className="text-sm text-muted-foreground hover:text-coalition-primary flex items-center gap-1">
                    <Heart className="h-4 w-4" /> Unterstütze uns
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-md">
                  <div className="p-4 text-center">
                    <Heart className="h-16 w-16 mx-auto mb-4 text-red-500" />
                    <h2 className="text-xl font-bold mb-4">Unterstütze uns</h2>
                    <p className="text-muted-foreground">Spenden können aktuell noch nicht angenommen werden.</p>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </footer>
      
    </div>;
};

export default Index;
