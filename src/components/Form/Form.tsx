import { FormEvent, useState } from 'react'
import { countries } from '../data/countries'
import styles from'./Form.module.css'
import { SearchType } from '../../types'
import { Alert } from '../Alert/Alert'

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>
}

export const Form = ({fetchWeather}: FormProps) => {

  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: ''
  })

  const [alert, setAlert] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) =>{
    setSearch({
      ...search,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    if(Object.values(search).includes('')){
      setAlert('Todos los campos son obligatorios')
      return
    }else{
      setAlert('')
    }
    fetchWeather(search)
  }

  return (
    <form 
      className={styles.form}
      onSubmit={handleSubmit}
    >
      {
        alert && ( <Alert>{alert}</Alert> )
      }
      <div className={styles.field}>
        <label htmlFor="country" className={styles.label}>País:</label>
        <select 
          id='country'
          name='country'
          value={search.country}
          onChange={handleChange}
        >
          <option value="">--Seleccione un País --</option>
          {
            countries.map(country=>(
              <option 
                key={country.code}
                value={country.code}
              >
                {country.name}
              </option>
            ))
          }
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="city" className={styles.label}>Ciudad:</label>
        <input 
          id='city'
          type="text"
          name='city'
          placeholder='Ciudad'
          value={search.city}
          onChange={handleChange}
        />
      </div>
      <input className={styles.submit} type="submit" value='Consultar clima'/>
    </form>
  )
}