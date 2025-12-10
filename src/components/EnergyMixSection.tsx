'use client';
import React, { useEffect, useState } from 'react';
import { DailyMix } from '@/types';
import { fetchEnergyMix } from '@/api/energyApi';
import EnergyPieChart from './EnergyPieChart';
import { Loader2, AlertCircle } from 'lucide-react';

const EnergyMixSection: React.FC = () => {
    const [data, setData] = useState<DailyMix[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchEnergyMix();
                setData(result);
            } catch (err) {
                console.error(err);
                setError('Failed to load energy mix data.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center gap-2 p-4 text-red-700 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="w-5 h-5" />
                <p>{error}</p>
            </div>
        );
    }

    const getDayLabel = (index: number) => {
        if (index === 0) return 'Today';
        if (index === 1) return 'Tomorrow';
        return 'Day After';
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Energy mix forecast</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.map((day, index) => (
                    <div key={day.date} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
                        <div className="flex justify-between items-baseline mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{getDayLabel(index)}</h3>
                                <p className="text-sm text-gray-500">{day.date}</p>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-bold ${
                                day.cleanEnergyPerc > 50 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {day.cleanEnergyPerc.toFixed(1)}% Clean
                            </div>
                        </div>

                        {}
                        {}
                        <div className="mt-auto">
                            <EnergyPieChart data={day.fuelPerc} />
                        </div>
                        {}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default EnergyMixSection;