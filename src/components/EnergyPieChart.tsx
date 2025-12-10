'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface Props {
    data: Record<string, number> | undefined | null;
}

const getColor = (source: string) => {
    const s = source.toLowerCase();
    switch (s) {
        case 'wind': return '#10b981';
        case 'solar': return '#f59e0b';
        case 'hydro': return '#06b6d4';
        case 'nuclear': return '#8b5cf6';
        case 'biomass': return '#84cc16';
        case 'gas': return '#64748b';
        case 'coal': return '#1f2937';
        case 'imports': return '#a8a29e';
        default: return '#9ca3af';
    }
};

const EnergyPieChart: React.FC<Props> = ({ data }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const chartData = useMemo(() => {
        if (!data) return [];
        return Object.entries(data).map(([key, value]) => ({
            name: key,
            value: value
        })).filter(item => item.value > 0); // Ukrywamy zerowe wartości
    }, [data]);

    if (!mounted) return <div className="h-48 w-full bg-gray-100 animate-pulse rounded-full"></div>;

    if (!chartData || chartData.length === 0) {
        return <div className="h-48 flex items-center justify-center text-gray-400 text-xs">No Data</div>;
    }

    return (
        <div className="h-48 w-full flex flex-col items-center">
            <div className="flex-1 w-full min-h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={70}
                            paddingAngle={2}
                            dataKey="value"
                            nameKey="name"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getColor(entry.name)} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number) => [`${value.toFixed(1)}%`, 'Share']}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {}
            <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] text-gray-600">
                {chartData.map((d) => (
                    <div key={d.name} className="flex items-center gap-1">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getColor(d.name) }}
                        ></span>
                        <span className="capitalize">{d.name}</span>
                        <span className="font-semibold text-gray-400">({d.value.toFixed(0)}%)</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EnergyPieChart;