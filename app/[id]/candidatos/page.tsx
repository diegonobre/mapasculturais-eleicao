'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Candidate {
  id: string;
  name: string;
  avatarUrl: string;
  biography: string;
}

export default function CandidateList({ params }: { params: { id: string } }) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Fetch candidates from API
    const fetchCandidates = async () => {
      // Simulated API call
      const response = await fetch(`/api/elections/${params.id}/candidates`);
      const data = await response.json();
      setCandidates(data);
    };

    fetchCandidates();
  }, [params.id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Candidatos</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {candidates.map((candidate) => (
          <Card key={candidate.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
                  <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{candidate.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {candidate.biography.length > 100
                  ? `${candidate.biography.substring(0, 100)}...`
                  : candidate.biography}
              </CardDescription>
              <Button asChild className="w-full">
                <Link href={`/eleicoes/${params.id}/candidatos/${candidate.id}`}>Ver Perfil Completo</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
