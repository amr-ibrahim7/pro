import Header from '@/components/shared/Header';
import React from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-white dark:bg-zinc-900">
      <div className="flex flex-col min-h-screen"> 
        <Header />
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
}