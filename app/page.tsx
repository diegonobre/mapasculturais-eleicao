'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import Link from 'next/link';

interface Election {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export default function ElectionDashboard() {
  const [elections, setElections] = useState<Election[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'ongoing' | 'completed'>('ongoing');

  useEffect(() => {
    // Fetch elections from API
    const fetchElections = async () => {
      // Simulated API call
      const response = await fetch('/api/elections');
      const data = await response.json();
      setElections(data);
    };

    fetchElections();
  }, []);

  const filteredElections = elections.filter((election) => election.status === activeTab);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Eleições para Conselhos de Cultura</h1>

      <Alert className="mb-6">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Novo sistema de eleições online</AlertTitle>
        <AlertDescription>
          Agora você pode participar das eleições para os conselhos municipais e estaduais de cultura de forma
          online.
        </AlertDescription>
      </Alert>

      <Tabs
        defaultValue="ongoing"
        onValueChange={(value) => setActiveTab(value as 'upcoming' | 'ongoing' | 'completed')}
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="upcoming">Próximas</TabsTrigger>
          <TabsTrigger value="ongoing">Em Andamento</TabsTrigger>
          <TabsTrigger value="completed">Concluídas</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <ElectionList elections={filteredElections} />
        </TabsContent>
        <TabsContent value="ongoing">
          <ElectionList elections={filteredElections} />
        </TabsContent>
        <TabsContent value="completed">
          <ElectionList elections={filteredElections} />
        </TabsContent>
      </Tabs>

      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Ações</h2>
        <div className="flex space-x-4">
          <Button asChild>
            <Link href="/eleicoes/candidatar">Candidatar-se</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/eleicoes/registrar-eleitor">Registrar-se como Eleitor</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ElectionList({ elections }: { elections: Election[] }) {
  if (elections.length === 0) {
    return <p className="text-center text-gray-500">Nenhuma eleição encontrada nesta categoria.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {elections.map((election) => (
        <Card key={election.id}>
          <CardHeader>
            <CardTitle>{election.title}</CardTitle>
            <CardDescription>
              {new Date(election.startDate).toLocaleDateString()} -{' '}
              {new Date(election.endDate).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href={`/eleicoes/${election.id}`}>Ver Detalhes</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
