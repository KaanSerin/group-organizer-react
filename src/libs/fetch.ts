import { cookies } from 'next/headers';

export default async function fetchUrl(url: string) {
  const cookieStore = cookies();
  const headers = new Headers();
  headers.append('Cookie', cookieStore.toString());
  const postFix = url.charAt(0) === '/' ? url.slice(1) : url;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${postFix}`, {
    credentials: 'include',
    headers
  });
  return res.json();
}
