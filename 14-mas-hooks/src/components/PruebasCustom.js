import { useMayus } from '../hooks/useMayus'

export const PruebasCustom = () => {


    const {estado, mayusculas, minusculas, concatenar} = useMayus("Santiago Garcia");

  return (
    <div>
        <h1>Probando componentes personalizados</h1>
        <h2>{estado}</h2>

        <button onClick={ mayusculas }>Poner en mayusculas</button>
        <button onClick={ minusculas }>Poner en minusculas</button>
        <button onClick={ e => concatenar(" - Probando hooks personalizados") }>Concatenar</button>

    </div>
  )
}
