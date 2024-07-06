import { AxiosError } from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleError(error: any) {
  if (error instanceof AxiosError) {
    console.log(error.response?.data);
    throw new Error(error.response?.data);
  } else if (error instanceof Error) {
    console.log(error.message);
    throw new Error(error.message);
  } else if (typeof error === 'string') {
    console.log(error);
    throw new Error(error);
  } else {
    console.log(error);
    throw new Error(JSON.stringify(error));
  }
}
