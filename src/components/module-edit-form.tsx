import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { editModuleFormSchema } from '@/lib/schema';
import { Textarea } from './ui/textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateModule } from '@/lib/api';
import { toast } from 'sonner';

const ModuleEditForm = ({
  id,
  name,
  description,
  targetTemperature,
}: {
  id: string;
  name?: string;
  description?: string;
  targetTemperature?: number;
}) => {
  const form = useForm<z.infer<typeof editModuleFormSchema>>({
    resolver: zodResolver(editModuleFormSchema),
    defaultValues: {
      name: name || '',
      description: description || '',
      targetTemperature: targetTemperature || 20,
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async ({
      name,
      description,
      targetTemperature,
    }: z.infer<typeof editModuleFormSchema>) => {
      const data = updateModule(id, {
        name,
        description,
        targetTemperature,
      });
      return data;
    },
    onMutate: async ({ name, description, targetTemperature }) => {
      await queryClient.cancelQueries({ queryKey: ['module', id] });

      const prevModule = queryClient.getQueryData<IModule>(['module', id]);

      if (prevModule) {
        const newModule = {
          ...prevModule,
          name,
          description,
          targetTemperature,
        };
        queryClient.setQueryData<IModule>(['module', id], newModule);
      }

      return { prevModule };
    },
    onError: (error, variables, context) => {
      console.error(error);
      toast.error('An error occurred during module update. Please try again.');
      if (context?.prevModule) {
        queryClient.setQueryData(['module', id], context.prevModule);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['module', id] });
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      toast.success('Module updated successfully.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['module', id] });
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });

  function onSubmit(data: z.infer<typeof editModuleFormSchema>) {
    mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Hydroponic module' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className='resize-none h-24'
                  placeholder='A module that controls the temperature of the water.'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='targetTemperature'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Temperature</FormLabel>
              <FormControl>
                <Input
                  placeholder='20'
                  type='number'
                  inputMode='decimal'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          Save
        </Button>
      </form>
    </Form>
  );
};

export default ModuleEditForm;
