/* eslint-disable react-hooks/rules-of-hooks */
'use client';
// Libs
import React, { useEffect, useState } from 'react';
import ExportXlsx from '@/components/dashboard/ExportXlsx';
import Dashboard from '@/components/dashboard/Dashboard';
import Contratos from '@/components/dashboard/Contratos';
import Compartilhar from '@/components/dashboard/Compartilhar';
import Motoristas from '@/components/dashboard/Motoristas';
import NavBar from '@/components/NavBar';
// Service
import { checkAuth } from '@/service/auth';

// Components
import Loading from '@/components/Loading';

const backToLogin = () => {
  window.location.href = '/login';
};

const handleLogout = () => {
  localStorage.clear();
  backToLogin();
};

const page = () => {
  const [showComponent, setShowComponent] = useState('Motoristas');
  const [isAuthenticaded, setIsAuthenticaded] = useState('loading');
  const checkAuthUseEffect = async () => {
    await checkAuth()
      .then((response) => {
        setIsAuthenticaded(response.auth);
      })
      .catch((error) => {
        backToLogin();
      });
  };
  useEffect(() => {
    checkAuthUseEffect();
  }, []);

  if (isAuthenticaded == 'Authorized') {
    return (
      <div className='w-screen h-screen flex flex-col items-center justify-center lg:pt-16'>
        <NavBar setShowComponent={setShowComponent} />
        {showComponent == 'Dashboard' ? (
          <Dashboard />
        ) : showComponent == 'ExportXlsx' ? (
          <ExportXlsx />
        ) : showComponent == 'Contratos' ? (
          <Contratos />
        ) : showComponent == 'Compartilhar' ? (
          <Compartilhar />
        ) : showComponent == 'Motoristas' ? (
          <Motoristas />
        ): null}
      </div>
    );
  }
  if (isAuthenticaded == 'Unauthorized') {
    backToLogin();
  }
  return <Loading />;
};

export default page;
