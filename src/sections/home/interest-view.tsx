'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

export default function InterestView() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <div className="flex flex-row items-center gap-4 justify-between">
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
        <button className="text-sm hover:opacity-85">
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#AADAFF] to-[#ABFFFD]">
            Save
          </span>
        </button>
      </div>

      <div className="wrapper-text">
        <p className="text-lg lg:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#D5BE88] via-[#F3EDA6] to-[#94783E] mb-2">
          Tell everyone about yourself
        </p>
        <p className="text-2xl font-bold">What interest you?</p>
      </div>
    </div>
  );
}
