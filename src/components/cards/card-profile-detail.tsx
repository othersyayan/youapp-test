'use client';

import * as Yup from 'yup';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { memo, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
// components
import Toast from '@/components/toast';
import { RHFTextField, RHFSelect } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';
// types
import { IUser, calculateAge } from '@/sections/home/dashboard-view';
import { HOST_API } from '@/config-global';

// ----------------------------------------------------------------------

type Props = {
  type: 'about' | 'interest';
  interests?: string[];
  user: IUser | null;
  handleAfterSubmit: () => void;
};

type IAboutDisplay = {
  birthday: string | null;
  horoscope: string | null;
  zodiac: string | null;
  height: number | null;
  weight: number | null;
};

function CardProfileDetail({
  type,
  interests,
  user,
  handleAfterSubmit,
}: Props) {
  const router = useRouter();

  const [showForm, setShowForm] = useState<boolean>(false);

  const aboutDisplay = useMemo(() => {
    const value: IAboutDisplay = {
      birthday: (user && user.birthday) || null,
      horoscope: (user && user.horoscope) || null,
      zodiac: (user && user.zodiac) || null,
      height: (user && user.height) || null,
      weight: (user && user.weight) || null,
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

  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const [toastType, setToastType] = useState<'success' | 'error' | 'default'>(
    'default',
  );

  const [message, setMessage] = useState('Default toast');

  const FormProfileSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    birthday: Yup.string().required('Birthday is required'),
    gender: Yup.string().required('Gender is required'),
    height: Yup.number().min(1, 'Height is required'),
    weight: Yup.number().min(1, 'Weight is required'),
    horoscope: Yup.string(),
    zodiac: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      username: user?.username ?? '',
      birthday: user?.birthday ?? '',
      gender: user?.gender ?? '',
      height: user?.height ?? 0,
      weight: user?.weight ?? 0,
      horoscope: user?.horoscope ?? '',
      zodiac: user?.zodiac ?? '',
    }),
    [user],
  );

  const methods = useForm({
    resolver: yupResolver(FormProfileSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (formValue) => {
    const token = localStorage.getItem('accessToken');

    setLoading(true);

    try {
      const { data, status } = await axios.put(
        `${HOST_API}/updateProfile`,
        formValue,
        {
          headers: {
            'x-access-token': token,
          },
        },
      );

      if (status === 200 && data) {
        handleAfterSubmit();
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
      setShowForm(!showForm);
      reset();
      setLoading(false);
    }
  });

  const handleShowToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

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

  if (loading) {
    return (
      <div className="animate-pulse flex flex-col gap-4 md:gap-6">
        <div className="rounded-lg bg-slate-700 h-72 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-[#0E191F] rounded-xl p-4">
      <div className="flex flex-row justify-between gap-4 mb-2">
        <p className="capitalize">{type}</p>

        {type === 'about' ? (
          showForm ? (
            <button className="text-sm hover:opacity-85" onClick={onSubmit}>
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
                <span>
                  {value
                    ? key === 'birthday'
                      ? `${new Date(value).getDate()} / ${new Date(
                          value,
                        ).getMonth()} / ${new Date(value).getFullYear()}`
                      : value
                    : '-'}
                </span>
                <span>
                  {value && key === 'weight'
                    ? ' kg'
                    : value && key === 'height'
                    ? ' cm'
                    : value && key === 'birthday'
                    ? calculateAge(value as string) > 0
                      ? ` (Age ${calculateAge(value as string)})`
                      : ''
                    : ''}
                </span>
              </p>
            </div>
          ))
        ) : showForm ? (
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-4">
                <p className="text-sm text-white/50 w-full md:w-2/6">
                  Display name
                </p>
                <div className="w-full md:w-4/6">
                  <RHFTextField
                    type="text"
                    variant="small"
                    name="username"
                    disabled={isSubmitting}
                    placeholder="Enter username"
                  />
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <p className="text-sm text-white/50 w-full md:w-2/6">Gender</p>
                <div className="w-full md:w-4/6">
                  <RHFSelect name="gender" variant="small" />
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <p className="text-sm text-white/50 w-full md:w-2/6">
                  Birthday
                </p>
                <div className="w-full md:w-4/6">
                  <RHFTextField
                    type="date"
                    variant="small"
                    name="birthday"
                    disabled={isSubmitting}
                    placeholder="DD MM YY"
                  />
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <p className="text-sm text-white/50 w-full md:w-2/6">
                  Horoscope
                </p>
                <div className="w-full md:w-4/6">
                  <RHFTextField
                    type="text"
                    variant="small"
                    name="horoscope"
                    disabled={true}
                    placeholder="--"
                  />
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <p className="text-sm text-white/50 w-full md:w-2/6">Zodiac</p>
                <div className="w-full md:w-4/6">
                  <RHFTextField
                    type="text"
                    variant="small"
                    name="zodiac"
                    disabled={true}
                    placeholder="--"
                  />
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <p className="text-sm text-white/50 w-full md:w-2/6">Height</p>
                <div className="w-full md:w-4/6">
                  <RHFTextField
                    type="number"
                    variant="small"
                    name="height"
                    disabled={isSubmitting}
                    placeholder="Add height"
                  />
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <p className="text-sm text-white/50 w-full md:w-2/6">Weight</p>
                <div className="w-full md:w-4/6">
                  <RHFTextField
                    type="number"
                    variant="small"
                    name="weight"
                    disabled={isSubmitting}
                    placeholder="Add weight"
                  />
                </div>
              </div>
            </div>
          </FormProvider>
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

      {showToast && <Toast type={toastType} message={message} />}
    </div>
  );
}

export default memo(CardProfileDetail);
