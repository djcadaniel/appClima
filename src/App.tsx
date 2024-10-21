import './AppModule.css'
import { Alert } from './components/Alert/Alert'
import { Form } from './components/Form/Form'
import { Spinner } from './components/Spinner/Spinner'
import { WeatherDetail } from './components/WeatherDetail/WeatherDetail'
import { useWeather } from './hooks/useWeather'
import notMapa from '/notMapa.svg'

function App() {  

  const { weather, isLoading,notFound, fetchWeather, hasWeatherData } = useWeather()

  return (
    <>
      <h1 className='title'>Clima</h1>
      <div className='container'>
        <Form fetchWeather = {fetchWeather}/>
        { isLoading && <Spinner /> }
        { hasWeatherData && <WeatherDetail weather = {weather} /> }
        { notFound && <Alert><img src={notMapa} className='ciudadFail' alt="ciudad no encontrada" /></Alert> }
        {/* { notFound && <Alert>{'ciudad no encontrada'}</Alert>} */}
      </div>
    </> 
  )
}

export default App