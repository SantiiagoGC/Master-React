import React, { useId, useState } from 'react'

export const MiFormulario = () => {

    const [formulario, setFormulario] = useState({});

    //const id1 = useId();
    //const id2 = useId();
    //const id3 = useId();
    //const id4 = useId();
    //const id5 = useId();


    const serializarFormulario = (formulario) => {

        const formData = new FormData(formulario);

        const objetoCompleto = {};

        formData.forEach((value, key) => {
            objetoCompleto[key] = value;
        });

        return objetoCompleto;
        
    }

    const enviarFormulario = (e) => {
        e.preventDefault();

        /*
        let curso = {
            titulo: e.target.titulo.value,
            anio: e.target.anio.value,
            descripcion: e.target.descripcion.value,
            autor: e.target.autor.value,
            email: e.target.email.value
        };*/

        let curso = serializarFormulario(e.target);

        setFormulario(curso);
    }

  return (
    <div>
        <h1>Formulario</h1>
        <p>Formulario para guardar un curso:</p>
        <p>Curso guardado:</p>
        <pre>{JSON.stringify(formulario)}</pre>

        <form onSubmit={ enviarFormulario } className='mi-formulario'>
            <input type="text" key={useId()} name='titulo' placeholder='Titulo:' />
            <input type='number' key={useId()} name='anio' placeholder='Año publicación' />
            <textarea name='descripcion' key={useId()} placeholder='Descripción:' />
            <input type='text' name='autor' key={useId()} placeholder='Autor:' />
            <input type='email' name='email' key={useId()} placeholder='Correro de contacto:' />

            <input type='submit' value="Enviar" />
        </form>
    </div>
  )
}
