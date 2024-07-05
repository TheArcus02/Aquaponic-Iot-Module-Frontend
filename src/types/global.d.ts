declare global {
  interface IModule {
    id: string;
    name: string;
    description: string;
    available: boolean;
    targetTemperature: number;
  }
}

export {};
