'use client';

import React from 'react';
import EnergyMixSection from '../components/EnergyMixSection';
import {ChargingCalculator} from '../components/ChargingCalculator';
import { BatteryCharging } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
            {}
            <header className="bg-white border-b border-gray-200 mb-8 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
                    <div className="bg-green-600 p-2 rounded-lg text-white">
                        <BatteryCharging className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 leading-tight">EcoMonitor</h1>
                            <p className="text-sm text-gray-500">Clean Energy Forecast & EV charge optimization</p>
                    </div>
                </div>
            </header>

            {}
            <main className="max-w-6xl mx-auto px-4 space-y-8">

                {}
                <section>
                    <ChargingCalculator />
                </section>

                <hr className="border-gray-200" />

                {}
                <section>
                    <EnergyMixSection />
                </section>

            </main>

            {}
            <footer className="mt-12 text-center text-gray-400 text-sm py-6">
                <p>&copy; {new Date().getFullYear()} EcoMonitor. Data provided by NESO.</p>
            </footer>
        </div>
    );
}