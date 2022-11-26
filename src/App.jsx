import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import WeatherCard from './components/WeatherCard'
import { Loading } from './components/Loading'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const succes = (pos) => {

    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    })
  }



  useEffect(() => {
    navigator.geolocation.getCurrentPosition(succes)
  }, [])

  useEffect(() => {
    if (coords) {
      const apiKey = '529b817e919c9bee26ca9fbd881bc21b'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
      axios.get(URL)
        .then(res => {
          setWeather(res.data)
          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const fahrenheit = (celsius * 9 / 5 + 32).toFixed(1)
          setTemp({ celsius, fahrenheit })
        })
        .catch(err => console.log(err))

    }
  }, [coords])

  return (

    <div className='App'>
      {weather ?
        <WeatherCard
          weather={weather}
          temp={temp}
        />
        :
        <Loading />
      }
    </div>
  )
}

export default App
