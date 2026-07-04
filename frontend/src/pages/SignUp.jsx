import React from 'react'
import { useNavigate } from 'react-router'
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, isLoading, error } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(username, email, password);
      navigate("/");
    } catch (error) {
      console.log("Error during sign up:", error.message);
    }
  }
  return (
    <div>
      <div
        className='min-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 py-5'
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/background_banner.jpg')",
        }}>
        <div className='max-w-112.5 w-full bg-black bg-opacity-75  px-8 py-14 mx-auto mt-8 rounded-4xl'>
          <h1 className='text-3xl font-medium text-white mb-7'>
            Sign Up
          </h1>
          <form onSubmit={handleSignUp} className='flex flex-col space-y-4'>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username' className='w-full h-12.5 bg-white text-black rounded px-5 text-base' />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@gmail.com' className='w-full h-12.5 bg-white text-black rounded px-5 text-base' />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' className='w-full h-12.5 bg-white text-black rounded px-5 text-base' />
            {error && <p className='text-red-500'>{error}</p>}
            <button type='submit' disabled={isLoading} className='w-full bg-[#e50914] text-white py-2 rounded text-base hover:opacity-90 cursor-pointer'>
              Sign Up
            </button>
          </form>
          <div className='mt-10 text-[#737373] text-sm'>
            <p>
              Already have an account?
              <span onClick={() => navigate("/signin")} className='text-white font-medium cursor-pointer ml-2 hover:underline'>
                Sign In Now
              </span>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignUp
