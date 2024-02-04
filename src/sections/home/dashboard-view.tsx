'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { deleteCookie } from '@/app/actions';
import { useState, useEffect, useCallback } from 'react';
// components
import Toast from '@/components/toast';
import CardProfileDetail from '@/components/cards/card-profile-detail';
import CardProfileHighlight from '@/components/cards/card-profile-highlight';
//
import { HOST_API } from '@/config-global';

// ----------------------------------------------------------------------

export type IUser = {
  email: string;
  username: string;
  interests: string[];
  gender?: string;
  birthday?: string;
  horoscope?: string;
  zodiac?: string;
  height?: number;
  weight?: number;
};

export default function DashboardView() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [user, setUser] = useState<IUser | null>(null);

  const [toastType, setToastType] = useState<'success' | 'error' | 'default'>(
    'default',
  );

  const [message, setMessage] = useState('Default toast');

  const handleLogout = useCallback(async () => {
    await deleteCookie('accessToken');

    localStorage.removeItem('accessToken');

    router.push('/');
  }, [router]);

  const getUserProfile = useCallback(async () => {
    const token = localStorage.getItem('accessToken');

    setLoading(true);

    try {
      const { data, status } = await axios.get(`${HOST_API}/getProfile`, {
        headers: {
          'x-access-token': token,
        },
      });

      if (status === 200 && data) {
        setUser(data.data);
      }
    } catch (error) {
      setToastType('error');

      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data.message
            ? error.response.data.message
            : error.response?.data,
        );
      } else {
        setMessage(error as string);
      }

      handleShowToast();

      handleLogout();
    } finally {
      setLoading(false);
    }
  }, [handleLogout]);

  const handleShowToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const dashboardSkeleton = (
    <div className="animate-pulse flex flex-col gap-4 md:gap-6">
      <div className="flex flex-row items-center gap-4 justify-between">
        <div className="rounded-full bg-slate-700 h-4 w-20" />
        <div className="rounded-full bg-slate-700 h-4 w-20" />
        <div className="rounded-full bg-slate-700 h-4 w-20" />
      </div>

      <div className="rounded-lg bg-slate-700 h-44 w-full" />
      <div className="rounded-lg bg-slate-700 h-24 w-full" />
      <div className="rounded-lg bg-slate-700 h-24 w-full" />
    </div>
  );

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      getUserProfile();
    } else {
      router.push('/');
    }
  }, [getUserProfile, router]);

  return (
    <div className="flex flex-col min-h-screen w-full sm:w-2/3 md:w-3/5 lg:w-2/5 px-4 md:px-6 py-8 bg-[#09141A]">
      {loading ? (
        dashboardSkeleton
      ) : (
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-row items-center gap-4 justify-between mb-4">
            <button
              className="max-w-min flex flex-row items-center gap-2 text-sm hover:opacity-85 w-auto"
              onClick={() => router.push('/dashboard')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              <span>Back</span>
            </button>
            <p className="text-sm">@{user?.username || 'johndoe'}</p>
            <button
              className="max-w-min flex flex-row items-center gap-1 text-sm hover:opacity-85 w-auto text-red-500 stroke-red-500"
              onClick={handleLogout}
            >
              <span>Logout</span>
            </button>
          </div>

          <CardProfileHighlight
            profile={{
              username: user?.username || 'johndoe',
              age: calculateAge(user?.birthday!),
              gender: user?.gender || 'Male',
              zodiac: user?.zodiac,
              horoscope: user?.horoscope,
            }}
          />

          <CardProfileDetail
            type="about"
            user={user}
            handleAfterSubmit={getUserProfile}
          />

          <CardProfileDetail
            user={user}
            type="interest"
            interests={user?.interests || []}
            handleAfterSubmit={() => console.log('none')}
          />
        </div>
      )}

      {showToast && <Toast type={toastType} message={message} />}
    </div>
  );
}

export const calculateAge = (birthdate: string) => {
  const today = new Date();
  const birthDate = new Date(new Date(birthdate).getTime());

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
