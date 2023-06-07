'use client';
import { ReactNode, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';

export default function AppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (!auth) {
      router.push('/signin');
    }
  }, [router]);

  return (
    <main className="d-flex">
      <Sidebar />
      {children}
    </main>
  );
}
