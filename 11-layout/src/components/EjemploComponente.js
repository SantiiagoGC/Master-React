import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

export const EjemploComponente = () => {
  

    const [mostrar, setMostrar] = useState(false);

    const caja = useRef();
    const boton = useRef();

    {/* Si hay retrasos en una peticion o algo asi para
    mostrar algo, es conveniente usar este ya que hara que se
    cargue mucho antes que el use effect ya que este se
    ejecuta antes de renderizar */}
    useLayoutEffect( () => {
        console.log('useLayoutEffect: Componente cargado !!');
    
    }, []);

    useEffect(() => {
        //console.log("useEffect: Component cargado !!");
        
        console.log(boton.current.innerHTML);

        if(caja.current == null) return
        // current es que si esta visible

        const {bottom} = boton.current.getBoundingClientRect();
        
       // setTimeout( () => {
            caja.current.style.top = `${bottom + 45}px`;
            caja.current.style.left = `${bottom + 45}px`;
       // }, 1000)
        
    }, [mostrar]);

    return (
    <div>
        {/* useLayout se ejecuta antes de renderizar */}
        
        <h1>Ejemplo useEffect y useLayoutEffect</h1>

        <button ref={boton} onClick={() => setMostrar(prev => {
            console.log(!prev);
            return !prev;
        })}>Mostrar mensaje</button>

        {mostrar && (
            <div id='caja' ref={caja}>
                Hola, soy un mensaje {mostrar}
            </div>        
        )}
        
    </div>
  )
}
