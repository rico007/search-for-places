import { AxiosError } from 'axios';

export const formatErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return `API Error: ${error.response?.data?.message || error.message}`;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unknown error occurred';
};