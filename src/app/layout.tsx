
import type {Metadata} from 'next';
import { Lora, Oxanium } from 'next/font/google'
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';

const fontBody = Lora({ subsets: ['latin'], variable: '--font-body' })
const fontHeadline = Oxanium({ weight: "700", subsets: ['latin'], variable: '--font-headline' })

export const metadata: Metadata = {
  title: 'UNLABEL',
  description: 'Politics Without the Labels',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-body antialiased",
        fontBody.variable,
        fontHeadline.variable
      )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
