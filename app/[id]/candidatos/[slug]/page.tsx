'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import Header from '@/components/layout/header';

interface Candidate {
  id: string;
  name: string;
  avatarUrl: string;
  biography: string;
  proposals: string;
  experience: string;
}

const mockCandidate: Candidate = {
  id: '1',
  name: 'Maria Silva',
  avatarUrl: 'https://i.pravatar.cc/150?img=1',
  biography:
    'Maria Silva é uma artista plástica com 15 anos de experiência em projetos culturais comunitários. Nascida e criada em São Paulo, ela tem dedicado sua carreira a tornar a arte acessível a todos, especialmente em comunidades carentes.',
  proposals:
    '1. Ampliar o acesso à cultura em áreas periféricas através da criação de centros culturais comunitários.\n2. Implementar um programa de bolsas para jovens artistas.\n3. Desenvolver parcerias entre escolas públicas e instituições culturais para enriquecer a educação artística.\n4. Criar um festival anual de artes que celebre a diversidade cultural da cidade.\n5. Estabelecer um fundo de apoio para a restauração e preservação do patrimônio cultural local.',
  experience:
    "- Fundadora do projeto 'Arte nas Ruas' (2010-presente)\n- Curadora da Galeria Municipal de Artes (2015-2018)\n- Professora de Artes Visuais na Universidade Estadual (2012-presente)\n- Membro do Conselho Estadual de Cultura (2019-2021)\n- Organizadora do Festival de Arte Urbana (2016, 2018, 2020)",
};

export default function CandidateProfile({ params }: { params: { slug: string } }) {
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    // Fetch candidate data from API
    const fetchCandidate = async () => {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCandidate(mockCandidate);
    };

    fetchCandidate();
  }, [params.slug]);

  if (!candidate) {
    return <div>Carregando perfil do candidato...</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{candidate.name}</CardTitle>
              <CardDescription>Candidato(a) ao Conselho de Cultura</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="biography" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="biography">Biografia</TabsTrigger>
            <TabsTrigger value="proposals">Propostas</TabsTrigger>
            <TabsTrigger value="experience">Experiência</TabsTrigger>
          </TabsList>
          <TabsContent value="biography">
            <Card>
              <CardHeader>
                <CardTitle>Biografia</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{candidate.biography}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="proposals">
            <Card>
              <CardHeader>
                <CardTitle>Propostas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {candidate.proposals.split('\n').map((proposal, index) => (
                    <li key={index}>{proposal.substring(3)}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <CardTitle>Experiência</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {candidate.experience.split('\n').map((item, index) => (
                    <li key={index}>{item.substring(2)}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex space-x-4">
          <Button asChild>
            <Link href={`/${params.slug}/votar`}>Votar neste Candidato</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/${params.slug}/candidatos`}>Voltar para Lista de Candidatos</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
