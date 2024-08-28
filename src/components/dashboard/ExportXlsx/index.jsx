'use client';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { getAllDriversWithRoute } from '@/service/driver';
import {
  getRouteByOrigem,
  getRouteByDestino,
  getRouteByOrigemDestino,
} from '@/service/route';

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { PiExportFill } from 'react-icons/pi';
import { FaFilter } from 'react-icons/fa';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

function ExportXlsx() {
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [destino, setDestino] = useState('Todos');
  const [origem, setOrigem] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'Origem') {
      setOrigem(value);
    }
    if (name === 'Destino') {
      setDestino(value);
    }
    if (name === 'Search') {
      setSearchTerm(value);
    }
  };

  const handleDownload = () => {
    const existingPhones = new Set();

    const rows = filteredDrivers
      .filter((driver) => {
        if (existingPhones.has(driver.telefone)) {
          return false;
        } else {
          existingPhones.add(driver.telefone);
          return true;
        }
      })
      .map((driver) => ({
        nome: driver.nome,
        telefone: driver.telefone,
      }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Motoristas');
    XLSX.writeFile(workbook, 'motoristas.xlsx', { compression: true });
  };

  useEffect(() => {
    const getDrivers = async () => {
      const drivers = await getAllDriversWithRoute();
      setFilteredDrivers(drivers.data?.response);
    };
    getDrivers();
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();

    if (origem === 'Todos' && destino === 'Todos') {
      const consulta = await getAllDriversWithRoute();
      setFilteredDrivers(consulta.data?.response);
    }
    if (origem !== 'Todos' && destino === 'Todos') {
      const consulta = await getRouteByOrigem(origem);
      setFilteredDrivers(consulta.data?.response);
    }
    if (origem === 'Todos' && destino !== 'Todos') {
      const consulta = await getRouteByDestino(destino);
      setFilteredDrivers(consulta.data?.response);
    }
    if (origem !== 'Todos' && destino !== 'Todos') {
      const consulta = await getRouteByOrigemDestino(origem, destino);
      setFilteredDrivers(consulta.data?.response);
    }
  };

  const filteredBySearchTerm = filteredDrivers.filter((driver) =>
    driver.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <div className='w-4/5 h-5/6 flex flex-col items-center justify-center gap-5 bg-neutral-300 rounded-lg p-5 shadow-lg shadow-black/60'>
        <div className='flex w-full items-center justify-end gap-3'>
          <input
            type="text"
            name="Search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleInputChange}
            className="w-96 h-6 rounded p-2"
          />
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className='w-auto bg-neutral-600 p-3 rounded-full shadow-lg shadow-black/30'>
                <FaFilter className='w-full text-xl text-white font-bold' />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className='min-w-[220px] mt-2 bg-neutral-200 rounded-md p-[5px] shadow-lg shadow-black/50 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade'
                sideOffset={5}
              >
                <DropdownMenu.Group className='flex flex-col w-full gap-5 justify-center items-center'>
                  <form
                    id='filter'
                    className='flex w-full justify-center items-center'
                  >
                    <div className='flex flex-col w-full gap-2 px-3 py-2'>
                      <label htmlFor='Origem'>Origem</label>
                      <select
                        onChange={handleInputChange}
                        name='Origem'
                        id='Origem'
                        defaultValue={'placeholder'}
                      >
                        <option disabled value='placeholder'>
                          Cidade
                        </option>
                        <option value='Todos'>Todos</option>
                        {estados.map((estado, index) => (
                          <option key={index} value={estado}>
                            {estado}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='flex flex-col w-full gap-2 px-3 py-2'>
                      <label htmlFor='Destino'>Destino</label>
                      <select
                        onChange={handleInputChange}
                        name='Destino'
                        id='Destino'
                        defaultValue={'placeholder'}
                      >
                        <option disabled value='placeholder'>
                          Cidade
                        </option>
                        <option value='Todos'>Todos</option>
                        {estados.map((estado, index) => (
                          <option key={index} value={estado}>
                            {estado}
                          </option>
                        ))}
                      </select>
                    </div>
                  </form>
                  <button
                    form='filter'
                    onClick={handleClick}
                    className='rounded bg-neutral-600 text-white p-2'
                  >
                    Filtrar
                  </button>
                </DropdownMenu.Group>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <button
            className='w-auto bg-neutral-600 p-3 rounded-full shadow-lg shadow-black/30'
            onClick={handleDownload}
          >
            <PiExportFill className='w-full text-xl text-white font-bold' />
          </button>
        </div>
        <div className='w-full h-5/6 overflow-y-scroll p-5 bg-neutral-200 rounded-md shadow-lg shadow-black/30'>
          <TableContainer>
            <Table sx={{ overflowY: 'auto' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Telefone</TableCell>
                  <TableCell>Origem</TableCell>
                  <TableCell>Destino</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBySearchTerm.length > 0 ? (
                  filteredBySearchTerm.map((driver) => (
                    <TableRow
                      className='border-y-[2px] border-neutral-500'
                      key={driver.id}
                    >
                      <TableCell>{driver.nome}</TableCell>
                      <TableCell>{driver.telefone}</TableCell>
                      <TableCell>{driver.origem}</TableCell>
                      <TableCell>{driver.destino}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>
                      Nenhum motorista encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default ExportXlsx;
