import React from 'react';

const index = ({ handleInputChange, handleInputChangeFile }) => {
  return (
    <div className='w-full h-auto flex flex-col items-start justify-start gap-5 px-3 md:flex-row md:items-center md:justify-center'>
      {/* Coluna Esquerda */}
      <div className='w-full h-full flex gap-2 flex-wrap '>
        {/* Nome e Sobrenome */}
        <div className='grow basis-96'>
          <label
            htmlFor='nome'
            className='block text-sm font-medium text-gray-900'
          >
            Nome e Sobrenome
          </label>
          <input
            type='text'
            id='nome'
            name='nome' // Add name attribute
            className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
            placeholder='João Silva'
            required
            onChange={handleInputChange} // Handle input changes
          />
        </div>

        {/* CPF */}
        <div className='grow basis-96'>
          <label
            htmlFor='cpf'
            className='block text-sm font-medium text-gray-900'
          >
            CPF
          </label>
          <input
            type='cpf'
            id='cpf'
            name='cpf' // Add name attribute
            className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
            placeholder='999.999.999-99'
            required
            onChange={handleInputChange} // Handle input changes
          />
        </div>
        {/* Telefone */}
        <div className='grow basis-96'>
          <label
            htmlFor='telefone'
            className='block text-sm font-medium text-gray-900'
          >
            Telefone
          </label>
          <input
            type='tel'
            id='telefone'
            name='telefone' // Add name attribute
            className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
            placeholder='(12) 3456-7899'
            required
            onChange={handleInputChange} // Handle input changes
          />
        </div>

        {/* E-mail */}
        <div className='grow basis-96'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-900'
          >
            E-mail
          </label>
          <input
            type='email'
            id='email'
            name='email' // Add name attribute
            className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
            placeholder='joao.silva@empresa.com'
            required
            onChange={handleInputChange} // Handle input changes
          />
        </div>

        {/* Tipo de Caminhão */}
        <div className='grow basis-96'>
          <label
            htmlFor='caminhao'
            className='block text-sm font-medium text-gray-900'
          >
            Tipo de Caminhão
          </label>
          <select
            type='text'
            id='caminhao'
            name='caminhao' // Add name attribute
            className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
            placeholder='Caminhão Baú, Truck, etc.'
            required
            defaultValue={'placeholder'}
            onChange={handleInputChange} // Handle input changes
          >
            <option disabled value='placeholder'>
              Selecione o tipo de caminhão
            </option>

            {/* Options for the caminhão types */}
            <option value='3/4'>3/4</option>
            <option value='Fiorino'>Fiorino</option>
            <option value='Toco'>Toco</option>
            <option value='VLC'>VLC</option>
            <option value='Bitruck'>Bitruck</option>
            <option value='Truck'>Truck</option>
            <option value='Bitrem'>Bitrem</option>
            <option value='Carreta'>Carreta</option>
            <option value='Carreta LS'>Carreta LS</option>
            <option value='Rodotrem'>Rodotrem</option>
            <option value='Vanderléia'>Vanderléia</option>
          </select>
        </div>
        <div className='grow basis-96'>
          <label
            htmlFor='carroceria'
            className='block text-sm font-medium text-gray-900'
          >
            Tipo de Carroceria
          </label>
          <select
            type='text'
            id='carroceria'
            name='carroceria' // Add name attribute
            className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
            placeholder='Selecione o tipo de carroceria'
            required
            defaultValue={'placeholder'}
            onChange={handleInputChange} // Handle input changes
          >
            <option disabled value='placeholder'>
              Selecione o tipo de carroceria
            </option>

            {/* Options for the carroceria types */}
            <option value='Baú'>Baú</option>
            <option value='Baú Frigorífico'>Baú Frigorífico</option>
            <option value='Baú Refrigerado'>Baú Refrigerado</option>
            <option value='Sider'>Sider</option>
            <option value='Caçamba'>Caçamba</option>
            <option value='Grade Baixa'>Grade Baixa</option>
            <option value='Graneleiro'>Graneleiro</option>
            <option value='Plataforma'>Plataforma</option>
            <option value='Prancha'>Prancha</option>
            <option value='Apenas Cavalo'>Apenas Cavalo</option>
            <option value='Bug Porta Container'>Bug Porta Container</option>
            <option value='Cavaqueira'>Cavaqueira</option>
            <option value='Cegonheiro'>Cegonheiro</option>
            <option value='Gaiola'>Gaiola</option>
            <option value='Hopper'>Hopper</option>
            <option value='Munck'>Munck</option>
            <option value='Silo'>Silo</option>
            <option value='Tanque'>Tanque</option>
          </select>
        </div>

        {/* banco */}
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
            onChange={handleInputChange} // Handle input changes
          />
        </div>

        {/* agencia*/}
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
            onChange={handleInputChange} // Handle input changes
          />
        </div>
        {/* conta*/}
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
            onChange={handleInputChange} // Handle input changes
          />
        </div>

        {/* pix*/}
        <div className='grow basis-96'>
          <label
            htmlFor='pix'
            className='block text-sm font-medium text-gray-900'
          >
            Chave Pix
          </label>
          <input
            type='text'
            id='pix'
            name='pix'
            className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
            placeholder='Chave Pix'
            required
            onChange={handleInputChange} // Handle input changes
          />
        </div>

        <div className='grow basis-96'>
          <label
            htmlFor='cnh'
            className='block text-sm font-medium text-gray-900'
          >
            Anexar CNH
          </label>
          <input
            type='file'
            accept='image/png, image/jpeg'
            id='cnh'
            name='cnh'
            className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
            required
            onChange={handleInputChangeFile}
          />
        </div>

        <div className='grow basis-96'>
          <label
            htmlFor='antt'
            className='block text-sm font-medium text-gray-900'
          >
            Anexar ANTT
          </label>
          <input
            type='file'
            accept='image/png, image/jpeg'
            id='antt'
            name='antt'
            className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
            required
            onChange={handleInputChangeFile}
          />
        </div>
        <div className='grow basis-96'>
          <label
            htmlFor='crlv'
            className='block text-sm font-medium text-gray-900'
          >
            Anexar CRLV
          </label>
          <input
            type='file'
            accept='image/png, image/jpeg'
            id='crlv'
            name='crlv'
            className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
            required
            onChange={handleInputChangeFile}
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
            type='file'
            accept='image/png, image/jpeg'
            id='endereco'
            name='endereco' // Add name attribute
            className='bg-gray-200 text-black text-sm rounded-lg p-3 h-12 w-full'
            placeholder='Rua X, Número Y, Bairro Z, Cidade W'
            required
            onChange={handleInputChangeFile} // Handle input changes
          />
        </div>
      </div>
    </div>
  );
};

export default index;
