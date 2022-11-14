import React, { useState, useEffect } from "react";
import { CurrentWeather } from "./apiResponseTypes";
import { API_KEY } from "./config";
import "./App.css";

// burlington, vt coords
const LAT = 44.4759;
const LON = -73.2121;

function App() {
  let [lat, setLat] = useState<number>(LAT);
  let [lon, setLon] = useState<number>(LON);
  let [data, setData] = useState<CurrentWeather | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
        { mode: "cors" }
      );
      let data: CurrentWeather = await response.json();
      console.log(data);
      setData(data);
    }
    fetchData();
  }, [lat, lon]);

  let weather =
    data === undefined ? "" : <pre>{JSON.stringify(data, undefined, 2)}</pre>;

  return <div className="App">{weather}</div>;
}

export default App;
