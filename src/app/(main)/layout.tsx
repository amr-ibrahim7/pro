import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import React from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-[300vh] bg-gradient-to-b from-[rgba(255,255,255,.1)] to[rgba(255,255,255,0)] ">
      <Header />
      <main className="flex-grow container mx-auto p-4">
      
        {children}
      </main>
      <Footer />
    </div>
  );
}