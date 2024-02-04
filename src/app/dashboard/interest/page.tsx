import type { Metadata } from 'next';

import InterestView from '@/sections/home/interest-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'YouApp - Interest',
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

export default function InterestPage() {
  return <InterestView />;
}
