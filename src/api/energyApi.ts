import axios from 'axios';
import { DailyMix, ChargeWindow } from '@/types';

const USE_MOCK = false;
const BASE_URL_ENV = process.env.API_BASE_URL;

const BASE_URL = BASE_URL_ENV;

console.log(`Using API Base URL: ${BASE_URL}`)

const mockEnergyMix: DailyMix[] = [
    {
        date: new Date().toISOString().split('T')[0],
        cleanEnergyPerc: 62.5,
        fuelPerc: { 'wind': 35.0, 'solar': 5.0, 'gas': 30.5, 'nuclear': 15.0 },
    }
];

const mockChargingWindow: ChargeWindow = {
    from: new Date(Date.now() + 3600000 * 5).toISOString(),
    to: new Date(Date.now() + 3600000 * 8).toISOString(),
    cleanEnergyPerc: 82.4,
};

export const fetchEnergyMix = async (): Promise<DailyMix[]> => {
    if (USE_MOCK) return Promise.resolve(mockEnergyMix);

    const response = await axios.get<DailyMix[]>(`${BASE_URL}/mix-forecast`);

    return response.data || [];
};

export const fetchOptimalCharging = async (durationHours: number): Promise<ChargeWindow> => {
    if (USE_MOCK) return Promise.resolve(mockChargingWindow);

    const response = await axios.get<ChargeWindow>(`${BASE_URL}/charge-window`, {
        params: { duration: durationHours },
    });

    console.log("Otrzymane okno ładowania:", response.data);
    return response.data;
};