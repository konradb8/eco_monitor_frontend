export interface GenerationMix {
    fuel: string;
    perc: number;
}

export interface GenerationData {
    from: string;
    to: string;
    generationmix: GenerationMix[];
}

export interface GenerationApi {
    data: GenerationData[];
}

export interface DailyMix {
    date: string;
    fuelPerc: Record<string, number>;
    cleanEnergyPerc: number;
}

export interface ChargeWindow {
    from: string;
    to: string;
    cleanEnergyPerc: number;
}