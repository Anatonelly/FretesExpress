/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useState } from 'react';

const NavItem = ({
  name,
  component,
  current,
  setCurrent,
  setShowComponent,
}) => {
  return (
    <div
      id='item'
      className={`text-white w-auto px-4 lg:py-1 py-2 h-10 flex items-center justify-center border-0 lg:bg-transparent ${
        current == true ? ' bg-neutral-600' : ' bg-neutral-500'
      }  lg:rounded-md rounded-none transition-all duration-100`}
    >
      <p
        className={`transition-all duration-100 break-keep text-center cursor-pointer ${
          current ? 'font-bold' : 'font-medium'
        } ${current ? 'text-lg' : 'text-base'}`}
        onClick={() => (setShowComponent(component), setCurrent(name))}
      >
        {name}
      </p>
    </div>
  );
};

const navItems = [
  { name: 'Dashboard', component: 'Dashboard', current: false },
  { name: 'Exportar Rotas', component: 'ExportXlsx', current: false },
  { name: 'Contratos', component: 'Contratos', current: false },
  { name: 'Compartilhar', component: 'Compartilhar', current: false },
  { name: 'Motoristas', component: 'Motoristas', current: true },
];

const NavMobile = ({ setShowComponent }) => {
  const [currentNavItem, setCurrentNavItem] = useState('Motoristas'); // Define o estado inicial
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='w-full absolute top-0 bg-neutral-700 h-16 flex items-center justify-start py-2 px-4'>
      {/* Hamburguer Menu */}
      <button className='lg:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='white'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </button>
      {/* Menu Mobile */}
      <div
        className={`bg-neutral-700 absolute top-16 left-0 w-full md:w-1/3 h-auto transition-all duration-300 ease-in-out  ${
          isMenuOpen ? 'opacity-100' : 'opacity-0'
        } ${isMenuOpen ? 'scale-100' : 'scale-0'}`}
        style={{
          transformOrigin: 'top left',
        }}
      >
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            name={item.name}
            component={item.component}
            current={item.name === currentNavItem}
            setCurrent={setCurrentNavItem}
            setShowComponent={setShowComponent}
          />
        ))}
      </div>
    </div>
  );
};

const NavDesktop = ({ setShowComponent }) => {
  const [currentNavItem, setCurrentNavItem] = useState('Motoristas');

  return (
    <div className='w-full absolute top-0 bg-neutral-700 h-16 flex items-center justify-start py-2 px-4'>
      <div className='w-2/3 flex items-center justify-start gap-3 pl-10 '>
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            name={item.name}
            component={item.component}
            current={item.name === currentNavItem}
            setCurrent={setCurrentNavItem}
            setShowComponent={setShowComponent}
          />
        ))}
      </div>
    </div>
  );
};

const index = ({ setShowComponent }) => {
  return (
    <div className='w-full'>
      {/* Renderiza a navbar adequada com base na tela */}
      <div className='lg:flex hidden'>
        <NavDesktop setShowComponent={setShowComponent} />
      </div>
      <div className='lg:hidden flex'>
        <NavMobile setShowComponent={setShowComponent} />
      </div>
    </div>
  );
};

export default index;
