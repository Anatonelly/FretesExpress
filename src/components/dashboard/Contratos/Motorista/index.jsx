import React from 'react';

const index = ({ handleInputChange }) => {
  return (
    <div className='w-full h-full flex gap-2 flex-wrap '>
      {/* Informações do Motorista */}
      <div className='grow basis-96'>
        <label
          htmlFor='nome'
          className='block text-sm font-medium text-gray-900'
        >
          Nome
        </label>
        <input
          type='text'
          id='nome'
          name='nome'
          className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
          placeholder='Nome do Motorista'
          required
          onChange={handleInputChange}
        />
      </div>
      <div className='grow basis-96'>
        <label
          htmlFor='antt'
          className='block text-sm font-medium text-gray-900'
        >
          ANTT
        </label>
        <input
          type='text'
          id='antt'
          name='antt'
          className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
          placeholder='ANTT'
          required
          onChange={handleInputChange}
        />
      </div>
      <div className='grow basis-96'>
        <label
          htmlFor='cpf'
          className='block text-sm font-medium text-gray-900'
        >
          CPF
        </label>
        <input
          type='text'
          id='cpf'
          name='cpf'
          className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
          placeholder='CPF'
          required
          onChange={handleInputChange}
        />
      </div>
      <div className='grow basis-96'>
        <label htmlFor='rg' className='block text-sm font-medium text-gray-900'>
          RG
        </label>
        <input
          type='text'
          id='rg'
          name='rg'
          className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
          placeholder='RG'
          required
          onChange={handleInputChange}
        />
      </div>
      <div className='grow basis-96'>
        <label
          htmlFor='categoria'
          className='block text-sm font-medium text-gray-900'
        >
          Categoria
        </label>
        <input
          type='text'
          id='categoria'
          name='categoria'
          className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
          placeholder='Categoria'
          required
          onChange={handleInputChange}
        />
      </div>

      {/* Endereço */}
      <div className='grow basis-96'>
        <label
          htmlFor='endereco'
          className='block text-sm font-medium text-gray-900'
        >
          Endereço
        </label>
        <input
          type='text'
          id='endereco'
          name='endereco'
          className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
          placeholder='Endereço'
          required
          onChange={handleInputChange}
        />
      </div>

      {/* Endereços de Coleta e Entrega */}
      <div className='grow basis-96'>
        <label
          htmlFor='enderecoColeta'
          className='block text-sm font-medium text-gray-900'
        >
          Endereço de Coleta
        </label>
        <input
          type='text'
          id='enderecoColeta'
          name='enderecoColeta'
          className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
          placeholder='Endereço de Coleta'
          required
          onChange={handleInputChange}
        />
      </div>
      <div className='grow basis-96'>
        <label
          htmlFor='enderecoEntrega'
          className='block text-sm font-medium text-gray-900'
        >
          Endereço de Entrega
        </label>
        <input
          type='text'
          id='enderecoEntrega'
          name='enderecoEntrega'
          className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
          placeholder='Endereço de Entrega'
          required
          onChange={handleInputChange}
        />
      </div>

      {/* Informações do Veículo */}
      <div className='grow basis-96'>
        <label
          htmlFor='placa'
          className='block text-sm font-medium text-gray-900'
        >
          Placa
        </label>
        <input
          type='text'
          id='placa'
          name='placa'
          className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
          placeholder='Placa'
          required
          onChange={handleInputChange}
        />
      </div>
      <div className='grow basis-96'>
        <label
          htmlFor='chassi'
          className='block text-sm font-medium text-gray-900'
        >
          Chassi
        </label>
        <input
          type='text'
          id='chassi'
          name='chassi'
          className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
          placeholder='Chassi'
          required
          onChange={handleInputChange}
        />
      </div>

      {/* Informações Financeiras */}
      <div className='grow basis-96'>
        <label
          htmlFor='valor'
          className='block text-sm font-medium text-gray-900'
        >
          Valor
        </label>
        <input
          type='text'
          id='valor'
          name='valor'
          className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
          placeholder='Valor'
          required
          onChange={handleInputChange}
        />
      </div>
      <div className='grow basis-96'>
        <label
          htmlFor='valorExtenso'
          className='block text-sm font-medium text-gray-900'
        >
          Valor Extenso
        </label>
        <input
          type='text'
          id='valorExtenso'
          name='valorExtenso'
          className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
          placeholder='Valor Extenso'
          required
          onChange={handleInputChange}
        />
      </div>
      <div className='grow basis-96'>
        <label
          htmlFor='banco'
          className='block text-sm font-medium text-gray-900'
        >
          Banco
        </label>
        <input
          type='text'
          id='banco'
          name='banco'
          className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
          placeholder='Banco'
          required
          onChange={handleInputChange}
        />
      </div>
      <div className='grow basis-96'>
        <label
          htmlFor='agencia'
          className='block text-sm font-medium text-gray-900'
        >
          Agência
        </label>
        <input
          type='text'
          id='agencia'
          name='agencia'
          className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
          placeholder='Agência'
          required
          onChange={handleInputChange}
        />
      </div>
      <div className='grow basis-96'>
        <label
          htmlFor='conta'
          className='block text-sm font-medium text-gray-900'
        >
          Conta
        </label>
        <input
          type='text'
          id='conta'
          name='conta'
          className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
          placeholder='Conta'
          required
          onChange={handleInputChange}
        />
      </div>
      <div className='grow basis-96'>
        <label
          htmlFor='data'
          className='block text-sm font-medium text-gray-900'
        >
          Data
        </label>
        <input
          type='date'
          id='data'
          name='data'
          min={new Date().toISOString().split('T')[0]}
          className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
          required
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default index;
