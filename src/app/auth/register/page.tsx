import type { Metadata } from 'next';
import AuthRegisterView from '@/sections/auth/auth-register-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'YouApp - Register',
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
  return <AuthRegisterView />;
}
