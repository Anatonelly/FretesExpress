/* eslint-disable react-hooks/rules-of-hooks */
'use clinet';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { FaTrashAlt } from 'react-icons/fa';

const index = ({ motorista_id, ObjectTable, setObjectTable }) => {
  const [estados, setEstados] = useState([]);
  const [selectedOrigem, setSelectedOrigem] = useState('');
  const [selectedDestino, setSelectedDestino] = useState('');

  useEffect(() => {
    // Substitua essa lista pela lista real de estados do Brasil
    const estadosBrasil = [
      'AC',
      'AL',
      'AP',
      'AM',
      'BA',
      'CE',
      'DF',
      'ES',
      'GO',
      'MA',
      'MT',
      'MS',
      'MG',
      'PA',
      'PB',
      'PR',
      'PE',
      'PI',
      'RJ',
      'RN',
      'RS',
      'RO',
      'RR',
      'SC',
      'SP',
      'SE',
      'TO',
    ];

    setEstados(estadosBrasil);
  }, []);

  const handleOrigemChange = (event) => {
    setSelectedOrigem(event.target.value);
  };

  const handleDestinoChange = (event) => {
    setSelectedDestino(event.target.value);
  };

  const handleAdicionar = () => {
    if (selectedOrigem && selectedDestino) {
      if (selectedDestino === 'Todos') {
        // Cria uma nova lista com todas as combinações válidas
        const newRows = estados
          .filter((estadoDestino) => estadoDestino !== selectedOrigem)
          .map((estadoDestino) => ({
            origem: selectedOrigem,
            destino: estadoDestino,
          }));

        // Verifica se as novas combinações já existem na tabela
        const existingRows = newRows.filter(
          (newRow) =>
            !ObjectTable.some(
              (row) =>
                row.origem === newRow.origem && row.destino === newRow.destino
            )
        );

        // Adiciona as novas combinações à tabela
        setObjectTable([...ObjectTable, ...existingRows]);
      } else {
        // Verifica se a rota já existe
        const rotaExistente = ObjectTable.find(
          (row) =>
            row.origem === selectedOrigem && row.destino === selectedDestino
        );

        if (!rotaExistente) {
          setObjectTable([
            ...ObjectTable,
            { origem: selectedOrigem, destino: selectedDestino },
          ]);
        } else {
          console.log('Rota já cadastrada');
        }
      }
    }
  };
  const handleDeleteRow = (index) => {
    const newObjectTable = [...ObjectTable];
    newObjectTable.splice(index, 1);
    setObjectTable(newObjectTable);
  };

  return (
    <div className='h-auto w-full'>
      <div className='w-full flex h-auto items-end justify-start gap-10 p-3'>
        {' '}
        <div className='flex w-auto items-center justify-start gap-5'>
          <div className='w-auto flex flex-col items-start gap-2'>
            <label className='text-lg font-semibold' htmlFor='origem'>
              Origem
            </label>
            <select
              className='w-20'
              name='origem'
              id='origem'
              value={selectedOrigem}
              onChange={handleOrigemChange}
              defaultValue={'placeholder'}
            >
              <option value='placeholder'>Selecione o estado de origem</option>
              {estados.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>{' '}
          </div>
          <div className='w-auto flex flex-col items-start gap-2'>
            <label className='text-lg font-semibold' htmlFor='destino'>
              Destino
            </label>
            <select
              className='w-20'
              name='destino'
              id='destino'
              value={selectedDestino}
              onChange={handleDestinoChange}
              defaultValue={'placeholder'}
            >
              <option value='placeholder'>Selecione o estado de destino</option>
              <option key={'Todos'} value={'Todos'}>
                Todos
              </option>
              {estados.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>{' '}
          </div>
        </div>
        <button
          type='button'
          className='bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white py-1 px-3 rounded-md text-base font-semibold'
          onClick={handleAdicionar}
        >
          Adicionar
        </button>
      </div>
      <div>
        <TableContainer className='w-auto mx-1 h-auto' component={Paper}>
          <Table>
            <TableHead className='flex'>
              <TableRow className='flex'>
                <TableCell className='flex items-center justify-center w-20 '>
                  Origem
                </TableCell>
                <TableCell className='flex items-center justify-center w-20'>
                  Destino
                </TableCell>
                <TableCell className='flex items-center justify-center w-20'>
                  Deletar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className='flex flex-col'>
              {ObjectTable.map((row, index) => (
                <TableRow className='flex' key={index}>
                  <TableCell className='flex items-center justify-center w-20'>
                    {row.origem}
                  </TableCell>
                  <TableCell className='flex items-center justify-center w-20'>
                    {row.destino}
                  </TableCell>
                  <TableCell className='flex items-center justify-center w-20'>
                    <button
                      type='button'
                      onClick={() => handleDeleteRow(index)}
                      className='flex p-2 bg-red-400 rounded hover:bg-red-500 active:bg-red-600'
                    >
                      <FaTrashAlt className='text-white' />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default index;
