'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/layout/header';

interface CandidateResult {
  id: string;
  name: string;
  votes: number;
  percentage: number;
}

interface ElectionResult {
  totalVotes: number;
  candidates: CandidateResult[];
}

const mockElectionResult: ElectionResult = {
  totalVotes: 1000,
  candidates: [
    { id: '1', name: 'Maria Silva', votes: 350, percentage: 35 },
    { id: '2', name: 'João Santos', votes: 280, percentage: 28 },
    { id: '3', name: 'Ana Rodrigues', votes: 200, percentage: 20 },
    { id: '4', name: 'Carlos Mendes', votes: 120, percentage: 12 },
    { id: '5', name: 'Beatriz Oliveira', votes: 50, percentage: 5 },
  ],
};

export default function ElectionResults({ params }: { params: { id: string } }) {
  const [results, setResults] = useState<ElectionResult | null>(null);

  useEffect(() => {
    // Fetch election results from API
    const fetchResults = async () => {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResults(mockElectionResult);
    };

    fetchResults();
  }, [params.id]);

  if (!results) {
    return <div>Carregando resultados...</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Resultados da Eleição</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
            <CardDescription>Total de votos: {results.totalVotes}</CardDescription>
          </CardHeader>
        </Card>
        <div className="grid gap-6 md:grid-cols-2">
          {results.candidates.map((candidate) => (
            <Card key={candidate.id}>
              <CardHeader>
                <CardTitle>{candidate.name}</CardTitle>
                <CardDescription>
                  {candidate.votes} votos ({candidate.percentage.toFixed(2)}%)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={candidate.percentage} className="w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
