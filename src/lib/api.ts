import axios from 'axios';
import { handleError } from './utils';

export const BASE_URL = 'http://localhost:3001';

export const fetchModules = async () => {
  try {
    const { data } = await axios.get<IModule[]>(`${BASE_URL}/modules`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchModuleById = async (id: string) => {
  try {
    const { data } = await axios.get<IModule>(`${BASE_URL}/modules/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
