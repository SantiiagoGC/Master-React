import React, { useRef } from 'react'

export const Formulario = () => {

    const nombreValue = useRef();
    const apellidoValue = useRef();
    const emailValue = useRef();
    const miCaja = useRef();

    const mostrar = e => {
            e.preventDefault();
            console.log(nombreValue.current.value);

            //miCaja
            console.log(miCaja);
            let { current: caja } = miCaja;
            miCaja.current.classList.add('fondoVerde');
            caja.innerHTML = "Formulario enviado";
        }

  return (
    <div>
      <h1>Formulario</h1>

      <div className='miCaja' ref={miCaja}>
        <h2>Pruebas con useRef</h2>
      </div>

      <form onSubmit={mostrar}>
        <input type='text' placeholder='Nombre' ref={nombreValue} /><br/>
        <input type='text' placeholder='Apellidos' ref={apellidoValue} /><br/>
        <input type='text' placeholder='Email' ref={emailValue} /><br/>

        <input type='submit' value="Enviar"/>
      </form>

      <button onClick={() => nombreValue.current.select()}>Empezar a rellenar form</button>

    </div>
  )
}
