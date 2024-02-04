import { InputHTMLAttributes } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = InputHTMLAttributes<HTMLSelectElement> & {
  name: string;
  variant: 'small' | 'medium';
};

export default function RHFSelect({ type, name, variant, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative">
          <select
            {...field}
            name={name}
            value={field.value}
            className={`bg-white/10 ${
              field.value !== '' ? 'text-white' : 'text-white/30'
            } text-sm rounded-lg-0 block w-full ${
              variant === 'small' ? 'px-3 py-2' : 'px-5 py-4'
            }  border ${
              error
                ? 'border-red-500 text-red-500 placeholder:text-red-500'
                : 'border-white/10'
            } outline-none focus:outline-white/20 rounded-lg disabled:placeholder:text-white/30 disabled:text-white/30 disabled:cursor-not-allowed`}
            {...other}
          >
            <option value="" className="text-white/30">
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {!!error && (
            <p className="text-xs mt-2 italic text-red-500">*{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
