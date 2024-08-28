/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useState } from 'react';
import Contratante from './Contratante';
import Motorista from './Motorista';
import { ContratoMotorista, ContratoContratante } from '@/service/contract';

const index = () => {
  const [contract, setContract] = useState('');
  const [formData, setFormData] = useState({});
  const [missing, setMissing] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    // Atualiza a lista de campos faltantes
    if (!value) {
      if (!missing.includes(name)) {
        setMissing((prev) => [...prev, name]);
      }
    } else {
      setMissing((prev) => prev.filter((item) => item !== name));
    }
  };

  const handleInputChangeFile = (event) => {
    const { name } = event.target;
    const value = event.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validação dos campos
    if (!isValidFormData(formData, contract)) {
      // Passa o contrato para validação
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      if (contract === 'Motorista') {
        await ContratoMotorista(
          formData.nome,
          formData.antt,
          formData.cpf,
          formData.rg,
          formData.categoria,
          formData.endereco,
          formData.enderecoColeta,
          formData.enderecoEntrega,
          formData.placa,
          formData.chassi,
          formData.valor,
          formData.valorExtenso,
          formData.banco,
          formData.agencia,
          formData.conta,
          formData.data
        );
      } else if (contract === 'Contratante') {
        await ContratoContratante(
          formData.nomeMotorista,
          formData.cpfMotorista,
          formData.rgMotorista,
          formData.categoria,
          formData.contratante,
          formData.cpfCNPJ,
          formData.antt,
          formData.endereco,
          formData.enderecoColeta,
          formData.enderecoEntrega,
          formData.placa,
          formData.chassi,
          formData.valor,
          formData.valorExtenso,
          formData.banco,
          formData.agencia,
          formData.conta,
          formData.data
        );
      }
      setFormData({}); // Limpa o formulário após o envio
      setMissing([]); // Limpa a lista de campos faltantes
      alert('Contrato cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar contrato:', error);
      alert('Erro ao cadastrar contrato. Tente novamente.');
    }
  };

  // Função para validar se o FormData está completo
  const isValidFormData = (formData, contract) => {
    // Verifique se todos os campos obrigatórios estão preenchidos
    // Adapte a lógica de validação de acordo com as informações do seu formulário

    if (contract === 'Motorista') {
      if (
        !formData.nome ||
        !formData.antt ||
        !formData.cpf ||
        !formData.rg ||
        !formData.categoria ||
        !formData.endereco ||
        !formData.enderecoColeta ||
        !formData.enderecoEntrega ||
        !formData.placa ||
        !formData.chassi ||
        !formData.valor ||
        !formData.valorExtenso ||
        !formData.banco ||
        !formData.agencia ||
        !formData.conta ||
        !formData.data
      ) {
        console.log(formData);
        alert('Preencha todos os campos obrigatórios para o Motorista!');
        return false;
      }
    } else if (contract === 'Contratante') {
      if (
        !formData.nomeMotorista ||
        !formData.cpfCNPJ ||
        !formData.cpfMotorista ||
        !formData.endereco ||
        !formData.enderecoColeta ||
        !formData.enderecoEntrega ||
        !formData.placa ||
        !formData.chassi ||
        !formData.valor ||
        !formData.valorExtenso ||
        !formData.banco ||
        !formData.agencia ||
        !formData.conta ||
        !formData.data ||
        !formData.crlv
      ) {
        console.log(formData);
        alert('Preencha todos os campos obrigatórios para o Contratante!');
        return false;
      }
    }

    return true;
  };

  return (
    <div
      className={`${
        contract ? 'justify-start' : 'justify-center'
      } w-full h-full flex items-center flex-col`}
    >
      <div className='flex items-center justify-center gap-5 h-1/12 w-full py-2'>
        <button
          onClick={() => setContract('Contratante')}
          className='bg-violet-600 hover:bg-violet-700 hover:scale-105 transition-all duration-100 px-3 py-1 text-white rounded-md font-semibold shadow-md shadow-black/50 '
        >
          Contratante
        </button>
        <button
          onClick={() => setContract('Motorista')}
          className='bg-violet-600 hover:bg-violet-700 hover:scale-105 transition-all duration-100 px-3 py-1 text-white rounded-md font-semibold shadow-md shadow-black/50 '
        >
          Motorista
        </button>
      </div>
      <div
        className={`${
          contract ? 'flex' : 'hidden'
        } w-full h-5/6 flex-col items-center justify-center`}
      >
        <form
          className='w-2/3 h-5/6 flex flex-col items-center justify-center gap-5 overflow-y-auto '
          onSubmit={handleSubmit}
        >
          {contract === 'Contratante' ? (
            <Contratante
              handleInputChange={handleInputChange}
              handleInputChangeFile={handleInputChangeFile}
            />
          ) : contract === 'Motorista' ? (
            <Motorista
              handleInputChange={handleInputChange}
              handleInputChangeFile={handleInputChangeFile}
            />
          ) : null}
        </form>
      </div>
      <div
        className={`${
          contract ? 'flex' : 'hidden'
        } h-1/12 w-full items-center justify-center`}
      >
        <button
          onClick={handleSubmit}
          type='submit'
          className={`${
            contract ? 'flex' : 'hidden'
          }  bg-violet-600 hover:bg-violet-700 hover:scale-105 transition-all duration-100 px-3 py-1 text-white rounded-md font-semibold shadow-md shadow-black/50 `}
        >
          Finalizar Contrato
        </button>
      </div>
    </div>
  );
};

export default index;
