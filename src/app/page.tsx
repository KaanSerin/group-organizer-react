'use client';

import { useEffect } from 'react';
import axios from '@/libs/axios';

export default function Home() {
  const errorMethod = async () => {
    try {
      await axios.get('auth/profile');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    errorMethod();
  }, []);

  return (
    <main>
      <div>Home</div>
    </main>
  );
}
