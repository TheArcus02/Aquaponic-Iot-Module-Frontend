declare global {
  interface IModule {
    id: string;
    name: string;
    description?: string;
    available: boolean;
    targetTemperature: number;
    temperature?: number;
  }

  interface IModuleUpdate {
    id: string;
    temperature: number;
  }

  interface IModuleHistory {
    timestamp: string;
    temperature: number;
  }
}

export {};
