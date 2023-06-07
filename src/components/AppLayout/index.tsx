import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <main className="d-flex">
      <Sidebar />
      {children}
    </main>
  );
}
