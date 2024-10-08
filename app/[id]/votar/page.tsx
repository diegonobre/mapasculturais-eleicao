'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/layout/header';

interface Candidate {
  id: string;
  name: string;
}

const formSchema = z.object({
  candidateId: z.string().min(1, 'Você deve selecionar um candidato'),
});

const mockCandidates: Candidate[] = [
  { id: '1', name: 'Maria Silva' },
  { id: '2', name: 'João Santos' },
  { id: '3', name: 'Ana Rodrigues' },
  { id: '4', name: 'Carlos Mendes' },
  { id: '5', name: 'Beatriz Oliveira' },
];

export default function VotingInterface({ params }: { params: { id: string } }) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      candidateId: '',
    },
  });

  useEffect(() => {
    // Fetch candidates from API
    const fetchCandidates = async () => {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCandidates(mockCandidates);
    };

    fetchCandidates();
  }, [params.id]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
    setIsSubmitting(false);
    toast({
      title: 'Voto registrado com sucesso!',
      description: 'Obrigado por participar da eleição.',
    });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Votação</CardTitle>
            <CardDescription>Selecione o candidato em que deseja votar.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="candidateId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Candidatos</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {candidates.map((candidate) => (
                            <FormItem className="flex items-center space-x-3 space-y-0" key={candidate.id}>
                              <FormControl>
                                <RadioGroupItem value={candidate.id} />
                              </FormControl>
                              <FormLabel className="font-normal">{candidate.name}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>Você só pode votar em um candidato.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Registrando voto...' : 'Confirmar Voto'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
