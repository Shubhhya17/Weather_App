import React, { useEffect, useRef, useState } from 'react'
import "./Weather.css";
import { FaSearch } from "react-icons/fa";
import clear from "../assests/clear.webp";
import cloudy from "../assests/cloudyy.png";
import dizzle from "../assests/dizzle.webp";
import humidity from "../assests/humidity.png";
import rain from "../assests/rain.jpg";
import snow from "../assests/snow.avif";
import wind from "../assests/wind.png";

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    console.log(weatherData);
    const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": cloudy,
        "02n": cloudy,
        "03d": cloudy,
        "03n": cloudy,
        "04d": dizzle,
        "04n": dizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow
    }
    // !api call
    const search = async (city) => {
        if (city === "") {
            alert("Enter city name");
            return;
        }
        try {
            let API_ID= "298e9fb3000b140772fa49273dcb9769"
            // const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
            // console.log(apiKey);
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_ID}`;
            // console.log(url);
            const response = await fetch(url);
            const data = await response.json();
            // console.log(data);
            if(!response.ok){
                alert(data.message);
                return;
            }
            // console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            setWeatherData(false)
            console.log(error);
        }
    }
    useEffect(()=>{
        search()
    },[])
    return (
        <div className='weather'>
            <div className="search-bar">
                <input type="text" placeholder='search' ref={inputRef} />
                <span onClick={() => search(inputRef.current.value)}><FaSearch /></span>
            </div>
            {/* !to get only when enter proper data */}
            {weatherData?<>
                <img src={weatherData.icon} alt="" className='weather-icon' />
            <p className='temperature'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity} alt="" />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind} alt="" />
                    <div>
                        <p>{weatherData.windSpeed} Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
            </>:<></>}
           
        </div>
    )
}

export default Weather