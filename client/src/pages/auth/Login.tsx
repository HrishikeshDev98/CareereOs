import { useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import { Eye, EyeOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { userLoginStatus } from '@/src/hooks/userLoginStatus'
import { useLogin } from '@/src/modules/auth/useLogin'

type Inputs = {
  email: string
  password: string
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const { loginUser } = useLogin()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = data => {
    loginUser.mutate(data)
  }

  const token = userLoginStatus()
  if (token) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-sm border border-border rounded-xl p-8 bg-card shadow-sm">
        <div className="w-9 h-9 rounded-lg border border-border flex items-center justify-center mb-5">
          <span className="text-muted-foreground text-sm">✦</span>
        </div>

        <h1 className="text-lg font-medium text-foreground mb-1">Welcome back</h1>
        <p className="text-sm text-muted-foreground mb-6">Sign in to your account to continue</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">
              Email address
            </Label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  className={errors.email ? 'border-destructive' : ''}
                />
              )}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-medium text-muted-foreground">
                Password
              </Label>
              <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Your password"
                    className={`pr-9 ${errors.password ? 'border-destructive' : ''}`}
                  />
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loginUser.isPending}>
            {loginUser.isPending ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <div className="flex items-center gap-3 my-4">
          <hr className="flex-1 border-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <hr className="flex-1 border-border" />
        </div>

        <p className="text-sm text-muted-foreground text-center">
          Don't have an account?{' '}
          <a href="/register" className="text-foreground font-medium hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
