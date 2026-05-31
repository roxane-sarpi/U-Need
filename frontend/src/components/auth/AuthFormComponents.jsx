import React from 'react';

export const inputClass = (error) =>
  `px-4 py-3 border-2 ${error ? 'border-red-400 focus:border-red-500' : 'border-primary-light focus:border-primary'} rounded-lg text-base text-ink bg-canvas placeholder-gray-500 focus:outline-none focus:bg-white transition-all autofill:bg-white [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#fff] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-ink)] font-sans`;

export const FormInput = ({ label, id, type = 'text', value, onChange, placeholder, error, onClear }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-sm font-medium text-primary mb-2 font-sans">{label}</label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => { onChange(e.target.value); onClear?.(); }}
      placeholder={placeholder}
      className={inputClass(error)}
    />
    {error && <span className="text-red-500 text-xs">{error}</span>}
  </div>
);

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
