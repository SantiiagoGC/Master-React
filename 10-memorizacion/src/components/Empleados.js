import React, { useEffect, useState } from 'react'

export const  Empleados = React.memo(({pagina, mensaje}) => {

    const [empleados, setEmpleados] = useState([]);

    // Asi si
    useEffect(() => {
        console.log("Se ha renderizado empleados")
    }, [empleados]);

    const conseguirEmpleados = async (p) => {
        const url = "https://reqres.in/api/users?page="+p;
        const peticion = await fetch(url);
        const {data: empleados} = await peticion.json();
        
        setEmpleados(empleados);
    }

    useEffect(() => {
        conseguirEmpleados(pagina);
        mensaje();
    }, [pagina]);

    /*
    No ejecutar console.logs en la funcion principal
    mejor a raiz de un evento y asi evitar dobles
    rendrizados:
        console.log("Se ha renderizado empleados")
    */

  return (
    <div>
        <p>Mostrando la página: {pagina}</p>
        <ul className='empleados'>
            {empleados.length >= 1 && empleados.map((empleado) => (
                <li key={empleado.id}>
                    {empleado.first_name + " " + empleado.last_name}
                </li>
            ))}
        </ul>
    </div>
  );

});
