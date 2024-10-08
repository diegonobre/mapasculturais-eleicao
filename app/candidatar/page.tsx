'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  council: z.string().min(1, 'Selecione um conselho'),
  biography: z
    .string()
    .min(50, 'A biografia deve ter pelo menos 50 caracteres')
    .max(500, 'A biografia deve ter no máximo 500 caracteres'),
  proposals: z
    .string()
    .min(100, 'As propostas devem ter pelo menos 100 caracteres')
    .max(1000, 'As propostas devem ter no máximo 1000 caracteres'),
});

export default function CandidateRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      council: '',
      biography: '',
      proposals: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
    setIsSubmitting(false);
    toast({
      title: 'Candidatura registrada com sucesso!',
      description: 'Sua candidatura foi enviada para análise.',
    });
    form.reset();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Registro de Candidatura</CardTitle>
          <CardDescription>Preencha o formulário para se candidatar a um conselho de cultura.</CardDescription>
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
                        <SelectItem value="municipal-sp">Conselho Municipal de Cultura - São Paulo</SelectItem>
                        <SelectItem value="estadual-sp">Conselho Estadual de Cultura - São Paulo</SelectItem>
                        {/* Add more councils as needed */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="biography"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biografia</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Conte um pouco sobre você e sua experiência na área cultural"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Mínimo de 50 caracteres, máximo de 500.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="proposals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Propostas</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descreva suas principais propostas para o conselho" {...field} />
                    </FormControl>
                    <FormDescription>Mínimo de 100 caracteres, máximo de 1000.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar Candidatura'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
