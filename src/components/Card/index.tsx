import styles from './index.module.scss';
import { ReactNode } from 'react';

export default function Card({ children }: { children: ReactNode }) {
  return <div className={styles.card}>{children}</div>;
}
