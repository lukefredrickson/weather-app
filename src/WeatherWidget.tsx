import React, { useState, useEffect } from "react";
import {
  useCurrentWeather,
  useFiveDayForecast,
  useGeocodingByZip,
  useGeocodingByName,
  useReverseGeocodedLocation,
} from "./fetchWeatherHooks";
import styles from "./weatherWidget.module.css";

interface Props {
  lat: number;
  lon: number;
}

export default function WeatherWidget({ lat, lon }: Props) {
  let forecast = useFiveDayForecast(lat, lon);
  let currentWeather = useCurrentWeather(lat, lon);
  let locationByName = useGeocodingByName("Seattle", "", "");
  let location = useReverseGeocodedLocation(lat, lon);
  console.log(forecast);

  if (currentWeather !== undefined && location !== undefined) {
    return (
      <div>
        <div className={styles.card}>
          <h3>
            {location.name}
            {location.state === undefined ? "" : `, ${location?.state}`}
            {` [${location.country}]`}
          </h3>
          <div>{`[${currentWeather.coord.lat}, ${currentWeather.coord.lon}]`}</div>
          <div>{currentWeather.weather[0]?.description}</div>
          <div>temperature: {currentWeather.main.temp}°K</div>
          <div>feels like: {currentWeather.main.feels_like}°K</div>
        </div>
        <pre>{JSON.stringify(currentWeather, undefined, 2)}</pre>
      </div>
    );
  }
  return <></>;
}
