'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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

export default function ElectionResults({ params }: { params: { id: string } }) {
  const [results, setResults] = useState<ElectionResult | null>(null);

  useEffect(() => {
    // Fetch election results from API
    const fetchResults = async () => {
      // Simulated API call
      const response = await fetch(`/api/elections/${params.id}/results`);
      const data = await response.json();
      setResults(data);
    };

    fetchResults();
  }, [params.id]);

  if (!results) {
    return <div>Carregando resultados...</div>;
  }

  return (
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
  );
}
