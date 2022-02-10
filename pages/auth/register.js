/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import AuthInputWrapper from '../../components/AuthInputWrapper';
import simplecrypt from 'simplecrypt';
import { route } from 'next/router';
import Cookie from 'js-cookie';


const sc = simplecrypt();

export default function RegisterPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      imageUrl:
        'https://cms.qz.com/wp-content/uploads/2017/03/twitter_egg_blue.png?quality=75&strip=all&w=2200&h=1238',
    },
  });
  const onSubmit = async (data) => {
    setLoading(true);
    if (data.password !== data.confirm_password) {
      setError('Passwords doesnt match');
      return;
    }

    const user = {
      name: data.name,
      username: data.username,
      imageUrl: data.imageUrl,
      password: sc.encrypt(password),
    };

    console.log(user);



    await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setError(data.error);
        } else if (data.token){
          Cookie.set("token", data.token)
          router.push("/")
        }
      });
    
    setLoading(false)
  };

  return (
    <div className='flex items-center flex-col justify-center min-h-screen'>
      <Head>
        <title>Register - Twitter</title>
      </Head>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-start space-y-5 p-6 border border-zinc-700 sm:w-[500px] w-5/6 bg-opacity-60  bg-gray-700 rounded font-poppins'
      >
        <div className='flex items-center justify-center space-x-4'>
          <img
            src='https://www.pngkey.com/png/full/2-27646_twitter-logo-png-transparent-background-logo-twitter-png.png'
            alt=''
            className='w-[80px] hover-animation'
          />
          <h1 className='text-5xl font-bold text-center text-sky-500'>
            Register
          </h1>
        </div>
        {/* error informer text  ----- START-------*/}
        <p className='text-red-500  text-center'>{error && error}</p>
        {/* error informer text  ----- END  ------- */}
        <AuthInputWrapper
          form_key={'name'}
          id={'name'}
          label='Full Name '
          placeholder='Enter full name'
          register={register}
          errors={errors}
        />

        <AuthInputWrapper
          form_key={'username'}
          id={'username'}
          label='Username  '
          placeholder='Enter  username'
          register={register}
          errors={errors}
        />

        <AuthInputWrapper
          form_key={'imageUrl'}
          id={'profile_pic'}
          label='Profile Pic Url'
          placeholder='Provide profile pic url'
          register={register}
          errors={errors}
        />

        <AuthInputWrapper
          form_key='password'
          id='password'
          label='Password '
          register={register}
          errors={errors}
          type='password'
        />

        <AuthInputWrapper
          form_key='confirm_password'
          id='confirm_password'
          label='Confirm Password'
          register={register}
          errors={errors}
          type='password'
        />

        {/* <AuthInputWrapper>
          <label htmlFor="profile_pic_url">Profile Pic (url)</label>
          <input type="text" placeholder='Provide url of the image.' className="auth-input" />
        </AuthInputWrapper>  */}
        <button
          type='submit'
          className='font-mono p-3 rounded bg-sky-400 hover:bg-opacity-90 tracking-wide'
        >
          {loading ? "...." : "REGISTER"}
        </button>
        <p className='underline text-blue-400 cursor-pointer text-center'>
          <Link href={'/auth/login'}>Login Here</Link>
        </p>
      </form>
    </div>
  );
}
