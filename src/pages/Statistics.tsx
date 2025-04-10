import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getInitiatives, getThemeCategories, getInitiativeStatuses } from '@/services/initiativeService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ThemeCategory, InitiativeStatus } from '@/types/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Statistics: React.FC = () => {
  const { data: initiatives = [] } = useQuery({
    queryKey: ['initiatives'],
    queryFn: getInitiatives,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getThemeCategories,
  });

  const { data: statuses = [] } = useQuery({
    queryKey: ['statuses'],
    queryFn: getInitiativeStatuses,
  });

  // Calculate statistics
  const totalInitiatives = initiatives.length;
  const completedInitiatives = initiatives.filter(i => i.status_id === 'completed').length;
  const inProgressInitiatives = initiatives.filter(i => i.status_id === 'in_progress').length;
  const notStartedInitiatives = initiatives.filter(i => i.status_id === 'not_started').length;

  // Calculate category distribution
  const categoryDistribution = categories.map(category => ({
    name: category.name,
    count: initiatives.filter(i => i.category_id === category.id).length,
  }));

  // Calculate status distribution
  const statusDistribution = statuses.map(status => ({
    name: status.name,
    count: initiatives.filter(i => i.status_id === status.id).length,
  }));

  // Calculate completion rate
  const completionRate = (completedInitiatives / totalInitiatives) * 100;

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Statistiken</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Gesamtanzahl</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalInitiatives}</div>
            <p className="text-sm text-muted-foreground">Initiativen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fertiggestellt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedInitiatives}</div>
            <p className="text-sm text-muted-foreground">Initiativen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">In Bearbeitung</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inProgressInitiatives}</div>
            <p className="text-sm text-muted-foreground">Initiativen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Nicht begonnen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{notStartedInitiatives}</div>
            <p className="text-sm text-muted-foreground">Initiativen</p>
          </CardContent>
        </Card>
      </div>

      {/* Completion Rate */}
      <Card>
        <CardHeader>
          <CardTitle>Fertigstellungsrate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>0%</span>
              <span>100%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              {completionRate.toFixed(1)}% der Initiativen sind abgeschlossen
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Category Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Verteilung nach Themen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#FFCC00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Statusverteilung</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statusDistribution.map((status) => (
              <div key={status.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{status.name}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {status.count} Initiativen
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics; 