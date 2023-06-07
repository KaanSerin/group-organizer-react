'use client';
import InputWithLabel from '@/components/InputWithLabel';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import AuthContext from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import axios from '@/libs/axios';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    roleId: 2
  });

  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth.user) return;
    router.push('/dashboard');
  }, [auth, router]);

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('auth/register', formData);
      const user = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      if (auth) {
        auth.setUser(user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className="mb-0">Get Started</h1>
      <p className="text-secondary mt-3 fw-medium mb-0">
        Create your account now by entering your details!
      </p>
      <form onSubmit={onFormSubmit}>
        <InputWithLabel
          onChange={onFormDataChange}
          name={'email'}
          className="mt-30"
          label={'Email'}
          placeholder={'Enter your email'}
          type="email"
        />
        <InputWithLabel
          onChange={onFormDataChange}
          name={'username'}
          className="mt-4"
          label={'Username'}
          placeholder={'Enter a username'}
        />
        <InputWithLabel
          onChange={onFormDataChange}
          name={'password'}
          className="mt-4"
          label={'Password'}
          placeholder={'********'}
          type="password"
        />
        <Button type={'submit'} size="lg" className="mt-35 w-100 btn-purple">
          Sign up
        </Button>
      </form>

      <p className="text-center text-secondary fw-medium mt-30">
        Already have an account?{' '}
        <Link href="/signin" className="text-purple">
          Sign in
        </Link>
      </p>
    </div>
  );
}
