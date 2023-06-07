'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      router.push('/dashboard');
    } else {
      router.push('/signin');
    }
  }, [router]);

  return <></>;
}
