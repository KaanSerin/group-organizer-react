'use client';
import styles from './index.module.scss';
import { ReactNode, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

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
      <section className={styles.main}>
        <Navbar />
        <main>{children}</main>
      </section>
    </div>
  );
}
