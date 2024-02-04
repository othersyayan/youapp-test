'use client';

import { memo, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
// types
import { IUser } from '@/sections/home/dashboard-view';

// ----------------------------------------------------------------------

type Props = {
  type: 'about' | 'interest';
  interests?: string[];
  user: IUser | null;
};

type IAboutDisplay = {
  birthday: string | null;
  horoscope: string | null;
  zodiac: string | null;
  height: number | null;
  weight: number | null;
};

function CardProfileDetail({ type, interests, user }: Props) {
  const router = useRouter();

  const [showForm, setShowForm] = useState<boolean>(false);

  const aboutDisplay = useMemo(() => {
    const value: IAboutDisplay = {
      birthday: (user && user.birthday) || null,
      horoscope: (user && user.horoscope) || null,
      zodiac: (user && user.zodiac) || null,
      height: (user && user.height) || null,
      weight: (user && user.weight) || null,
      // height: 12131,
      // weight: 12131,
    };

    const initialState = Object.entries(value).every(
      ([key, value]) => value === null,
    );

    return { value, initialState };
  }, [user]);

  const handleEditDetail = useCallback(() => {
    if (type === 'about') {
      setShowForm(!showForm);
    } else {
      router.push('/dashboard/interest');
    }
  }, [showForm, setShowForm, router, type]);

  const renderEditButton = (
    <button className="hover:opacity-75" onClick={handleEditDetail}>
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.39248 2.54999L3.57706 8.70541C3.35748 8.93916 3.14498 9.39957 3.10248 9.71832L2.84039 12.0133C2.74831 12.8421 3.34331 13.4087 4.16498 13.2671L6.44581 12.8775C6.76456 12.8208 7.21081 12.5871 7.43039 12.3462L13.2458 6.19082C14.2516 5.12832 14.705 3.91707 13.1396 2.43666C11.5812 0.970408 10.3983 1.48749 9.39248 2.54999Z"
          stroke="white"
          strokeWidth="1.0625"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.42209 3.57715C8.72667 5.53215 10.3133 7.02673 12.2825 7.22506"
          stroke="white"
          strokeWidth="1.0625"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.125 15.5833H14.875"
          stroke="white"
          strokeWidth="1.0625"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  return (
    <div className="flex flex-col gap-4 bg-[#0E191F] rounded-xl p-4">
      <div className="flex flex-row justify-between gap-4 mb-2">
        <p className="capitalize">{type}</p>

        {type === 'about' ? (
          showForm ? (
            <button
              className="text-sm hover:opacity-85"
              onClick={() => setShowForm(!showForm)}
            >
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#D5BE88] via-[#F3EDA6] to-[#94783E]">
                Save & Update
              </span>
            </button>
          ) : (
            renderEditButton
          )
        ) : (
          renderEditButton
        )}
      </div>

      {type === 'about' ? (
        !aboutDisplay.initialState && !showForm ? (
          Object.entries(aboutDisplay.value).map(([key, value]) => (
            <div key={key} className="flex flex-row gap-2 mb-2">
              <p className="text-sm text-white/50 capitalize">{key}:</p>
              <p className="text-sm text-white">
                <span>{value ?? '-'}</span>
                <span>
                  {value && key === 'weight'
                    ? ' kg'
                    : value && key === 'height'
                    ? ' cm'
                    : ''}
                </span>
              </p>
            </div>
          ))
        ) : showForm ? (
          <p className="text-sm text-white/50">Show form</p>
        ) : (
          <p className="text-sm text-white/50">
            Add in your your to help others know you better
          </p>
        )
      ) : type === 'interest' && interests && interests.length ? (
        <div className="grid grid-cols-4 gap-4 mt-2">
          {interests.map((v, i) => (
            <div
              key={i}
              className="bg-white/5 py-2 px-4 rounded-full min-w-max text-center"
            >
              <p className="text-sm font-semibold capitalize">{v}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-white/50">
          Add in your interest to find a better match
        </p>
      )}
    </div>
  );
}

export default memo(CardProfileDetail);
