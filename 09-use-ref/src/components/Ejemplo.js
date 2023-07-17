import React, { useEffect, useRef, useState } from 'react'

export const Ejemplo = () => {

    const [numeroSaludos, setNumeroSaludos] = useState(0);
    const saludosEnCola = useRef(numeroSaludos);

    useEffect(() => {
        saludosEnCola.current = numeroSaludos;
        setTimeout(() => {
                //setNumeroSaludos(numeroSaludos + 1)
                // Valor en el que esta la referencia
                // despues de dar los clicks. Valor actualizado
                // en el useEffect, ya que es mutable.
                console.log("Saludos en cola:"+saludosEnCola.current)
        }, 2000)
    }, [numeroSaludos])

    const enviarSaludo = (e) => {
            setNumeroSaludos(numeroSaludos + 1)
            //console.log("Saludo enviado.")
    }

  return (
    <div>
        <h1>Ejemplo con useRef</h1>
        <h2>Saludos enviado: {numeroSaludos}</h2>
        <button onClick={enviarSaludo}>Enviar saludo!</button>
        <hr/>
    </div>
  )
}
