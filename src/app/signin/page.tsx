'use client';
import InputWithLabel from '@/components/InputWithLabel';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import axios from '../../libs/axios';
import AuthContext from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth.user) return;
    router.push('/');
  }, [auth, router]);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const onFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('here');
    try {
      const res = await axios.post('auth/login', formData);
      const user = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      if (auth) {
        auth.setUser(user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1 className="mb-0">Welcome Back</h1>
      <p className="text-secondary mt-3 fw-medium mb-0">Welcome back! Please enter your details.</p>
      <InputWithLabel
        name="username"
        value={formData.username}
        onChange={onFormDataChange}
        className="mt-30"
        label={'Username'}
        placeholder={'Enter your username'}
      />
      <form onSubmit={onFormSubmit}>
        <InputWithLabel
          name="password"
          className="mt-4"
          label={'Password'}
          placeholder={'********'}
          value={formData.password}
          onChange={onFormDataChange}
          type="password"
        />
        <Button type="submit" size="lg" className="mt-35 w-100 btn-purple">
          Sign in
        </Button>
      </form>
      <p className="text-center text-secondary fw-medium mt-30">
        Don’t have an account?{' '}
        <Link href="/signup" className="text-purple">
          Sign up
        </Link>
      </p>
    </div>
  );
}
