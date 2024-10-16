import './AppModule.css'
import { Form } from './components/Form/Form'
import { useWeather } from './hooks/useWeather'

function App() {  

  const { fetchWeather } = useWeather()

  return (
    <>
      <h1 className='title'>Clima</h1>
      <div className='container'>
        <Form 
          fetchWeather = {fetchWeather}
        />
        <p>
          h2
        </p>
      </div>
    </>
  )
}

export default App