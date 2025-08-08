import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import React from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex flex-col min-h-[300vh]">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}