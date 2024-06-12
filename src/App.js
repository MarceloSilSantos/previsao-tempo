import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import WeatherCard from './component/WeatherCard';

const API_KEY = '6b754e23fe158f87a4fd15c392fcbba9'; 

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=pt_br&appid=${API_KEY}&units=metric`
      );
      const forecastData = response.data.list.filter(
        (item) => moment(item.dt_txt).format('HH:mm:ss') === '12:00:00'
      ); 
      setWeatherData(forecastData);
    } catch (error) {
      console.error('Erro ao buscar dados do tempo:', error);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="app">
      <h1>Previsão do Tempo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Buscar Previsão</button>
      </form>
      <div className="weather-cards">
        {weatherData.map((forecast) => (
          <WeatherCard
            key={forecast.dt}
            day={moment(forecast.dt_txt).format('dddd')}
            temperature={forecast.main.temp}
            description={forecast.weather[0].description}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
