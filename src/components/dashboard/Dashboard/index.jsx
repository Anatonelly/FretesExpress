/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useEffect, useState } from 'react';
import Graphy1 from './Graph1';
import Graphy2 from './Graph2';
import Graphy3 from './Graph3';
import { getAllUniqueDrivers } from '@/service/driver';
import { getAllRoutes } from '@/service/route';
const index = () => {
  const [selectedOption, setSelectedOption] = useState('Rotas');
  const [numeroMotoristas, setNumeroMotoristas] = useState(0);
  const [qtdRotas, setQtdRotas] = useState(0);
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    getAllUniqueDrivers().then((response) => {
      setNumeroMotoristas(response.data.response[0].total);
      console.log(response.data.response);
    });
    getAllRoutes().then((response) => {
      setQtdRotas(response.data.response.length);
    });
  }, []);

  return (
    <div className='bg-neutral-50 w-full h-full flex flex-col items-center lg:justify-evenly justify-start gap-10 p-5 lg:mt-0 mt-16'>
      <div className='flex lg:flex-row flex-col w-full h-full items-center justify-around gap-10 lg:p-10 '>
        <div className='lg:w-1/5 w-full lg:h-full h-1/3 flex flex-col items-center justify-center lg:gap-10 gap-5 '>
          <div className='bg-neutral-300 lg:h-1/2 h-full w-full rounded-lg flex flex-col items-center justify-center gap-5 text-black shadow-lg shadow-black/50 p-5'>
            <h3 className='lg:text-2xl md:text-xl sm:text-lg text-base font-semibold text-center'>
              Motoristas Cadastrados:
            </h3>
            <h2 className='lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-normal'>
              {numeroMotoristas}
            </h2>
          </div>
          <div className='bg-neutral-300 lg:h-1/2 h-full w-full rounded-lg flex flex-col items-center justify-center gap-5 text-black shadow-lg shadow-black/50 p-5'>
            <h3 className='lg:text-2xl md:text-xl sm:text-lg text-base font-semibold text-center'>
              Quantidade de rotas:
            </h3>
            <h2 className='lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-normal'>
              {qtdRotas}
            </h2>
          </div>
        </div>
        <div className='bg-neutral-300 lg:h-full h-1/2 lg:w-1/2 w-full rounded-lg flex flex-col items-start justify-between gap-5 text-black shadow-lg shadow-black/50 lg:p-10 p-5'>
          <div className=' w-full'>
            <select
              className='text-black text-sm rounded lg:px-2 px-1 lg:py-0.5 py-0 shadow-md shadow-black/50 '
              name=''
              id=''
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option className='bg-white' value='Rotas'>
                Rotas
              </option>
              <option className='bg-white' value='Motoristas'>
                Quantidade Motoristas Cadastrados
              </option>
              <option className='bg-white' value='Ranking'>
                Ranking
              </option>
            </select>
          </div>
          <div className='w-full h-5/6 '>
            {selectedOption === 'Motoristas' ? (
              <Graphy2 />
            ) : selectedOption === 'Rotas' ? (
              <Graphy1 />
            ) : selectedOption === 'Ranking' ? (
              <Graphy3 />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
