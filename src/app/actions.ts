'use server';

import { cookies } from 'next/headers';

// ----------------------------------------------------------------------

export async function getCookie(name: string) {
  const cookie = cookies();
  const res = cookie.get(name);

  return res;
}

export async function deleteCookie(name: string) {
  cookies().delete(name);
}
