'use client';
import { getAllDrivers } from '@/service/driver';
import React, { PureComponent, useEffect, useState } from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment'; 
import 'moment/locale/pt-br';

const getData = async () => {
  const drivers = (await getAllDrivers()).data.response;

  // Calcula a quantidade de motoristas cadastrados por mês nos últimos 6 meses
  const driverCountsByMonth = {};
  drivers.forEach((driver) => {
    const cadastroDate = new Date(driver.criado_em);
    const month = moment(cadastroDate).format('MMMM'); // Formato do mês como "Janeiro", "Fevereiro", etc.

    if (!driverCountsByMonth[month]) {
      driverCountsByMonth[month] = 0;
    }
    driverCountsByMonth[month]++;
  });

  // Cria os dados para o gráfico
  const chartData = [];
  for (let i = 5; i >= 0; i--) {
    const month = moment().subtract(i, 'months').format('MMMM');
    chartData.push({
      name: month,
      'Motoristas Cadastrados': driverCountsByMonth[month] || 0, // Se não houver dados para o mês, define como 0
    });
  }

  return chartData;
};

export default class Example extends PureComponent {
  static demoUrl =
    'https://codesandbox.io/p/sandbox/bar-chart-has-no-padding-2hlnt8';

  state = {
    data: [],
  };

  componentDidMount() {
    getData().then((data) => {
      this.setState({ data });
    });
  }

  render() {
    return (
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          width={500}
          height={300}
          data={this.state.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey='name'
            scale='point'
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray='3 3' />
          <Bar
            dataKey='Motoristas Cadastrados'
            fill='#404040'
            background={{ fill: '#eee' }}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
