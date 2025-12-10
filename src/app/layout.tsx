import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "EcoMonitor",
    description: "Clean Energy Forecast & EV charge optimization",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="bg-gray-50 text-gray-900">
        {children}
        </body>
        </html>
    );
}