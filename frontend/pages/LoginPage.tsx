import React, { useState, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../components/icons';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('تمام فیلدها الزامی هستند.');
      return;
    }

    if (!validateEmail(email)) {
      setError('فرمت ایمیل نامعتبر است.');
      return;
    }
    
    setIsLoading(true);
    try {
      await login(email);
      navigate('/');
    } catch (err) {
      setError('نام کاربری یا رمز عبور اشتباه است.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent p-4">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            خوش آمدید
          </h1>
          <p className="text-slate-300 mt-2">برای ادامه وارد شوید</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-slate-300"
            >
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-white bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-slate-300"
            >
              رمز عبور
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-white bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[48px] flex items-center justify-center px-4 py-3 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Spinner className="w-6 h-6" /> : 'ورود'}
          </button>
        </form>
        <p className="text-sm text-center text-slate-400">
          حساب کاربری ندارید؟{' '}
          <a
            href="#"
            className="font-medium text-cyan-400 hover:underline"
          >
            ثبت نام
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
