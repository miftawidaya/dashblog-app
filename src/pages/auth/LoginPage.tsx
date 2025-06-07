// src/pages/auth/LoginPage.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { loginSchema, type LoginInput } from '@/utils/types/validations';
import { AxiosError } from 'axios';
import { useAuthContext } from '@/utils/contexts/AuthContext';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthContext();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data.email, data.password);
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      const error = err as AxiosError;
      const message =
        (error.response?.data as { message?: string })?.message ||
        'Login failed. Please check your email or password.';
      toast.error(message);
    }
  };

  return (
    <div className='mx-auto flex w-full flex-col gap-5'>
      <h1 className='text-xl font-bold'>Log In</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-5'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='email'>Email</Label>
                <FormControl>
                  <Input
                    id='email'
                    type='email'
                    placeholder='Enter your email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='password'>Password</Label>
                <FormControl>
                  <div className='relative'>
                    <Input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Enter your password'
                      {...field}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword((prev) => !prev)}
                      className='text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2'
                    >
                      {showPassword ? (
                        <EyeOffIcon
                          size={18}
                          color='var(--color-neutral-950)'
                        />
                      ) : (
                        <EyeIcon size={18} color='var(--color-neutral-950)' />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Login</Button>

          <div className='text-center text-sm text-neutral-950'>
            Don't have an account?
            <Link
              to='/auth/register'
              className='text-primary-300 ml-1 font-bold hover:underline'
            >
              Register
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
