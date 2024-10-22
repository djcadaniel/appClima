import axios from 'axios';
import { SearchType } from '../types';
import { z } from 'zod';
import { useMemo, useState } from 'react';

const Weather = z.object({
  sys: z.object({
    country: z.string(),
  }),
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number()
  })
})
export type Weather = z.infer<typeof Weather>

const initialState = {
  sys: {
    country: ''
  },
  name: '',
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0
  }
}

export const useWeather = () => {

  const [weather, setWeather] = useState<Weather>(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [stateCounty, setstateCounty] = useState('')

  const fetchWeather = async(search: SearchType) =>{
    
    console.log('consultando...')
    const appId = import.meta.env.VITE_API_KEY;

    setIsLoading(true)
    setWeather(initialState)
    setNotFound(false)

    try{
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
      const {data} = await axios(geoUrl)
      
      if(!data[0]){
        setNotFound(true)
        return
      }

      const lat = data[0].lat
      const lon = data[0].lon
      const state = data[0].state
      setstateCounty(state)

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
      // console.log(weatherUrl)
      const {data: weatherResult} = await axios(weatherUrl)
      // console.log(weatherResult)
      const result = Weather.safeParse(weatherResult)
      // console.log(result)

      if(result.success){
        setWeather(result.data)
      }

    }catch(error){
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  const hasWeatherData = useMemo(() => weather.name, [weather])
 
  return {
    weather,
    isLoading,
    notFound,
    fetchWeather,
    hasWeatherData,
    stateCounty
  }
}