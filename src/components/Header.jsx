import React, { useEffect, useState } from 'react'
import axios from "axios";

const Header = () => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "8d0c3afcfadc43898f541938230812";
  const city = "Rankoshi";

  useEffect(() => {
    axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
      .then((response) => {
        setWeatherData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("エラー:", error);
      });
  }, [apiKey, city]);

  // weatherDataがnullの場合の条件分岐
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const cityName = weatherData.location.name;

  const getJapaneseWindDirection = (abbreviation) => {
    const directionMap = {
      N: '北',
      NNE: '北北東',
      NE: '北東',
      ENE: '東北東',
      E: '東',
      ESE: '東南東',
      SE: '南東',
      SSE: '南南東',
      S: '南',
      SSW: '南南西',
      SW: '南西',
      WSW: '西南西',
      W: '西',
      WNW: '西北西',
      NW: '北西',
      NNW: '北北西',
    };
    return directionMap[abbreviation] || abbreviation;
  };

  return (
    <>
    <header class="mb-8 border-b bg-slate-200">
    <div class="mx-auto flex max-w-screen-2xl items-center justify-between px-4 md:px-8">
 
      <a href="/" class="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl" aria-label="logo">
        <svg width="95" height="94" viewBox="0 0 95 94" class="h-auto w-6 text-indigo-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M96 0V47L48 94H0V47L48 0H96Z" />
        </svg>

        日誌アプリ
      </a>
      

      
      <nav class="hidden gap-12 lg:flex 2xl:ml-16">
        <a href="#" class="text-lg font-semibold text-indigo-500">Home</a>
        <a href="#" class="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">Collections</a>
        <a href="#" class="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">Sale</a>
        <a href="#" class="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">About</a>
      </nav>
      

      
      <div class="flex divide-x border-r sm:border-l">
        <a href="#" class="hidden h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-gray-100 active:bg-gray-200 sm:flex sm:h-20 sm:w-20 md:h-24 md:w-24">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>

          <span class="hidden text-xs font-semibold text-gray-500 sm:block">Wishlist</span>
        </a>

        <a href="#" class="flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-gray-100 active:bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>

          <span class="hidden text-xs font-semibold text-gray-500 sm:block">Account</span>
        </a>

        <a href="#" class="flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-gray-100 active:bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>

          <span class="hidden text-xs font-semibold text-gray-500 sm:block">Cart</span>
        </a>

        <button type="button" class="flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-gray-100 active:bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>

          <span class="hidden text-xs font-semibold text-gray-500 sm:block">Menu</span>
        </button>
       
        <div>
    <h1>場所 {cityName}</h1>
    <p>気温: {weatherData?.current.temp_c} °C</p>
    <p>風速: {weatherData?.current.wind_kph} km/h</p>
    <p>風向: {getJapaneseWindDirection(weatherData?.current.wind_dir)}</p>
    {weatherData && (
      <img src={weatherData.current.condition.icon} alt="Weather Icon" />
    )}
  </div>

      </div>
      
    </div>
  </header>
    </>
  )
}

export default Header