'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';

export const MobileAuthScreen: React.FC = () => {
  const { setMobileScreen, updateProfile, login, register: authRegister } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrUser, setEmailOrUser] = useState('dikshant.msbte@example.com');
  const [password, setPassword] = useState('••••••••');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrUser) {
      setError('Please enter your email or username');
      return;
    }
    setError('');
    setSuccess(true);

    if (isRegister) {
      authRegister('New Diploma Student', emailOrUser);
    } else {
      login(emailOrUser);
    }

    setTimeout(() => {
      if (isRegister) {
        setMobileScreen('profile-setup');
      } else {
        setMobileScreen('home');
      }
    }, 600);
  };

  return (
    <div className="min-h-full flex-1 flex flex-col justify-between bg-[#FAF6EE] dark:bg-[#0C0C0C] p-6 select-none">
      {/* Top Header */}
      <div className="pt-4 flex flex-col items-center">
        <Logo size="md" showTagline={false} />
      </div>

      {/* Auth Card */}
      <div className="my-auto w-full max-w-sm mx-auto space-y-5">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-heading font-black text-[#0B3B2E] dark:text-[#FAF6EE]">
            {isRegister ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-[#5F5B52] dark:text-[#A09A8F]">
            {isRegister
              ? 'Join 50,000+ MSBTE diploma students today'
              : 'Sign in to access your notes, jobs, and projects'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-[#FDECEE] border border-[#B3202F]/30 text-xs text-[#B3202F] font-semibold">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 rounded-xl bg-[#E7F7EE] border border-[#1FA971]/30 text-xs text-[#1FA971] font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Signing you in...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Email or Username */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#141414] dark:text-[#DDD]">
              Email or Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#5F5B52] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={emailOrUser}
                onChange={(e) => setEmailOrUser(e.target.value)}
                placeholder="student@msbtescholar.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E6DCC6] dark:border-[#2C2C2C] bg-white dark:bg-[#1A1A1A] text-xs font-medium focus:outline-none focus:border-[#0B3B2E] dark:focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#141414] dark:text-[#DDD]">
                Password
              </label>
              {!isRegister && (
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to your email')}
                  className="text-[11px] font-semibold text-[#0B3B2E] dark:text-[#D4AF37] hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#5F5B52] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#E6DCC6] dark:border-[#2C2C2C] bg-white dark:bg-[#1A1A1A] text-xs font-medium focus:outline-none focus:border-[#0B3B2E] dark:focus:border-[#D4AF37]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5F5B52] hover:text-[#0B3B2E]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#0B3B2E] hover:bg-[#062D24] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
          >
            <span>{isRegister ? 'Create Free Account' : 'Login'}</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center py-2">
          <div className="border-t border-[#E6DCC6] dark:border-[#262626] w-full" />
          <span className="bg-[#FAF6EE] dark:bg-[#0C0C0C] px-3 text-[11px] text-[#5F5B52] absolute font-medium">
            or continue with
          </span>
        </div>

        {/* Google OAuth Button */}
        <button
          onClick={() => {
            updateProfile({ name: 'Dikshant Shahare' });
            setMobileScreen('home');
          }}
          className="w-full py-2.5 px-4 rounded-xl border border-[#E6DCC6] dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] hover:bg-[#FAF6EE] flex items-center justify-center gap-2.5 text-xs font-semibold text-[#141414] dark:text-white transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.14C3.25 21.37 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.59H1.26C.46 8.19 0 10.03 0 12s.46 3.81 1.26 5.41l4.02-3.14z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.63 1.26 6.59l4.02 3.14c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>

      {/* Switch Mode Footer */}
      <div className="text-center pt-4 pb-2">
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-xs text-[#5F5B52] dark:text-[#A09A8F] hover:text-[#0B3B2E] font-medium"
        >
          {isRegister ? (
            <>Already have an account? <span className="font-bold text-[#0B3B2E] dark:text-[#D4AF37]">Login</span></>
          ) : (
            <>Don&apos;t have an account? <span className="font-bold text-[#0B3B2E] dark:text-[#D4AF37]">Sign Up Free</span></>
          )}
        </button>
      </div>
    </div>
  );
};
