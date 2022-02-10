/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import {useState} from "react"
import Head from 'next/head';

export default function LoginPage() {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    setloading(true)
    const d = await fetch('/api/auth/login', {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((imp) => imp.data);

    if (d.token) {
      // console.log(d.token);
      Cookie.set('token', d.token);
      router.push('/');
    }

    if (d.error) {
      alert(`${d.error}`);
    }
    setloading(false)
  };

  return (
    <div className='flex items-center flex-col justify-center min-h-screen'>
      <Head>
        <title>Sign In - Twitter</title>
      </Head>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-start space-y-5 p-6 border border-zinc-700 sm:w-[500px] w-5/6 bg-opacity-60  bg-gray-700 rounded !font-poppins'
      >
        <div className='flex items-center justify-center space-x-4'>
          <img
            src='https://www.pngkey.com/png/full/2-27646_twitter-logo-png-transparent-background-logo-twitter-png.png'
            alt=''
            className='w-[80px] hover-animation'
          />
          <h1 className='text-5xl font-bold text-center text-sky-500'>LogIn</h1>
        </div>
        <div className='flex flex-col space-y-2'>
          <label htmlFor='username' className='text-base'>
            Username
          </label>
          <input
            type='text'
            autoComplete='off'
            {...register('username', { required: true, maxLength: 20 })}
            placeholder='Enter username'
            id='username'
            className='text-base px-3 focus:outline-none bg-transparent border-sky-400 border py-2 rounded focus:ring-4 ring-sky-500 focus:ring-offset-2 ring-offset-gray-700'
          />
          {errors.username?.type === 'required' && (
            <p className=' error-msg'>username required</p>
          )}
          {errors.username?.type === 'maxLength' && (
            <p className=' error-msg'>username too long</p>
          )}
        </div>
        <div className='flex flex-col space-y-2'>
          <label className='text-base' htmlFor='password'>
            Password
          </label>
          <input
            type={'password'}
            {...register('password', {
              required: true,
            })}
            placeholder='Enter password'
            id='password'
            className='text-base px-3 focus:outline-none bg-transparent border-sky-400 border py-2 rounded focus:ring-4 ring-sky-500 focus:ring-offset-2 ring-offset-gray-700'
          />
          {errors.password?.type === 'required' && (
            <p className=' error-msg'>password required</p>
          )}
          {errors.password?.type === 'maxLength' && (
            <p className=' error-msg'>password too long</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className=' error-msg'>password too short</p>
          )}
        </div>
        <button
          type='submit'
          className='font-mono p-3 rounded bg-sky-400 hover:bg-opacity-90 tracking-wide'
        >
          {loading ? "...." : "LOGIN"}
        </button>
        <p className='underline text-blue-400 cursor-pointer text-center'>
          <Link href={'/auth/register'}>Register Here</Link>
        </p>
      </form>
    </div>
  );
}
