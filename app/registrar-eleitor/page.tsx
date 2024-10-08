'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/layout/header';

const formSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  cpf: z.string().length(11, 'CPF deve ter 11 dígitos'),
  council: z.string().min(1, 'Selecione um conselho'),
});

const mockCouncils = [
  { id: 'municipal-sp', name: 'Conselho Municipal de Cultura - São Paulo' },
  { id: 'estadual-sp', name: 'Conselho Estadual de Cultura - São Paulo' },
  { id: 'municipal-rj', name: 'Conselho Municipal de Cultura - Rio de Janeiro' },
  { id: 'estadual-rj', name: 'Conselho Estadual de Cultura - Rio de Janeiro' },
];

export default function VoterRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      council: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
    setIsSubmitting(false);
    toast({
      title: 'Registro de eleitor concluído!',
      description: 'Você está registrado para votar na próxima eleição.',
    });
    form.reset();
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl  mx-auto">
          <CardHeader>
            <CardTitle>Registro de Eleitor</CardTitle>
            <CardDescription>
              Preencha o formulário para se registrar como eleitor em um conselho de cultura.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input placeholder="Apenas números" {...field} maxLength={11} />
                      </FormControl>
                      <FormDescription>Digite apenas os números do seu CPF, sem pontos ou traços.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="council"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conselho</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um conselho" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockCouncils.map((council) => (
                            <SelectItem key={council.id} value={council.id}>
                              {council.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Registrando...' : 'Registrar como Eleitor'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
