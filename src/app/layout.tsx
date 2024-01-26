import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import NextAuthProvider from "@/components/providers/next-auth-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();

    return (
        <html lang="en" suppressHydrationWarning className={inter.className}>
            <body
                className={cn(
                    "min-h-screen bg-neutral-50 font-sans antialiased",
                )}
            >
                <NextAuthProvider session={session}>
                    {children}
                    <Toaster />
                </NextAuthProvider>
            </body>
        </html>
    );
}
