'use client';

import { useRouter } from 'next/navigation';

// import Image from 'next/image';

// ----------------------------------------------------------------------

export default function DashboardView() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'accessToken' + '=; Max-Age=-99999999;';

    router.push('/');
  };

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <div className="flex flex-row items-center gap-4 justify-between">
        <div>Username</div>
        <button
          className="max-w-min flex flex-row items-center gap-1 text-sm hover:opacity-85 w-auto text-red-500 stroke-red-500"
          onClick={handleLogout}
        >
          <span>Logout</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        </button>
      </div>
      <div>Dashboard Page</div>
    </div>
  );
}
