'use client';
// Api
import {
  getAllDrivers
} from '@/service/driver';
import {
  getUserById 
} from '@/service/user';

//Libs
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

// icons
import { HiIdentification } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";
import { AiOutlineSolution } from "react-icons/ai";
import { SiGoogledocs } from "react-icons/si";
import { GoPlus } from "react-icons/go";

function Motoristas() {
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchTerm(value);
  };


  useEffect(() => {
    const getDrivers = async () => {
      const drivers = await getAllDrivers();
      setFilteredDrivers(drivers.data?.response);
    };
    getDrivers();
  }, []);

  useEffect(() => {
    const fetchUserNames = async () => {
      const names = {};
      for (const driver of filteredDrivers) {
        if (driver.usuario_id) {
          try {
            const user = await getUserById(driver.usuario_id);
            names[driver.usuario_id] = user.data.response[0].nome;
          } catch (error) {
            console.error(`Failed to fetch user ${driver.usuario_id}`, error);
          }
        }
      }
      setUserNames(names);
    };
  
    if (filteredDrivers.length > 0) {
      fetchUserNames();
    }
  }, [filteredDrivers]);
  
 
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
        </div>
        <div className='w-full h-5/6 overflow-y-scroll p-5 bg-neutral-200 rounded-md shadow-lg shadow-black/30'>
          <TableContainer>
            <Table sx={{ overflowY: 'auto' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Telefone</TableCell>
                  <TableCell>CPF</TableCell>
                  <TableCell>Endereço</TableCell>
                  <TableCell>Antt</TableCell>
                  <TableCell>Crlv</TableCell>
                  <TableCell>Cnh</TableCell>
                  <TableCell></TableCell>
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
                      <TableCell>{driver.cpf}</TableCell>
                      <TableCell>          
                         <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <button className='w-auto bg-neutral-600 p-3 rounded-full shadow-lg shadow-black/30'>
                              <FaLocationDot className='w-full text-xl text-white font-bold' />
                            </button>
                          </Dialog.Trigger>
                          <Dialog.Portal>
                            <Dialog.Overlay className='fixed inset-0 bg-black/20' />
                            <Dialog.Content className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-auto h-auto'>
                            <img className='w-auto h-[90vh] object rounded-lg object-contain' src={`https://anatonelly-cadastros-server-sdwt.onrender.com/${driver.endereco}`}/>                            
                            </Dialog.Content>
                          </Dialog.Portal>
                       </Dialog.Root> 
                      </TableCell>
                      <TableCell>
                        <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <button className='w-auto bg-neutral-600 p-3 rounded-full shadow-lg shadow-black/30'>
                              <AiOutlineSolution className='w-full text-xl text-white font-bold' />
                            </button>
                          </Dialog.Trigger>
                          <Dialog.Portal>
                            <Dialog.Overlay className='fixed inset-0 bg-black/20' />
                            <Dialog.Content className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-auto h-auto'>
                            <img className='w-auto h-[90vh] object rounded-lg object-contain'  src={`https://anatonelly-cadastros-server-sdwt.onrender.com/${driver.antt}`}/>                            
                            </Dialog.Content>
                          </Dialog.Portal>
                       </Dialog.Root>
                      </TableCell>
                      <TableCell>
                      <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <button className='w-auto bg-neutral-600 p-3 rounded-full shadow-lg shadow-black/30'>
                              <SiGoogledocs className='w-full text-xl text-white font-bold' />
                            </button>
                          </Dialog.Trigger>
                          <Dialog.Portal>
                            <Dialog.Overlay className='fixed inset-0 bg-black/20' />
                            <Dialog.Content className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-auto h-auto'>
                            <img className='w-auto h-[90vh] object rounded-lg object-contain' src={`https://anatonelly-cadastros-server-sdwt.onrender.com/${driver.crlv}`}/>                            
                            </Dialog.Content>
                          </Dialog.Portal>
                        </Dialog.Root>
                      </TableCell>
                      <TableCell>
                        <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <button className='w-auto bg-neutral-600 p-3 rounded-full shadow-lg shadow-black/30'>
                              <HiIdentification className='w-full text-xl text-white font-bold' />
                            </button>
                          </Dialog.Trigger>
                          <Dialog.Portal>
                            <Dialog.Overlay className='fixed inset-0 bg-black/20' />
                            <Dialog.Content className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-auto h-auto'>
                            <img className='w-auto h-[90vh] object rounded-lg object-contain'  src={`https://anatonelly-cadastros-server-sdwt.onrender.com/${driver.cnh}`}/>                            
                            </Dialog.Content>
                          </Dialog.Portal>
                       </Dialog.Root>
                       </TableCell>
                      <TableCell>
                        <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <button className='w-auto bg-neutral-600 p-3 rounded-full shadow-lg shadow-black/30'>
                              <GoPlus className='w-full text-xl text-white font-bold' />
                            </button>
                          </Dialog.Trigger>
                          <Dialog.Portal>
                            <Dialog.Overlay className='fixed inset-0 bg-black/20' />
                            <Dialog.Content className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-10/12 h-auto'>
                              <div className='flex w-full h-full gap-5'>
                                <div className='w-full h-auto text-nowrap flex flex-col items-center justify-center gap-5'>
                                  <div className='w-full flex items-start justify-center gap-3'>
                                    <div className='h-auto w-full flex flex-col font-semibold'>
                                      Nome do Motorista
                                      <div className=' h-28 bg-zinc-100 shadow-inner shadow-zinc-400 rounded-sm'>
                                        <div className='h-full p-5 flex items-center justify-center text-xl'>
                                          {driver.nome}
                                        </div>
                                      </div>
                                    </div>
                                    <div className='h-auto w-full flex flex-col font-semibold'>
                                     Banco | Agencia | Conta
                                      <div className=' flex min-h-full items-center justify-center gap-5 p-5 h-28 bg-zinc-100 shadow-inner shadow-zinc-400 rounded-sm'>
                                        <div className=' flex min-h-full flex-col justify-center'>
                                          <p>{driver.banco}</p>
                                        </div>
                                        <div className='flex min-h-full flex-col justify-center'>
                                          <p>{driver.agencia}</p>
                                        </div>
                                        <div className='flex min-h-full flex-col justify-center'>
                                          <p>{driver.conta}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='w-full h-32 flex items-start justify-center gap-3'>
                                    <div className='h-full flex flex-col w-full font-semibold text-sm'>
                                      Caminhão
                                      <div className='w-full  bg-zinc-100 h-full shadow-inner shadow-zinc-400 rounded-sm'>
                                        <div className='w-auto px-2 h-full flex items-center justify-center text-sm'>
                                          {driver.caminhao}
                                        </div>
                                      </div>
                                    </div>
                                    <div className='h-full w-full flex flex-col font-semibold text-sm'>
                                      Carroceria
                                      <div className='w-full  bg-zinc-100 h-full shadow-inner shadow-zinc-400 rounded-sm'>
                                        <div className='w-auto px-2 h-full flex items-center justify-center text-sm'>
                                          {driver.carroceria}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className='w-full flex flex-col gap-2 items-start justify-between'>
                                    <div className='w-full h-24 flex items-center justify-between gap-4'>
                                      <div className='h-full flex flex-col w-full  font-semibold text-sm'>
                                        Forma de Pagamento
                                        <div className='w-auto  bg-zinc-100 h-full shadow-inner shadow-zinc-400 rounded-sm'>
                                          <div className='w-auto px-2 h-full flex items-center justify-center text-sm'>
                                            {driver.nome}
                                          </div>
                                        </div>
                                      </div>
                                      <div className='h-full flex flex-col w-full  font-semibold text-sm'>
                                        Telefone
                                        <div className='w-auto bg-zinc-100 h-full shadow-inner shadow-zinc-400 rounded-sm'>
                                          <div className='w-auto px-2 h-full flex items-center justify-center text-sm'>
                                            {driver.telefone}
                                          </div>
                                        </div>
                                      </div>
                                      <div className='h-full flex flex-col w-full  font-semibold text-sm'>
                                        CPF
                                        <div className='  bg-zinc-100 h-full shadow-inner shadow-zinc-400 rounded-sm'>
                                          <div className=' px-2 h-full flex items-center justify-center text-sm'>
                                            {driver.cpf}
                                          </div>
                                        </div>
                                      </div>
                                      <div className='h-full flex flex-col w-full  font-semibold text-sm'>
                                        Pix
                                        <div className='  bg-zinc-100 h-full shadow-inner shadow-zinc-400 rounded-sm'>
                                          <div className=' px-2 h-full flex items-center justify-center text-sm'>
                                            {driver.pix}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='w-full h-24 flex items-center justify-between gap-4'>
                                      <div className='h-full flex flex-col w-full  font-semibold text-sm'>
                                        Responsável
                                        <div className=' h-full bg-zinc-100 shadow-inner shadow-zinc-400 rounded-sm'>
                                          <div className=' px-2 h-full flex items-center justify-center text-sm'>
                                          {userNames[driver.usuario_id] || 'Loading...'}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Dialog.Content>
                          </Dialog.Portal>
                       </Dialog.Root>
                       </TableCell>
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

export default Motoristas;

// https://anatonelly-cadastros-server-sdwt.onrender.com/
// ai coloca o uploads ...