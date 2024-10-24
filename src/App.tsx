import './AppModule.css'
import { Alert } from './components/Alert/Alert'
import { Form } from './components/Form/Form'
import { Spinner } from './components/Spinner/Spinner'
import { WeatherDetail } from './components/WeatherDetail/WeatherDetail'
import { useWeather } from './hooks/useWeather'
import notMapa from '/notMapa.svg'
import climateHot from '/climateHot.jpg'
import climateFrio from '/climateFrio.jpg'
import { formatTemperature } from './utils'
import { useEffect } from 'react'


function App() {  
  
  const container = document.querySelector('.container')
  const rain = () => {
    console.log('funcion ejecutada')
    let j = 0
    while (j <= 10){
      let gout = document.createElement('i')
      let x = innerWidth * Math.random()
      let time = 1 * Math.random()
  
      gout.style.animationDuration = time <= 0.4 ? (time + 3) + 's' : (time + 3.5) + 's'
      gout.style.animationDelay = time + 's'
      gout.style.left = x + 'px'
      container?.appendChild(gout)
      j++;
    }
  }
  const stopRain = () => {
    const goutElements = container?.querySelectorAll('i')
    if(goutElements){
      goutElements.forEach(item => {
        container?.removeChild(item)
      })
    }
  }

  const { weather, isLoading,notFound, fetchWeather, hasWeatherData, stateCounty } = useWeather()

  useEffect(() => {
    const temp = formatTemperature(weather.main.temp)
    if(temp < 21){
      rain()
    }else{
      stopRain()
    }
  }, [weather])
  
  let background;
  if(formatTemperature(weather.main.temp) >= 21){
    background = climateHot
  }else{
    background = climateFrio
  }

  

  return (
    <div className='appClima' style={{background: `url(${background})`}}>
      <div className={`${formatTemperature(weather.main.temp) >= 21 ? 'sol' : 'lluvia'}`}>
        <h1 className='title'>Clima</h1>
        <div className='container'>
          <div className='container__form'>
            <Form fetchWeather = {fetchWeather}/>
          </div>
          <div className='container__data'>
            { isLoading && <Spinner /> }
            { hasWeatherData && <WeatherDetail weather = {weather} state={stateCounty} /> }
            { notFound && (
                <Alert>
                  <img src={notMapa} className='ciudadFail' alt="ciudad no encontrada" />
                </Alert>
              
            )}
          </div>
        </div>
        <footer>
          <span>Hecho por djcadaniel@2024</span>
        </footer>
      </div>
    </div> 
  )
}

export default App