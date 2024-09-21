import React, { useEffect, useState } from 'react'
import Forcastcomp from './Forcastcomp';
import Loader from './Loader';

const Weather = () => {
    const baseurl = 'https://api.openweathermap.org/data/2.5/';
    const api_key = '15ca787f2d191cf1f09525804a2ce85d';

    const [search, setSearch] = useState("visakhapatnam");
    const [forecast, setForecast] = useState("");
    const [loading, setLoading] = useState(false);

    function wethertemp(temp){
        const temperature =  temp - 273.15;
        return temperature.toFixed(2);
    }

    const date = new Date();
    const options = { 
        month: 'short', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      };

      const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    useEffect( () => {
        
    }, [])

    const handleSearch = async() => {
        setLoading(true);
        const result =  await fetch(`${baseurl}forecast?appid=${api_key}&q=${search}`);
        const data = await result.json();
        console.log(data);
        setForecast(data);
        setLoading(false);
    }   

  return (
    <>
        <div className="container">
            <h1>Weather App</h1>
            <div >
                <input type='' value={search} onChange={(e) => setSearch(e.target.value)}/>
                <button className="" onClick={() => handleSearch()}>Search</button>
            </div>
        </div>
        { loading ? ( <Loader /> ) : (forecast && (
            <div className='mainsection'>
            <div className='weather' >
                <div className='weathertime'>{formattedDate}</div>
                <h2>{forecast?.city?.name}, {forecast?.city?.country}</h2>
                <h1>{wethertemp(forecast?.list[0]?.main?.temp) } °C</h1>
                <p>Feels like {wethertemp(forecast?.list[0]?.main?.feels_like) } °C. {forecast?.list[0]?.weather[0]?.main}. {forecast?.list[0]?.weather[0]?.description}</p>

                <div></div>
            </div>
            <div className="map">
                <p> 4.1m/s ENE </p>
                <p>{forecast?.list[0]?.main?.sea_level}hPa</p>
                <p>Humidity: {forecast?.list[0]?.main?.humidity}%</p>
                <p>UV: 11</p>
                <p>Dew point: 25°C</p>
                <p>Visibility:5.0km</p>
            </div>
        </div>
        ))}
        {loading ? ( <Loader /> ) : ( forecast && ( <Forcastcomp forecast={forecast} />))}
    </>
  )
}

export default Weather