import React, { PureComponent } from 'react';
import { getScore, getScoreBet, getScoreDate } from '@/service/user';
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

export default class Example extends PureComponent {
  state = {
    data: [],
    filteredData: [],
    selectedOption: 'all',
    selectedStartDate: '',
    selectedEndDate: '',
    selectedDate: '',
  };

  async componentDidMount() {
    this.fetchAllData();
  }

  formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  fetchAllData = async () => {
    try {
      const response = await getScore();
      const data = response.data.response;
      this.setState({ data, filteredData: data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchDataBetweenDates = async () => {
    const { selectedStartDate, selectedEndDate } = this.state;
    if (selectedStartDate && selectedEndDate) {
      const formattedStartDate = this.formatDate(selectedStartDate);
      const formattedEndDate = this.formatDate(selectedEndDate);
      try {
        const response = await getScoreBet(
          formattedStartDate,
          formattedEndDate
        );
        const data = response.data.response;
        this.setState({ filteredData: data });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  fetchDataForDate = async () => {
    const { selectedDate } = this.state;
    if (selectedDate) {
      const formattedDate = this.formatDate(selectedDate);
      try {
        const response = await getScoreDate(formattedDate);
        const data = response.data.response;
        this.setState({ filteredData: data });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    this.setState({ selectedOption, filteredData: this.state.data }, () => {
      if (selectedOption === 'all') {
        this.fetchAllData();
      }
    });
  };

  handleStartDateChange = (event) => {
    this.setState(
      { selectedStartDate: event.target.value },
      this.fetchDataBetweenDates
    );
  };

  handleEndDateChange = (event) => {
    this.setState(
      { selectedEndDate: event.target.value },
      this.fetchDataBetweenDates
    );
  };

  handleDateChange = (event) => {
    this.setState({ selectedDate: event.target.value }, this.fetchDataForDate);
  };

  render() {
    const {
      filteredData,
      selectedOption,
      selectedStartDate,
      selectedEndDate,
      selectedDate,
    } = this.state;
    const options = [
      { value: 'all', label: 'Todas' },
      { value: 'between', label: 'Entre Dias' },
      { value: 'day', label: 'Dia' },
    ];

    return (
      <div className='h-auto w-full'>
        <div className='mb-4'>
          <select
            value={selectedOption}
            onChange={this.handleOptionChange}
            className='block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200'
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {selectedOption === 'between' && (
          <div className='flex space-x-4 mb-4'>
            <input
              type='date'
              value={selectedStartDate}
              onChange={this.handleStartDateChange}
              className='block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200'
            />
            <input
              type='date'
              value={selectedEndDate}
              onChange={this.handleEndDateChange}
              className='block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200'
            />
          </div>
        )}

        {selectedOption === 'day' && (
          <div className='mb-4'>
            <input
              type='date'
              value={selectedDate}
              onChange={this.handleDateChange}
              className='block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200'
            />
          </div>
        )}

        <ResponsiveContainer width='100%' height={300}>
          <BarChart
            data={filteredData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis
              dataKey='nome'
              scale='point'
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray='3 3' />
            <Bar
              dataKey='cadastros'
              fill='#8884d8'
              background={{ fill: '#eee' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
