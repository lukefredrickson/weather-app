import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherWidget from "./WeatherWidget";

// burlington, vt coords
const LAT = 44.4759;
const LON = -73.2121;

function App() {
  return (
    <div className="App">
      <WeatherWidget lat={LAT} lon={LON} />
    </div>
  );
}

export default App;
