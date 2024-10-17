import './AppModule.css'
import { Form } from './components/Form/Form'
import { WeatherDetail } from './components/WeatherDetail/WeatherDetail'
import { useWeather } from './hooks/useWeather'

function App() {  

  const { weather, fetchWeather, hasWeatherData } = useWeather()

  return (
    <>
      <h1 className='title'>Clima</h1>
      <div className='container'>
        <Form 
          fetchWeather = {fetchWeather}
        />
        {
          hasWeatherData && (
            <WeatherDetail 
              weather = {weather}
            />
          )
        }
      </div>
    </>
  )
}

export default App