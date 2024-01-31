import { useState, InputHTMLAttributes } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

export default function RHFTextField({ name, type, ...other }: Props) {
  const { control } = useFormContext();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative">
          {type === 'password' && (
            <div
              className={`absolute flex right-4 items-center ml-2 h-full cursor-pointer ${
                !!error && 'bottom-3'
              }`}
              onClick={() => setShowPassword(!showPassword)}
            >
              <svg
                className="w-6 h-6 stroke-[#D5BE88]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {showPassword ? (
                  <>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                )}
              </svg>
            </div>
          )}
          <input
            {...field}
            type={type === 'password' && showPassword ? 'text' : type}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            className={`bg-white/10 text-white text-sm rounded-lg-0 block w-full px-5 py-4 border ${
              error
                ? 'border-red-500 text-red-500 placeholder:text-red-500'
                : 'border-white/10'
            } outline-none focus:outline-white/20 rounded-lg disabled:placeholder:text-white/30 disabled:text-white/30 disabled:cursor-not-allowed`}
            {...other}
          />
          {!!error && (
            <p className="text-xs mt-2 italic text-red-500">*{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
