import { api } from '@/service/api';

const BASE_URL = '/contract';

function formataData(dataAntiga) {
  let data = new Date(dataAntiga),
    dia = (data.getDate() + 1).toString().padStart(2, '0'),
    mes = (data.getMonth() + 1).toString().padStart(2, '0'),
    ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

export const ContratoMotorista = async (
  nome,
  antt,
  cpf,
  rg,
  categoria,
  endereco,
  enderecoColeta,
  enderecoEntrega,
  placa,
  chassi,
  valor,
  valorExtenso,
  banco,
  agencia,
  conta,
  data
) => {
  api
    .post(`${BASE_URL}/driver`, {
      nome,
      antt,
      cpf,
      rg,
      categoria,
      endereco,
      enderecoColeta,
      enderecoEntrega,
      placa,
      chassi,
      valor,
      valorExtenso,
      banco,
      agencia,
      conta,
      data: formataData(data),
    })
    .then((response) => {
      window.location.href = `${response.data.path}`;
    });
};

export const ContratoContratante = async (
  nomeMotorista,
  cpfMotorista,
  rgMotorista,
  categoria,
  contratante,
  cpfCNPJ,
  antt,
  endereco,
  enderecoColeta,
  enderecoEntrega,
  placa,
  chassi,
  valor,
  valorExtenso,
  banco,
  agencia,
  conta,
  data
) => {
  api
    .post(`${BASE_URL}/boss`, {
      nomeMotorista,
      cpfMotorista,
      rgMotorista,
      categoria,
      contratante,
      cpfCNPJ,
      antt,
      endereco,
      enderecoColeta,
      enderecoEntrega,
      placa,
      chassi,
      valor,
      valorExtenso,
      banco,
      agencia,
      conta,
      data: formataData(data),
    })
    .then((response) => {
      window.location.href = `${response.data.path}`;
    });
};
