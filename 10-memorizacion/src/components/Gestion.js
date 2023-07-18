import React, { useCallback, useEffect, useState } from 'react'
import { Empleados } from './Empleados'

export const Gestion = () => {

    const [nombre, setNombre] = useState("");
    const [pagina, setPagina] = useState(1);

    const asignarGestor = e => {
        setNombre(e.target.value);
    }

    useEffect(() => {
        console.log("Vista de gestión actualizada");
    }, [nombre, pagina]);

    // Muy similar al useMemo funciona con funciones
    // y las memoriza en caso de no haber cambios
    const mostrarMensaje = useCallback(() => {
      console.log("Hola que tal soy un mensaje desde el componente Empleados !!")
    }, [pagina]);

  return (
    <div>
        <h1>Nombre del gestor: {nombre}</h1>
        <input type='text' onChange={asignarGestor} placeholder='Introduce tu nombre :D'/>
        <h2>Listado de empleados:</h2>
        <p>Los usuarios son gestionados por: {nombre}</p>
        <button onClick={() => { setPagina(1)} }>Página 1</button>
        <button onClick={() => { setPagina(2)} }>Página 2</button>
        <Empleados pagina={pagina} mensaje={mostrarMensaje}/>
    </div>
  )
}
