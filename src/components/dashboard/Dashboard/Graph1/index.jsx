'use client';
import React, { PureComponent, useState, useEffect } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { getAllDriversWithRoute } from '@/service/driver';

// Função para renderizar a forma ativa (quando o mouse passa sobre um pedaço do gráfico)
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g width='80%' height='80%'>
      <text
        fontSize={'22px'}
        fontWeight={700}
        x={cx}
        y={cy}
        dy={8}
        textAnchor='middle'
        fill={'#171717'}
      >
        {payload.origem || payload.destino}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        fontSize={'14px'}
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='#282828'
      >{`Qntd: ${value}`}</text>
      <text
        fontSize={'14px'}
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill='#000'
      >{`${(percent * 100).toFixed(2)}%`}</text>
    </g>
  );
};

// Função assíncrona para obter os dados de origem e destino
const getData = async () => {
  let allData = (await getAllDriversWithRoute()).data.response;

  // Função para contar a origem
  const countOrigins = (data) => {
    let originCounts = {};
    let addedDriversByOrigin = {};

    data.forEach((route) => {
      let originKey = route.origem;

      if (!originCounts[originKey]) {
        originCounts[originKey] = {
          origem: route.origem,
          value: 0,
        };
        addedDriversByOrigin[originKey] = new Set();
      }

      if (!addedDriversByOrigin[originKey].has(route.motorista_id)) {
        originCounts[originKey].value += 1;
        addedDriversByOrigin[originKey].add(route.motorista_id);
      }
    });

    return Object.values(originCounts);
  };

  // Função para contar os destinos (idêntica à countOrigins)
  const countDestinations = (data) => {
    let destinationCounts = {};
    let addedDriversByDestination = {};

    data.forEach((route) => {
      let destinationKey = route.destino;

      if (!destinationCounts[destinationKey]) {
        destinationCounts[destinationKey] = {
          destino: route.destino,
          value: 0,
        };
        addedDriversByDestination[destinationKey] = new Set();
      }

      if (!addedDriversByDestination[destinationKey].has(route.motorista_id)) {
        destinationCounts[destinationKey].value += 1;
        addedDriversByDestination[destinationKey].add(route.motorista_id);
      }
    });

    return Object.values(destinationCounts);
  };

  return {
    originCounts: countOrigins(allData),
    destinationCounts: countDestinations(allData),
  };
};

// Componente principal
export default class Example extends PureComponent {
  static demoUrl =
    'https://codesandbox.io/s/pie-chart-with-customized-active-shape-y93si';

  // Estado do componente
  state = {
    activeIndex: 0,
    originData: [], // Armazena os dados de Origem
    destinationData: [], // Armazena os dados de Destino
    chartData: [], // Dados do gráfico que serão renderizados
    chartType: 'Origem', // Tipo do gráfico (Origem ou Destino)
  };

  // Método que é chamado quando o componente é montado
  componentDidMount() {
    // Obter os dados de origem e destino quando o componente é montado
    getData().then((data) => {
      this.setState({
        originData: data.originCounts.sort(
          (a, b) => b.value - a.value // Ordena os dados de Origem por valor decrescente
        ),
        destinationData: data.destinationCounts.sort(
          (a, b) => b.value - a.value // Ordena os dados de Destino por valor decrescente
        ),
        chartData: data.originCounts.sort(
          (a, b) => b.value - a.value // Inicialmente, define os dados de Origem ordenados como dados do gráfico
        ),
      });
    });
  }

  

  // Método que é chamado quando o mouse entra em um pedaço do gráfico
  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  // Método que é chamado quando o usuário clica em um botão (Origem ou Destino)
  setDataButton = (value) => {
    this.setState({ chartType: value }); // Atualiza o tipo do gráfico
    if (value === 'Origem') {
      this.setState({ chartData: this.state.originData }); // Define os dados de Origem como dados do gráfico
    } else if (value === 'Destino') {
      this.setState({ chartData: this.state.destinationData }); // Define os dados de Destino como dados do gráfico
    }
  };

  // Renderiza o componente
  render() {
    return (
      <div className='w-full h-full'>
        {/* Botões para alternar entre Origem e Destino */}
        <div className='w-full flex gap-5 items-center justify-start'>
          <button
            onClick={() => this.setDataButton('Origem')}
            className={`bg-neutral-600 hover:bg-neutral-700 text-white px-3 py-1 rounded shadow-lg shadow-black/50 ${
              this.state.chartType === 'Origem' ? 'bg-neutral-800' : ''
            }`}
          >
            Origem
          </button>
          <button
            onClick={() => this.setDataButton('Destino')}
            className={`bg-neutral-600 hover:bg-neutral-700 text-white px-3 py-1 rounded shadow-lg shadow-black/50 ${
              this.state.chartType === 'Destino' ? 'bg-neutral-800' : ''
            }`}
          >
            Destino
          </button>
        </div>

        {/* Gráfico de pizza */}
        <ResponsiveContainer className='lg:w-full lg:h-full w-1/2 h-1/2'>
          <PieChart className='lg:w-full lg:h-full w-1/2 h-1/2'>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={this.state.chartData} // Usa o estado chartData para os dados do gráfico
              cx='50%'
              cy='50%'
              innerRadius={50}
              outerRadius={100}
              fill='#404040'
              dataKey='value'
              onMouseEnter={this.onPieEnter}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
