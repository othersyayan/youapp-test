'use server';

import { cookies } from 'next/headers';

// ----------------------------------------------------------------------

export async function getCookieValue(name: string) {
  cookies().get(name);
}
