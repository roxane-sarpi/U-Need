import React, { useState } from 'react';

export const inputClass = (error) =>
  `px-4 py-3 border-2 ${error ? 'border-red-400 focus:border-red-500' : 'border-primary-light focus:border-primary'} rounded-lg text-base text-ink bg-canvas placeholder-gray-500 focus:outline-none focus:bg-white transition-all autofill:bg-white [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#fff] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-ink)] font-sans`;

export const FormInput = ({ label, id, type = 'text', value, onChange, placeholder, error, onClear }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-primary mb-2 font-sans">{label}</label>
      <div className="relative">
        <input
          type={inputType}
          id={id}
          value={value}
          onChange={(e) => { onChange(e.target.value); onClear?.(); }}
          placeholder={placeholder}
          className={`${inputClass(error)} w-full ${isPassword ? 'pr-12' : ''}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export const CustomCheckbox = ({ id, checked, onChange, error, children }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-3 text-sm font-sans">
      <input type="checkbox" id={id} checked={checked} onChange={onChange} className="sr-only" />
      <label htmlFor={id} className="flex items-center gap-3 cursor-pointer text-ink">
        <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${checked ? 'bg-primary border-primary' : error ? 'bg-white border-red-400' : 'bg-white border-primary-light'}`}>
          {checked && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span className="font-sans">{children}</span>
      </label>
    </div>
    {error && <span className="text-red-500 text-xs ml-8">{error}</span>}
  </div>
);
