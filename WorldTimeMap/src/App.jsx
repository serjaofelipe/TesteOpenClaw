import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { DateTime } from 'luxon';
import { Globe, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

const CITIES = [
  { name: 'São Paulo', tz: 'America/Sao_Paulo', coords: [-46.6333, -23.5505] },
  { name: 'New York', tz: 'America/New_York', coords: [-74.006, 40.7128] },
  { name: 'London', tz: 'Europe/London', coords: [-0.1276, 51.5072] },
  { name: 'Dubai', tz: 'Asia/Dubai', coords: [55.2708, 25.2048] },
  { name: 'Tokyo', tz: 'Asia/Tokyo', coords: [139.6917, 35.6895] },
  { name: 'Sydney', tz: 'Australia/Sydney', coords: [151.2093, -33.8688] },
  { name: 'Los Angeles', tz: 'America/Los_Angeles', coords: [-118.2437, 34.0522] },
  { name: 'Johannesburg', tz: 'Africa/Johannesburg', coords: [28.0473, -26.2041] }
];

export default function App() {
  const [time, setTime] = useState(DateTime.now());
  const [hoveredCity, setHoveredCity] = useState(null);
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(DateTime.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app-container">
      <header>
        <div className="title">
          <Globe size={40} className="title-icon" />
          <span>GLOBAL SYNC</span>
        </div>
      </header>

      <main className="main-content">
        <div className="map-container">
          <ComposableMap projectionConfig={{ scale: 180 }} style={{ width: "100%", height: "100%" }}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="var(--map-land)"
                    stroke="var(--map-border)"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "var(--neon-purple-glow)", outline: "none" },
                      pressed: { outline: "none" }
                    }}
                  />
                ))
              }
            </Geographies>

            {CITIES.map((city) => {
              const isSelected = selectedCity.name === city.name;
              const isHovered = hoveredCity === city.name;
              return (
                <Marker 
                  key={city.name} 
                  coordinates={city.coords}
                  onMouseEnter={() => setHoveredCity(city.name)}
                  onMouseLeave={() => setHoveredCity(null)}
                  onClick={() => setSelectedCity(city)}
                  style={{ cursor: "pointer" }}
                >
                  <circle 
                    r={isSelected || isHovered ? 8 : 4} 
                    fill={isSelected ? "var(--neon-purple)" : "#fff"}
                    style={{
                      filter: isSelected ? "drop-shadow(0 0 10px var(--neon-purple))" : "none",
                      transition: "all 0.3s ease"
                    }}
                  />
                </Marker>
              );
            })}
          </ComposableMap>

          <AnimatePresence>
            {hoveredCity && (
              <motion.div 
                className="map-tooltip"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ top: '10%', left: '50%' }}
              >
                {hoveredCity}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="sidebar">
          {CITIES.map((city) => {
            const cityTime = time.setZone(city.tz);
            const isSelected = selectedCity.name === city.name;
            
            return (
              <motion.div 
                key={city.name}
                className="clock-card"
                onClick={() => setSelectedCity(city)}
                style={{ 
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--neon-purple)' : 'rgba(255, 255, 255, 0.05)',
                  background: isSelected ? 'rgba(176, 38, 255, 0.05)' : 'var(--bg-panel)'
                }}
                whileHover={{ scale: 1.02 }}
                layout
              >
                <div className="city-name">
                  <MapPin size={18} color="var(--neon-purple)" />
                  {city.name}
                </div>
                <div className="time-display">
                  {cityTime.toFormat('HH:mm:ss')}
                </div>
                <div className="date-display">
                  {cityTime.toFormat('EEEE, dd MMMM yyyy')}
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
