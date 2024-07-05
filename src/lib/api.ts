import axios, { AxiosError } from 'axios';

export const fetchModules = async () => {
  try {
    const { data } = await axios.get<IModule[]>(
      'http://localhost:3001/modules'
    );
    return data;
  } catch (error) {
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
};
