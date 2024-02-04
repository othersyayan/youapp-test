'use client';

import axios from 'axios';
import { deleteCookie } from '@/app/actions';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Select, { StylesConfig, MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import { IUser } from './dashboard-view';
import { HOST_API } from '@/config-global';
import Toast from '@/components/toast';

// ----------------------------------------------------------------------

const animatedComponents = makeAnimated();

const options = [
  { value: 'music', label: 'Music' },
  { value: 'basketball', label: 'Basketball' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'gymming', label: 'Gymming' },
];

const colourStyles: StylesConfig<{ value: string; label: string }, true> = {
  control: (styles, state) => ({
    ...styles,
    backgroundColor: 'transparent',
    borderColor: state.isFocused
      ? 'rgb(255, 255, 255, 0.6)'
      : 'rgb(255, 255, 255, 0.15)',
    color: 'white',
    padding: '0.5rem 0.75rem',
  }),
  option: (styles) => {
    return {
      ...styles,
      color: 'black',
    };
  },
};

// ----------------------------------------------------------------------

export default function InterestView() {
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

  const [selectedOption, setSelectedOptions] = useState<
    MultiValue<{ value: string; label: string }>
  >([]);

  const initOptions = useMemo(() => {
    const userInterests = user?.interests ?? [];

    const selectedValue = options.filter((option) =>
      userInterests!.includes(option.value),
    );

    return selectedValue;
  }, [user]);

  const handleSubmit = useCallback(async () => {
    if (!selectedOption.length) {
      setToastType('error');
      setMessage('Please select your interests!');

      handleShowToast();
    } else {
      const formValue = selectedOption.map((el) => el.value);
      const token = localStorage.getItem('accessToken');

      setLoading(true);

      try {
        const { data, status } = await axios.put(
          `${HOST_API}/updateProfile`,
          {
            ...user,
            interests: formValue,
          },
          {
            headers: {
              'x-access-token': token,
            },
          },
        );

        if (status === 200 && data) {
          router.push('/dashboard');
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
      } finally {
        setLoading(false);
      }
    }
  }, [router, user, selectedOption]);

  const dashboardSkeleton = (
    <div className="animate-pulse flex flex-col gap-4 md:gap-6">
      <div className="flex flex-row items-center gap-4 justify-between">
        <div className="rounded-full bg-slate-700 h-4 w-20" />
        <div className="rounded-full bg-slate-700 h-4 w-20" />
      </div>

      <div className="rounded-lg bg-slate-700 h-36 w-full" />
      <div className="rounded-lg bg-slate-700 h-20 w-full" />
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
    <div className="flex flex-col gap-8 md:gap-12">
      {loading && !user ? (
        dashboardSkeleton
      ) : (
        <>
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
            <button className="text-sm hover:opacity-85" onClick={handleSubmit}>
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

          <Select
            isMulti
            id="interest"
            name="interest"
            className="basic-multi-select"
            classNamePrefix="select"
            options={options}
            styles={colourStyles}
            components={animatedComponents}
            isClearable={false}
            placeholder="Select your interest"
            defaultValue={initOptions}
            onChange={(change) => setSelectedOptions(change)}
          />
        </>
      )}

      {showToast && <Toast type={toastType} message={message} />}
    </div>
  );
}
