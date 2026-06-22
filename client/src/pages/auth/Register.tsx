import { useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { Eye, EyeOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRegister } from '@/src/modules/auth/useRegister'

type Inputs = {
  firstName: string
  lastName: string
  email: string
  password: string
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const { registerUser } = useRegister()

  const onSubmit: SubmitHandler<Inputs> = data => {
    registerUser.mutate(data)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-sm border border-border rounded-xl p-8 bg-card shadow-sm">
        <div className="w-9 h-9 rounded-lg border border-border flex items-center justify-center mb-5">
          <span className="text-muted-foreground text-sm">✦</span>
        </div>

        <h1 className="text-lg font-medium text-foreground mb-1">Create an account</h1>
        <p className="text-sm text-muted-foreground mb-6">Fill in your details to get started</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="firstName" className="text-xs font-medium text-muted-foreground">
                First name
              </Label>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'First name is required' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="firstName"
                    type="text"
                    placeholder="Jane"
                    className={errors.firstName ? 'border-destructive' : ''}
                  />
                )}
              />
              {errors.firstName && (
                <p className="text-xs text-destructive">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="lastName" className="text-xs font-medium text-muted-foreground">
                Last name
              </Label>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Last name is required' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className={errors.lastName ? 'border-destructive' : ''}
                  />
                )}
              />
              {errors.lastName && (
                <p className="text-xs text-destructive">{errors.lastName.message}</p>
              )}
            </div>
          </div>

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
            <Label htmlFor="password" className="text-xs font-medium text-muted-foreground">
              Password
            </Label>
            <div className="relative">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
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

          <Button type="submit" className="w-full" disabled={registerUser.isPending}>
            {registerUser.isPending ? 'Creating account…' : 'Create account'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Register
