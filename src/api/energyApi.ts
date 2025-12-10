import axios from 'axios';
import { DailyMix, ChargeWindow } from '@/types';

const USE_MOCK = false;

export const fetchEnergyMix = async (): Promise<DailyMix[]> => {

    const response = await axios.get<DailyMix[]>(`https://eco-monitor-zb93.onrender.com/api/v1/mix-forecast`);

    return response.data || [];
};

export const fetchOptimalCharging = async (durationHours: number): Promise<ChargeWindow> => {

    const response = await axios.get<ChargeWindow>(`https://eco-monitor-zb93.onrender.com/api/v1/charge-window`, {
        params: { duration: durationHours },
    });

    console.log("Otrzymane okno ładowania:", response.data);
    return response.data;
};