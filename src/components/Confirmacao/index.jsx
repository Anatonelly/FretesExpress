import React from 'react';

const index = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-10 '>
      <div className='w-1/2 flex flex-col gap-10'>
        <p className='text-2xl font-semibold text-center'>
          Cadastro Realizado com sucesso
        </p>
        <p className=' text-xl text-center'>
          Muito Obrigado, logo mais entraremos em contato com propostas de
          fretes.
        </p>
      </div>
      <div className='w-1/2'>
        <img className='w-full' src='/assets/confirmImg.png' alt='' />
      </div>
    </div>
  );
};

export default index;
