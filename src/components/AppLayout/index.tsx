'use client';
import styles from './index.module.scss';
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
    <div className="d-flex">
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
