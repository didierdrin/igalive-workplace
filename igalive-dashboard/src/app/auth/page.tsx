'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Successfully signed in!');
        router.push('/');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Create admin user document
        await setDoc(doc(db, 'iga_admins', userCredential.user.uid), {
          email,
          name,
          role: 'admin',
          createdAt: new Date().toISOString(),
        });

        toast.success('Account created successfully!');
        router.push('/');
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center px-4">
      <Toaster position="top-right" />
      
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 rounded-full overflow-hidden">
            <Image 
              src="/emerald.jpg" 
              alt="IgaLive Logo" 
              width={48} 
              height={48} 
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isLogin ? 'Sign in to Admin Panel' : 'Create Admin Account'}
          </h2>
          <p className="mt-2 text-center text-sm text-emerald-100">
            igaLive Dashboard Management
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required={!isLogin}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your full name"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg
                    className="h-5 w-5 text-gray-400 hover:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L15.12 15.12m-4.242-4.242L8.464 8.464m1.414 1.414l4.242 4.242"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    )}
                    {showPassword ? null : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.275 4.057-5.065 7-9.543 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-100 hover:text-white underline"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
