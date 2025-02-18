import { socket } from '@/lib/socket';
import { useQueryClient } from '@tanstack/react-query';
import * as React from 'react';

export const useReactQuerySubscription = () => {
  const queryClient = useQueryClient();
  React.useEffect(() => {
    socket.connect();
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('moduleUpdate', (data: IModuleUpdate[]) => {
      data.forEach((update: IModuleUpdate) => {
        // Update single module
        queryClient.setQueryData(['module', update.id], (oldData: any) => {
          if (!oldData) return null;
          return {
            ...oldData,
            temperature: update.temperature,
          };
        });

        // Update all modules
        queryClient.setQueryData<IModule[]>(['modules'], (oldData) => {
          if (!oldData) return [];
          return oldData.map((module) =>
            module.id === update.id
              ? {
                  ...module,
                  temperature: update.temperature,
                }
              : module
          );
        });
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};
