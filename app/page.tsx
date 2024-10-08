'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/header';

interface Election {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

const mockElections: Election[] = [
  {
    id: '1',
    title: 'Eleição para Conselho Municipal de Cultura - São Paulo',
    startDate: '2024-03-01',
    endDate: '2024-03-15',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Eleição para Conselho Estadual de Cultura - Rio de Janeiro',
    startDate: '2024-02-15',
    endDate: '2024-02-29',
    status: 'ongoing',
  },
  {
    id: '3',
    title: 'Eleição para Conselho Municipal de Cultura - Belo Horizonte',
    startDate: '2024-01-01',
    endDate: '2024-01-15',
    status: 'completed',
  },
  {
    id: '4',
    title: 'Eleição para Conselho Estadual de Cultura - Bahia',
    startDate: '2024-04-01',
    endDate: '2024-04-15',
    status: 'upcoming',
  },
  {
    id: '5',
    title: 'Eleição para Conselho Municipal de Cultura - Porto Alegre',
    startDate: '2024-02-20',
    endDate: '2024-03-05',
    status: 'ongoing',
  },
  {
    id: '6',
    title: 'Eleição para Conselho Estadual de Cultura - Minas Gerais',
    startDate: '2023-12-01',
    endDate: '2023-12-15',
    status: 'completed',
  },
];

export default function ElectionDashboard() {
  const [elections, setElections] = useState<Election[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'ongoing' | 'completed'>('ongoing');

  useEffect(() => {
    // Simulating API call with mock data
    const fetchElections = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setElections(mockElections);
    };

    fetchElections();
  }, []);

  const filteredElections = elections.filter((election) => election.status === activeTab);

  return (
    <>
      <Header />
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
              <Link href="/candidatar">Candidatar-se</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/registrar-eleitor">Registrar-se como Eleitor</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
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
              <Link href={`/${election.id}/painel`}>Ver Detalhes</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
