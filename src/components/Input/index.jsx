/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React from 'react';
import { useHookFormMask } from 'use-mask-input';

const index = ({ register, label, name, type, id, placeholder, mask }) => {
  const RegisterWithMask = useHookFormMask(register);

  return (
    <div className='flex flex-col w-full'>
      <label
        htmlFor={id}
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        {label}
      </label>
      <div className='mt-2'>
        <input
          {...(mask
            ? name !== undefined
              ? RegisterWithMask(name, mask)
              : console.log('props.name is undefined')
            : register(name))}
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          className='block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />
      </div>
    </div>
  );
};

export default index;
