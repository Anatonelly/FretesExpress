/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useState } from 'react';

import { tryLogin } from '@/service/auth';

const page = () => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await tryLogin(formData.email, formData.password).then((response) => {
      if (response.Login) {
        localStorage.setItem('token', response.token);
        window.location.href = '/dashboard';
      }
    });
  };

  return (
    <div className='bg-indigo-100 h-screen flex justify-center items-center w-full '>
      <div className='w-auto bg-indigo-50 rounded-lg shadow-3xl shadow-neutral-500 flex flex-col justify-center items-center px-8 py-16 '>
        <div className=' w-full flex items-center justify-center flex-col'>
          <img
            draggable={false}
            className=' h-1/2  w-1/2'
            src='/AnatonellyLogo.png'
            alt=''
          />
          <h2 className='text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900'>
            Entre com sua conta
          </h2>
        </div>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  onChange={handleInputChange}
                  required
                  className='block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Senha
                </label>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  onChange={handleInputChange}
                  required
                  className='block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 s  hadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
