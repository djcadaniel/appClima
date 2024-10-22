import { Weather } from "../../hooks/useWeather"
import { formatTemperature } from "../../utils"
import styles from './WeatherDetail.module.css'

type WeatherDetailProps = {
  weather: Weather
  state: string
}

export const WeatherDetail = ({weather, state}: WeatherDetailProps) => {
  return (
    <div className={styles.container2}>
      <div className={styles.container2__description}>
        <h2>Clima de: {weather.name}</h2>
        <p className={styles.current}>{formatTemperature(weather.main.temp)}&deg;C</p>
        <div className={styles.temperatures}>
          <p>Min: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span></p>
          <p>Min: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span></p>
        </div>
        <div className={styles.country}>
          <span >{weather.sys.country}</span>{' - '}
          <span >{state}</span>
        </div>
      </div>
    </div>
  )
}