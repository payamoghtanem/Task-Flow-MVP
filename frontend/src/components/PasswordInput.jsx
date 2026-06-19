import { useState, useRef, forwardRef } from 'react';

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    width="20" height="20" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeSlashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    width="20" height="20" aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const PasswordInput = forwardRef(function PasswordInput({ className = '', onBlur, ...props }, ref) {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef(null);

  function handleBlur(e) {
    if (wrapperRef.current?.contains(e.relatedTarget)) return;
    onBlur?.(e);
  }

  return (
    <div className="password-input-wrapper" ref={wrapperRef}>
      <input
        ref={ref}
        type={visible ? 'text' : 'password'}
        className={`form-input password-input ${className}`}
        onBlur={handleBlur}
        {...props}
      />
      <button
        type="button"
        className="password-toggle"
        aria-label={visible ? 'Hide password' : 'Show password'}
        onClick={() => setVisible((v) => !v)}
      >
        {visible ? <EyeSlashIcon /> : <EyeIcon />}
      </button>
    </div>
  );
});

export default PasswordInput;
