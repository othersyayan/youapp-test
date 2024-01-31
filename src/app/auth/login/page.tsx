import type { Metadata } from 'next';
import AuthLoginView from '@/sections/auth/auth-login-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'YouApp - Login',
  icons: [
    {
      rel: 'icon',
      url: '/assets/image/android-icon-144x144.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/assets/image/android-icon-144x144.png',
    },
  ],
};

export default function HomePage() {
  return <AuthLoginView />;
}
