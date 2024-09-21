import React from 'react'

const Forcastcomp = ({forecast}) => {
    function wethertemp(temp){
        const temperature =  temp - 273.15;
        return temperature.toFixed(2);
    }
    console.log('testing', forecast);
  return (
    <div>
        <h2>5-Day Forecast for {forecast.city.name}</h2>
        <div className='card-container'>
            {forecast.list.map((item, index) => (
                <div  className="card" key={index}>
                    <p>{new Date(item.dt * 1000).toLocaleString()}</p>
                    <p>Temp: {wethertemp(item.main.temp)}°C</p>
                    <p>Weather: {item.weather[0].description}</p>
                    <p>Min: {wethertemp(item.main?.temp_min)} °C</p>
                    <p>Max: {wethertemp(item.main?.temp_max)}°C</p>
                    <p>Presser: {item.main?.pressure}</p>
                    <p>Humidity: {item.main?.humidity}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Forcastcomp