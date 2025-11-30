import React, { useState } from 'react';
import './WeatherApp.css';

interface WeatherAppProps {
  onClose: () => void
}

interface HourlyForecast {
  time: string;
  temp: number;
  icon: string
}

interface DailyForecast {
  day: string;
  high: number;
  low: number;
  icon: string;
  precipitation: number
}

const WeatherApp: React.FC<WeatherAppProps> = ({ onClose }) => {
  const [location] = useState('Stockholm');
  const [currentTemp] = useState(18);
  const [condition] = useState('Delvis molnigt');
  const [high] = useState(22);
  const [low] = useState(14);
  const [feelsLike] = useState(17);
  const [humidity] = useState(65);
  const [windSpeed] = useState(12);
  const [uvIndex] = useState(5);
  const [visibility] = useState(10);
  const [pressure] = useState(1013);

  const hourlyForecast: HourlyForecast[] = [
    { time: 'Nu', temp: 18, icon: '⛅' },
    { time: '15:00', temp: 19, icon: '⛅' },
    { time: '16:00', temp: 20, icon: '☀️' },
    { time: '17:00', temp: 21, icon: '☀️' },
    { time: '18:00', temp: 22, icon: '☀️' },
    { time: '19:00', temp: 21, icon: '⛅' },
    { time: '20:00', temp: 19, icon: '🌤️' },
    { time: '21:00', temp: 17, icon: '🌙' },
    { time: '22:00', temp: 16, icon: '🌙' },
    { time: '23:00', temp: 15, icon: '🌙' }
  ];

  const dailyForecast: DailyForecast[] = [
    { day: 'Idag', high: 22, low: 14, icon: '⛅', precipitation: 10 },
    { day: 'Imorgon', high: 24, low: 16, icon: '☀️', precipitation: 5 },
    { day: 'Onsdag', high: 23, low: 15, icon: '⛅', precipitation: 15 },
    { day: 'Torsdag', high: 20, low: 13, icon: '🌧️', precipitation: 60 },
    { day: 'Fredag', high: 19, low: 12, icon: '🌧️', precipitation: 70 },
    { day: 'Lördag', high: 21, low: 14, icon: '⛅', precipitation: 20 },
    { day: 'Söndag', high: 23, low: 15, icon: '☀️', precipitation: 5 }
  ];

  return (
    <div className="weather-app">
      <button className="weather-app__close" onClick={onClose} aria-label="Stäng väder">
        ✕
      </button>

      <div className="weather-app__content">
        <div className="weather-app__header">
          <div className="weather-app__location">
            <span className="weather-app__location-icon">📍</span>
            <h1 className="weather-app__location-name">{location}</h1>
          </div>
          <div className="weather-app__current-temp">{currentTemp}°</div>
          <div className="weather-app__condition">{condition}</div>
          <div className="weather-app__high-low">
            <span>H: {high}°</span>
            <span>L: {low}°</span>
          </div>
        </div>

        <div className="weather-app__sections">
          <section className="weather-app__section weather-app__hourly">
            <div className="weather-app__section-header">
              <span className="weather-app__section-icon">🕐</span>
              <span className="weather-app__section-title">TIMPROGNOS</span>
            </div>
            <div className="weather-app__hourly-scroll">
              {hourlyForecast.map((hour, index) => (
                <div key={index} className="weather-app__hourly-item">
                  <div className="weather-app__hourly-time">{hour.time}</div>
                  <div className="weather-app__hourly-icon">{hour.icon}</div>
                  <div className="weather-app__hourly-temp">{hour.temp}°</div>
                </div>
              ))}
            </div>
          </section>

          <section className="weather-app__section weather-app__daily">
            <div className="weather-app__section-header">
              <span className="weather-app__section-icon">📅</span>
              <span className="weather-app__section-title">10-DAGARSPROGNOS</span>
            </div>
            <div className="weather-app__daily-list">
              {dailyForecast.map((day, index) => (
                <div key={index} className="weather-app__daily-item">
                  <div className="weather-app__daily-day">{day.day}</div>
                  <div className="weather-app__daily-icon">{day.icon}</div>
                  <div className="weather-app__daily-precipitation">
                    {day.precipitation > 0 && (
                      <span className="weather-app__precipitation-value">{day.precipitation}%</span>
                    )}
                  </div>
                  <div className="weather-app__daily-temps">
                    <span className="weather-app__daily-low">{day.low}°</span>
                    <div className="weather-app__daily-bar">
                      <div 
                        className="weather-app__daily-bar-fill"
                        style={{ width: `${((day.high - day.low) / 15) * 100}%` }}
                      />
                    </div>
                    <span className="weather-app__daily-high">{day.high}°</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="weather-app__details-grid">
            <div className="weather-app__detail-card">
              <div className="weather-app__detail-header">
                <span className="weather-app__detail-icon">🌡️</span>
                <span className="weather-app__detail-label">KÄNNS SOM</span>
              </div>
              <div className="weather-app__detail-value">{feelsLike}°</div>
            </div>

            <div className="weather-app__detail-card">
              <div className="weather-app__detail-header">
                <span className="weather-app__detail-icon">💧</span>
                <span className="weather-app__detail-label">LUFTFUKTIGHET</span>
              </div>
              <div className="weather-app__detail-value">{humidity}%</div>
            </div>

            <div className="weather-app__detail-card">
              <div className="weather-app__detail-header">
                <span className="weather-app__detail-icon">💨</span>
                <span className="weather-app__detail-label">VIND</span>
              </div>
              <div className="weather-app__detail-value">{windSpeed} m/s</div>
            </div>

            <div className="weather-app__detail-card">
              <div className="weather-app__detail-header">
                <span className="weather-app__detail-icon">☀️</span>
                <span className="weather-app__detail-label">UV-INDEX</span>
              </div>
              <div className="weather-app__detail-value">{uvIndex}</div>
              <div className="weather-app__detail-description">Måttlig</div>
            </div>

            <div className="weather-app__detail-card">
              <div className="weather-app__detail-header">
                <span className="weather-app__detail-icon">👁️</span>
                <span className="weather-app__detail-label">SIKT</span>
              </div>
              <div className="weather-app__detail-value">{visibility} km</div>
            </div>

            <div className="weather-app__detail-card">
              <div className="weather-app__detail-header">
                <span className="weather-app__detail-icon">🌡️</span>
                <span className="weather-app__detail-label">LUFTTRYCK</span>
              </div>
              <div className="weather-app__detail-value">{pressure} hPa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default WeatherApp;