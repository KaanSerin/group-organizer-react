'use client';
import styles from './index.module.scss';
import { ReactNode, useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function AppLayout({ children }: { children: ReactNode }) {
  const [toggleTrigger, setToggleTrigger] = useState(0);
  const router = useRouter();

  const incrementToggleTrigger = () => {
    setToggleTrigger(toggleTrigger + 1);
  };

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (!auth) {
      router.push('/signin');
    }
  }, [router]);

  return (
    <div className="d-flex">
      <Sidebar toggleTrigger={toggleTrigger} />
      <section className={styles.layoutContainer}>
        <Navbar onToggleClicked={incrementToggleTrigger} />
        <main className={styles.main}>{children}</main>
      </section>
    </div>
  );
}
