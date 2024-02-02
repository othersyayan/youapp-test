import { useMemo } from 'react';

// ----------------------------------------------------------------------\

type Props = {
  type: 'success' | 'error' | 'default';
  message: string;
};

export default function Toast({ type, message }: Props) {
  const colorType = useMemo(() => {
    let color: string = 'bg-slate-500';

    switch (type) {
      case 'success':
        color = 'bg-green-500';
        break;

      case 'error':
        color = 'bg-red-500';
        break;

      default:
        break;
    }

    return color;
  }, [type]);

  return (
    <div
      className={`fixed top-4 right-4 p-3 ${colorType} rounded-lg shadow-md animate-fade-down animate-once animate-duration-500 min-w-40 flex flex-row gap-2 items-center`}
    >
      {type === 'success' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      )}
      {type === 'error' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      )}

      <p className="text-sm text-white">{message}</p>
    </div>
  );
}
