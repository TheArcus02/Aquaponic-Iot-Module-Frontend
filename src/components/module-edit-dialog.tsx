import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { editModuleFormSchema } from '@/lib/schema';
import { ReactNode } from 'react';
import { z } from 'zod';
import ModuleEditForm from './module-edit-form';

interface IModuleEditDialogProps
  extends Partial<z.infer<typeof editModuleFormSchema>> {
  id: string;
  children: ReactNode;
}

const ModuleEditDialog = ({
  children,
  id,
  ...props
}: IModuleEditDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit module</DialogTitle>
          <DialogDescription>
            Make changes to module. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ModuleEditForm id={id} {...props} />
      </DialogContent>
    </Dialog>
  );
};

export default ModuleEditDialog;
