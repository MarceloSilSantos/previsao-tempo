import React from 'react';

const WeatherCard = ({ day, temperature, description }) => {
  return (
    <div className="weather-card">
      <h2>{day}</h2>
      <p>{temperature}°C</p>
      <p>{description}</p>
    </div>
  );
};

export default WeatherCard;
