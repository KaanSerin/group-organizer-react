'use client';

import { useEffect } from 'react';
import axios from '@/libs/axios';
import { Button } from 'react-bootstrap';

export default function Home() {
  const errorMethod = async () => {
    try {
      await axios.get('auth/profile');
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await axios.post('auth/logout');
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
      <Button onClick={onLogout}>Logout</Button>
    </main>
  );
}
