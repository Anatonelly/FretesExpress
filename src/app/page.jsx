'use client';
import { createDriver } from '@/service/driver';
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Dados from '../components/Dados';
import Rotas from '../components/Rotas';
import Confirmacao from '../components/Confirmacao';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { createRoute } from '@/service/route';

function HomeContent() {
  const searchParams = useSearchParams();
  const [usuarioId, setUsuarioId] = useState(null);
  const [formData, setFormData] = useState({}); // State to store form data
  const [contPage, setContPage] = useState(0);
  const [motoristaId, setMotoristaId] = useState({}); // State to store driver data
  const [ObjectTable, setObjectTable] = useState([]);
  const [missing, setMissing] = useState([]);
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  useEffect(() => {
    const usuario_id = searchParams.get('usuario_id');
    if (usuario_id != '' && usuario_id != null) {
      setUsuarioId(usuario_id);
    } else {
      setUsuarioId(1);
    }
  }, [searchParams]);

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleInputChangeFile = (event) => {
    const { name } = event.target;
    const value = event.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (contPage === 0) {
      const formDataPost = new FormData();
      console.log(formData);
      formDataPost.append('usuario_id', usuarioId);
      formDataPost.append('nome', formData.nome);
      formDataPost.append('cpf', formData.cpf);
      formDataPost.append('telefone', formData.telefone);
      formDataPost.append('email', formData.email);
      formDataPost.append('caminhao', formData.caminhao);
      formDataPost.append('carroceria', formData.carroceria);
      formDataPost.append('banco', formData.banco);
      formDataPost.append('agencia', formData.agencia);
      formDataPost.append('conta', formData.conta);
      formDataPost.append('pix', formData.pix);
      formDataPost.append('cnh', formData.cnh);
      formDataPost.append('antt', formData.antt);
      formDataPost.append('crlv', formData.crlv);
      formDataPost.append('endereco', formData.endereco);
      const now = new Date();
      const formattedDate =
        now.getFullYear() +
        '-' +
        String(now.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(now.getDate()).padStart(2, '0') +
        ' ' +
        String(now.getHours()).padStart(2, '0') +
        ':' +
        String(now.getMinutes()).padStart(2, '0') +
        ':' +
        String(now.getSeconds()).padStart(2, '0');

      formDataPost.append('criado_em', formattedDate);

      !formData.nome
        ? !missing.includes('Nome')
          ? setMissing((prev) => [...prev, 'Nome'])
          : null
        : setMissing((prev) => prev.filter((item) => item !== 'Nome'));

      !formData.cpf
        ? !missing.includes('CPF')
          ? setMissing((prev) => [...prev, 'CPF'])
          : null
        : setMissing((prev) => prev.filter((item) => item !== 'CPF'));

      !formData.telefone
        ? !missing.includes('Telefone')
          ? setMissing((prev) => [...prev, 'Telefone'])
          : null
        : setMissing((prev) => prev.filter((item) => item !== 'Telefone'));

      !formData.email
        ? !missing.includes('Email')
          ? setMissing((prev) => [...prev, 'Email'])
          : null
        : setMissing((prev) => prev.filter((item) => item !== 'Email'));

      !formData.caminhao
        ? !missing.includes('Caminhão')
          ? setMissing((prev) => [...prev, 'Caminhão'])
          : null
        : setMissing((prev) => prev.filter((item) => item !== 'Caminhão'));

      !formData.banco
        ? !missing.includes('Banco')
          ? setMissing((prev) => [...prev, 'Banco'])
          : null
        : setMissing((prev) => prev.filter((item) => item !== 'Banco'));

      !formData.agencia
        ? !missing.includes('Agência')
          ? setMissing((prev) => [...prev, 'Agência'])
          : null
        : setMissing((prev) => prev.filter((item) => item !== 'Agência'));

      !formData.conta
        ? !missing.includes('Conta')
          ? setMissing((prev) => [...prev, 'Conta'])
          : null
        : setMissing((prev) => prev.filter((item) => item !== 'Conta'));

      !formData.pix
        ? !missing.includes('Pix')
          ? setMissing((prev) => [...prev, 'Pix'])
          : null
        : setMissing((prev) => prev.filter((item) => item !== 'Pix'));

      !formData.cnh
        ? !missing.includes('CNH')
          ? setMissing((prev) => [...prev, 'CNH'])
          : null
        : setMissing((prev) => prev.filter((item) => item !== 'CNH'));

      !formData.antt
        ? !missing.includes('ANTT')
          ? setMissing((prev) => [...prev, 'ANTT'])
          : null
        : setMissing((prev) => prev.filter((item) => item !== 'ANTT'));

      !formData.crlv
        ? !missing.includes('CRLV')
          ? setMissing((prev) => [...prev, 'CRLV'])
          : null
        : setMissing((prev) => prev.filter((item) => item !== 'CRLV'));

      !formData.endereco
        ? !missing.includes('Endereço')
          ? setMissing((prev) => [...prev, 'Endereço'])
          : null
        : setMissing((prev) => prev.filter((item) => item !== 'Endereço'));

      console.log(missing);

      if (
        !formData.nome ||
        !formData.cpf ||
        !formData.telefone ||
        !formData.email ||
        !formData.caminhao ||
        !formData.carroceria ||
        !formData.banco ||
        !formData.agencia ||
        !formData.conta ||
        !formData.pix ||
        !formData.cnh ||
        !formData.antt ||
        !formData.crlv ||
        !formData.endereco
      ) {
        setState({ vertical: 'bottom', horizontal: 'left', open: true });

        console.log('Preencha todos os campos');
      } else {
        setMotoristaId((await createDriver(formDataPost)).data.motorista_id);
        setContPage(contPage + 1);
        console.log('Motorista cadastrado com sucesso');
      }
    }
    if (contPage === 1) {
      ObjectTable.map(async (rota) => {
        console.log(motoristaId);
        await createRoute(rota.origem, rota.destino, motoristaId);
      });
      setContPage(contPage + 1);
      console.log('Rotas cadastradas com sucesso');
    }
  };

  return (
    <div className='w-full h-screen bg-[#0C1439] -z-50 relative top-0 left-0 lg:p-5 p-5 flex flex-col items-center lg:justify-center justify-start overflow-hidden'>
      <img
        className='absolute -z-40 -top-1/2 -left-1/2'
        src='/assets/blueCircle.svg'
        alt=''
      />
      <img
        className='absolute -z-40 -bottom-1/2 -right-1/2'
        src='/assets/blueCircle.svg'
        alt=''
      />
      {/* {contPage === 0 ? (
        <button className='absolute top-2 right-2 bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white md:py-2 xxs:py-1 md:px-5 xxs:px-1 rounded-md text-base font-semibold'>
          <a className='text-xs' href='/login'>Administração</a>
        </button>
      ) : null} */}

      <div className='bg-neutral-50  lg:w-2/3 w-full h-auto rounded-xl shadow-sky-950 shadow-lg flex flex-col items-start p-3 py-4 gap-5 justify-start overflow-y-auto '>
        {contPage === 2 ? null : (
          <p className='text-xl font-bold'>Cadastro Motorista</p>
        )}

        <form
          encType='multipart/form-data'
          className='w-full h-full flex flex-col gap-5 '
          onSubmit={handleSubmit}
        >
          {' '}
          {contPage === 0 ? (
            <Dados
              handleInputChange={handleInputChange}
              handleInputChangeFile={handleInputChangeFile}
            />
          ) : contPage === 1 ? (
            <Rotas ObjectTable={ObjectTable} setObjectTable={setObjectTable} />
          ) : (
            <Confirmacao />
          )}
          {/* Botão Finalizar */}
          {contPage === 2 ? null : (
            <div className='w-full h-auto flex justify-between lg:pb-0 pb-16 px-3'>
              <button
                type='button'
                className={`bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white py-2 px-5 rounded-md text-base font-semibold`}
                onClick={() => {
                  contPage <= 0 ? setContPage(0) : setContPage(contPage - 1);
                }}
              >
                Voltar
              </button>
              <button
                type='submit'
                className={`bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white py-2 px-5 rounded-md text-base font-semibold`}
                onClick={handleSubmit}
              >
                Avançar
              </button>
            </div>
          )}
        </form>
      </div>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          severity='error'
          variant='filled'
          sx={{ width: '100%' }}
        >
          Faltam preencher os seguintes campos:
          {missing.map((item) => (
            <div key={item}>{item} </div>
          ))}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
