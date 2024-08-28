'use client';
import React, { useEffect, useState } from 'react';

import { getAllUser } from '@/service/user';

// const URL = 'http://localhost:3000';
// const URL = 'https://cadastroanatonelly.vercel.app';
const URL = 'https://www.fretesexpress.com';

const Index = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  useEffect(() => {
    const TakeUser = () => {
      getAllUser().then((response) => {
        setUsuarios(response.data.response);
        console.log(response.data.response);
      });
    };
    TakeUser();
  }, []);

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <div className='w-auto flex flex-col items-center gap-2'>
      <label className='text-lg font-semibold' htmlFor='destino'>
        Usuários
      </label>
      <select
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        name='destino'
        id='destino'
        value={selectedUser}
        onChange={handleChange}
        defaultValue={'placeholder'}
      >
        <option value='placeholder'>Selecione o usuário</option>
        {usuarios.map((user) => (
          <option key={user.nome} value={user.login_id}>
            {user.nome}
          </option>
        ))}
      </select>
      {selectedUser != '' && selectedUser != 'placeholder' ? (
        <a
          className='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
          href={`${URL}?usuario_id=${selectedUser}`}
        >
          Gerar Link
        </a>
      ) : null}
    </div>
  );
};

export default Index;
