'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/layout/header';

interface ElectionData {
  totalVoters: number;
  votesCount: number;
  turnout: number;
  candidatesCount: number;
  votingProgress: number;
}

const mockElectionData: ElectionData = {
  totalVoters: 5000,
  votesCount: 3500,
  turnout: 0.7,
  candidatesCount: 5,
  votingProgress: 70,
};

export default function ElectionDataPanel({ params }: { params: { id: string } }) {
  const [data, setData] = useState<ElectionData | null>(null);

  useEffect(() => {
    // Fetch election data from API
    const fetchData = async () => {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData(mockElectionData);
    };

    fetchData();
  }, [params.id]);

  if (!data) {
    return <div>Carregando dados da eleição...</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Painel de Dados da Eleição</h1>

        <div className="mb-6 flex space-x-4">
          <Button asChild>
            <Link href={`/${params.id}/votar`}>Votar</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/${params.id}/candidatos`}>Ver Candidatos</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/${params.id}/resultados`}>Ver Resultados</Link>
          </Button>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="voters">Eleitores</TabsTrigger>
            <TabsTrigger value="candidates">Candidatos</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Visão Geral da Eleição</CardTitle>
                <CardDescription>Dados gerais sobre o processo eleitoral</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Progresso da Votação</p>
                  <Progress value={data.votingProgress} className="w-full mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">{data.votingProgress.toFixed(2)}% concluído</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total de Eleitores: {data.totalVoters}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Votos Registrados: {data.votesCount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Taxa de Participação: {(data.turnout * 100).toFixed(2)}%</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="voters">
            <Card>
              <CardHeader>
                <CardTitle>Dados dos Eleitores</CardTitle>
                <CardDescription>Informações sobre a participação dos eleitores</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">Total de Eleitores Registrados: {data.totalVoters}</p>
                <p className="text-sm font-medium mt-2">Votos Registrados: {data.votesCount}</p>
                <p className="text-sm font-medium mt-2">
                  Taxa de Participação: {(data.turnout * 100).toFixed(2)}%
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="candidates">
            <Card>
              <CardHeader>
                <CardTitle>Dados dos Candidatos</CardTitle>
                <CardDescription>Informações sobre os candidatos na eleição</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">Número de Candidatos: {data.candidatesCount}</p>
                {/* Add more candidate-specific data here */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
