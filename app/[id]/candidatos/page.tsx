'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/layout/header';

interface Candidate {
  id: string;
  name: string;
  avatarUrl: string;
  biography: string;
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Maria Silva',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    biography: 'Artista plástica com 15 anos de experiência em projetos culturais comunitários.',
  },
  {
    id: '2',
    name: 'João Santos',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    biography: 'Músico e produtor cultural, fundador do Festival de Jazz da Cidade.',
  },
  {
    id: '3',
    name: 'Ana Rodrigues',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    biography: "Atriz e diretora teatral, coordenadora do projeto 'Teatro nas Escolas'.",
  },
  {
    id: '4',
    name: 'Carlos Mendes',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    biography: 'Escritor e professor de literatura, organizador da Feira do Livro Municipal.',
  },
  {
    id: '5',
    name: 'Beatriz Oliveira',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    biography: 'Dançarina e coreógrafa, fundadora da Companhia de Dança Contemporânea da cidade.',
  },
];

export default function CandidateList({ params }: { params: { id: string } }) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Fetch candidates from API
    const fetchCandidates = async () => {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCandidates(mockCandidates);
    };

    fetchCandidates();
  }, [params.id]);

  return (
    <>
      <Header />
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
                  <Link href={`/${params.id}/candidatos/${candidate.id}`}>Ver Perfil Completo</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
