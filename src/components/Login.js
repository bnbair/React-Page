import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const GoogleLoginComponent = ({ onSuccess }) => {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log('Google Login Success:', credentialResponse);
          const user = jwtDecode(credentialResponse.credential);
          onSuccess(user);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
};

const SignInForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [user, setUser] = useState(null);

  const onSubmit = data => {
    console.log(data);
    setUser(data.email);
  };

  const handleGoogleSuccess = (user) => {
    setUser(user.email);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-purple-700 to-amber-700">
      {user ? (
        <div className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5">
          <h1 className="text-center text-3xl">Logged in as {user}</h1>
        </div>
      ) : (
        <form className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center text-3xl">Kinda Code</h1>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-light" htmlFor="email">Email</label>
            <input
              className="w-96 px-3 py-2 rounded-md border border-slate-400"
              type="email"
              placeholder="Your Email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-light" htmlFor="password">Password</label>
            <input
              className="w-96 px-3 py-2 rounded-md border border-slate-400"
              type="password"
              placeholder="Your Password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div>
            <input type="checkbox" {...register('remember')} id="remember" />
            <label className="text-sm font-light" htmlFor="remember">Remember me</label>
          </div>
          <button
            className="w-full px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in"
            type="submit"
          >
            Sign In
          </button>
          <GoogleLoginComponent onSuccess={handleGoogleSuccess} />
          <p className="text-right">
            <a className="text-blue-600 text-sm font-light hover:underline" href="https://www.kindacode.com">
              Forget Password?
            </a>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignInForm;
