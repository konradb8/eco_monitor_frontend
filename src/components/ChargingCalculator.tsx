import React, { useState } from 'react';
import { fetchOptimalCharging } from '../api/energyApi';
import { ChargeWindow } from '@/types';

export const ChargingCalculator = () => {
    const [duration, setDuration] = useState<number | string>(2);

    const [chargeWindow, setChargeWindow] = useState<ChargeWindow | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFindBestTime = async () => {
        const durationValue = (typeof duration === 'number') ? duration : (Number(duration) || 1);

        setLoading(true);
        setError(null);
        try {
            const result = await fetchOptimalCharging(durationValue);
            console.log("Dane otrzymane z API:", result);
            setChargeWindow(result);
        } catch (err) {
            console.error(err);
            setError("Nie udało się pobrać danych.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr: string | undefined) => {
        if (!dateStr) return '-';
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return "Błąd daty";

            return date.toLocaleString('pl-PL', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return "Błąd";
        }
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        if (val === '') {
            setDuration('');
            return;
        }

        const numVal = parseFloat(val);

        if (!isNaN(numVal)) {
            setDuration(numVal);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                 Clean energy window calcualator
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
                {}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Charging Duration (Hours)
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="24"
                        value={duration}
                        onChange={handleDurationChange}
                        className="w-full p-2 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mb-4">Min: 1h, Max: 6h</p>

                    <button
                        onClick={handleFindBestTime}
                        disabled={loading || duration === ''}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Szukanie...' : 'Calculate'}
                    </button>

                    {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
                </div>

                {}
                <div className="flex-1 border-l pl-6 border-gray-100">
                    <div className="bg-green-50 p-4 rounded border border-green-100">
                        <h3 className="text-green-700 font-semibold mb-3 flex items-center gap-2">
                            Window found
                        </h3>

                        <div className="space-y-3">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Start Charging</span>
                                <span className="font-medium text-gray-900">
                                    {chargeWindow ? formatDate(chargeWindow.from) : '-'}
                                </span>
                            </div>

                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Finish By</span>
                                <span className="font-medium text-gray-900">
                                    {chargeWindow ? formatDate(chargeWindow.to) : '-'}
                                </span>
                            </div>

                            <div className="pt-2">
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-600">Avg Clean Energy</span>
                                    <span className="font-bold text-green-600">
                                        {chargeWindow ? `${chargeWindow.cleanEnergyPerc.toFixed(1)}%` : '%'}
                                    </span>
                                </div>
                                {}
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                                        style={{ width: `${chargeWindow ? chargeWindow.cleanEnergyPerc : 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};