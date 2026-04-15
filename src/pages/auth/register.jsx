import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { registerSchema } from './validation/registerschema'
import { useNavigate, Link } from 'react-router-dom'
import axiosInstance from '../../api/instance'

export const Register = () => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const watchedPassword = watch('password')
  const strengthChecks = [
    { label: '8+ chars',   ok: watchedPassword?.length >= 8 },
    { label: 'Uppercase',  ok: /[A-Z]/.test(watchedPassword || '') },
    { label: 'Lowercase',  ok: /[a-z]/.test(watchedPassword || '') },
    { label: 'Number',     ok: /[0-9]/.test(watchedPassword || '') },
  ]
  const strength = strengthChecks.filter((c) => c.ok).length
  const strengthColor = strength <= 1 ? 'bg-red-400' : strength <= 2 ? 'bg-amber-400' : strength === 3 ? 'bg-yellow-400' : 'bg-emerald-500'

  async function onSubmit(data) {
    setLoading(true)
    try {
      const res = await axiosInstance.post('auth/register', data)
      console.log(res)
      localStorage.setItem('token', res.data.usertoken)
      alert('Registration successful!')
      navigate('/')
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed. Please try again.')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-indigo-100 border border-indigo-50 p-8">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-7">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <Link to="/">
            <span className="text-gray-900 font-semibold text-lg">Vendora</span>
          </Link>
        </div>

        <h1 className="text-gray-900 text-2xl font-semibold">Create an account</h1>
        <p className="text-gray-500 text-sm mt-1 mb-7">
          Already have one?{' '}
          <Link to="/auth/login" className="text-indigo-600 font-medium hover:underline">Sign in</Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

          {/* First + Last name */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">First name</label>
              <input
                {...register('firstName')}
                type="text"
                placeholder="Jane"
                className={`px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.firstName ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Last name</label>
              <input
                {...register('lastName')}
                type="text"
                placeholder="Doe"
                className={`px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.lastName ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email address</label>
            <input
              {...register('email')}
              type="email"
              placeholder="you@example.com"
              className={`px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 pr-11 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.password ? 'border-red-400' : 'border-gray-200'}`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
            {/* Strength meter */}
            {watchedPassword?.length > 0 && (
              <div className="mt-1 space-y-1.5">
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength > i ? strengthColor : 'bg-gray-200'}`} />
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                  {strengthChecks.map((c) => (
                    <span key={c.label} className={`text-xs ${c.ok ? 'text-emerald-600' : 'text-gray-400'}`}>
                      {c.ok ? '✓' : '○'} {c.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>

          {/* Confirm password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Confirm password</label>
            <div className="relative">
              <input
                {...register('confirmPassword')}
                type={showConfirm ? 'text' : 'password'}
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 pr-11 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.confirmPassword ? 'border-red-400' : 'border-gray-200'}`}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showConfirm
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
            {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 shadow-md shadow-indigo-200 mt-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Creating account…
              </>
            ) : 'Create my Vendora account'}
          </button>

        </form>

        <p className="text-center text-xs text-gray-400 mt-5">
          By registering you agree to our{' '}
          <a href="#" className="underline hover:text-gray-600">Terms</a> &amp;{' '}
          <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>
        </p>

      </div>
    </div>
  )
}