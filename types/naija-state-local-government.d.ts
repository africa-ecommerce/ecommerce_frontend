// types/naija-state-local-government.d.ts
declare module "naija-state-local-government" {
  interface StateData {
    state: string;
    alias: string;
    lgas: string[];
  }

  interface LGAData {
    state: string;
    alias: string;
    lga: string;
  }

  const NaijaStates: {
    all(): StateData[];
    states(): string[];
    lgas(state: string): string[];
  };

  export default NaijaStates;
}
