import React, { useId } from 'react'
import { useForm } from '../hooks/useForm'

export const MiFormulario = () => { 

    const {formulario, enviarFormulario, cambiado} = useForm({});

  return (
    <div>
        <h1>Formulario</h1>
        <p>Formulario para guardar un curso:</p>
        <p>Curso guardado: {formulario.titulo}</p>
        <pre className='codigo'>{JSON.stringify(formulario)}</pre>

        <form onSubmit={ enviarFormulario } className='mi-formulario'>
            <input type="text" key={useId()} name='titulo' onChange={cambiado} placeholder='Titulo:' />
            <input type='number' key={useId()} name='anio' onChange={cambiado} placeholder='Año publicación' />
            <textarea name='descripcion' key={useId()} onChange={cambiado} placeholder='Descripción:' />
            <input type='text' name='autor' key={useId()} onChange={cambiado} placeholder='Autor:' />
            <input type='email' name='email' key={useId()} onChange={cambiado} placeholder='Correro de contacto:' />

            <input type='submit' value="Enviar" />
        </form>
    </div>
  )
}
