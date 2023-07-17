import React, { useMemo, useState } from 'react'

export const Tareas = () => {

    const [tareas, setTareas] = useState([]);
    const [contador, setContador] = useState(1230);

    const agregarTareas = (e) => {
        e.preventDefault();
        let tareas_actualizadas = [...tareas, e.target.descripcion.value]
        setTareas(tareas_actualizadas);
    }

    const eliminarTarea = (id) => {
        let tareas_nuevas = tareas.filter( (tarea, indice) => indice !== id);
        setTareas(tareas_nuevas);
    }

    const sumarAlContador = (e) => {
        setContador(contador + 1)
    }

    const contadoresPasados = (acumulacion) => {
        for (let index = 1; index <= acumulacion; index++) {
            console.log("Ejecutando acumulaciones de contadores del pasado...");
            //console.log("Se le sumo "+index+" al contador en fecha 15/07/2023");
        }

        return `Contador manual de tareas: ${contador}` 
    }

    const memoContadores= useMemo( () => contadoresPasados(contador), [contador]);

  return (
    <div className='tareas-container'>
        <h1>Mis tareas</h1>
        <form onSubmit={agregarTareas}>
            <input type='text' name='descripcion' placeholder='Describe la tarea'/>
            <input type='submit' value="Guardar" />
        </form>

        <h3>{memoContadores}</h3>
        <button onClick={sumarAlContador}>Sumar</button>

        <h3>Lista de tareas</h3>
        <ul>
            {
                tareas.map((tarea, index) => {
                    return (
                        <li key={index}>
                            {tarea}
                            &nbsp;
                            <button onClick={() => eliminarTarea( index )}>X</button>
                        </li>
                    ) 
                })
            }
        </ul>
       
    </div>
  )
}
