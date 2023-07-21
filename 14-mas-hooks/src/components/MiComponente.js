import React, { useId } from 'react'

export const MiComponente = () => {

    const id = useId();

    console.log(id);

    const id_dos = useId();

    console.log(id_dos);

  return (
    <div>
        <h1>Hook useID</h1>
        <input id={id} name='nombre' placeholder='Nombre' />
    </div>
  )
}
