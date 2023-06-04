import styles from './index.module.scss';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className={styles.main}>
      <section className={styles.childrenSection}>
        <>{children}</>
      </section>
      <section className={styles.imageSection} />
    </main>
  );
}
