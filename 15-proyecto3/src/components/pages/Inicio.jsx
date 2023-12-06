import React from 'react'
import { Link } from "react-router-dom"
export const Inicio = () => {
  return (
    <div className='jumbo'>
      <h1>Bienvenido al Blog con React</h1>
      <p>Blog desarrollado con el MERN Stack (Mongo, Express, React.js y Node.js)</p>
      <Link to="/articulos" className='button'>Ver los artículos</Link>
    </div>
  )
}
