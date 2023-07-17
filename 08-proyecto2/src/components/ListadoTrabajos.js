import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { trabajos } from '../components/data/trabajos'

export const ListadoTrabajos = ({limite}) => {

    const [minimo, setMinimo] = useState(2);
    const [maximo, setMaximo] = useState(4);

    useEffect(() => {
        function random() {
            const cantidad = trabajos.length;
            const min = getRandomInt(2, cantidad-1);
            const number = calcularMax(min);
            console.log(min)
            console.log(number)
            setMinimo(min);
            setMaximo(number);
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    
        function calcularMax(min){
            for (let index = 0; index <= trabajos.length; index++) {
                if(index-min === 2){
                    return index;
                }
            }
        }
    
        random();
    }, [])

    

  return (
      <section className='works'>
      {
        trabajos.slice(minimo, maximo).map(trabajo => {
          return(
            <article key={trabajo.id} className='work-item'>
              <div className='mask'>
                <img src={"/images/"+trabajo.id+".png"} alt='imagenes-proyectos'/>
              </div>
              <span>{trabajo.categorias}</span>
              <h2><Link to={"/proyecto/"+trabajo.id}>{trabajo.nombre}</Link></h2>
              <h3>{trabajo.tecnologias}</h3>
            </article>
          )
        })
      }
      </section>   
  )
}
