import { AxiosError } from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleError(error: any) {
  if (error instanceof AxiosError) {
    console.log(error.response?.data);
    throw new Error(
      `[MODULES_ERROR]: ${error.response?.data.error_name} - ${error.response?.data.error_message}`
    );
  } else if (error instanceof Error) {
    console.log(error.message);
    throw new Error(`[MODULES_ERROR]: ${error.message}`);
  } else if (typeof error === 'string') {
    console.log(error);
    throw new Error(`[MODULES_ERROR]: ${error}`);
  } else {
    console.log(error);
    throw new Error(`[MODULES_ERROR]: ${JSON.stringify(error)}`);
  }
}
