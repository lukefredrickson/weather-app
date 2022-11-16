import { useState, useEffect } from "react"
import { 
  CurrentWeather, 
  GeocodedLocation, 
  GeocodedLocationByName as GeocodedLocationsByName, 
  GeocodedLocationByZip, 
  ReverseGeocodedLocation as ReverseGeocodedLocations 
} from "./apiResponseTypes"
import { API_KEY } from "./config";


export function useCurrentWeather(lat: number, lon: number): CurrentWeather | undefined  {
  let [data, setData] = useState<CurrentWeather | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
        { mode: "cors" }
      );
      let data: CurrentWeather = await response.json();
      setData(data);
    }
    fetchData();
  }, [lat, lon]);

  return data;
}


export function useGeocodingByZip(zip: string): GeocodedLocationByZip | undefined {
  let [data, setData] = useState<GeocodedLocationByZip | undefined>(undefined);
  let countryCode = isNaN(Number(zip)) ? "CA" : "US"

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${countryCode}&appid=${API_KEY}`,
        { mode: "cors" }
      );
      let data: GeocodedLocationByZip = await response.json();
      setData(data);
    }
    fetchData();
  }, [zip, countryCode]);

  return data;
}


export function useGeocodingByName(city: string, countryCode?: string, state?: string): GeocodedLocation | undefined {
  let [data, setData] = useState<GeocodedLocationsByName | undefined>(undefined);
  let q = (countryCode === "US" && state !== undefined) ?
    `${city},${state},${countryCode}` :
    `${city},${countryCode}`

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${API_KEY}`,
        { mode: "cors" }
      );
      let data: GeocodedLocationsByName = await response.json();
      setData(data);
    }
    fetchData();
  }, [city, countryCode, state, q]);

  if (data !== undefined && data?.length > 0) {
    return data[0];
  };
  return undefined;
}


export function useReverseGeocodedLocation(lat: number, lon: number): GeocodedLocation | undefined {
  let [data, setData] = useState<ReverseGeocodedLocations | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
        { mode: "cors" }
      );
      let data: ReverseGeocodedLocations = await response.json();
      setData(data);
    }
    fetchData();
  }, [lat, lon]);

  if (data !== undefined && data?.length > 0) {
    return data[0];
  };
  return undefined;
}