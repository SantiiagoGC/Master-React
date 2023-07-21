import { useState } from 'react'

export const useMayus = (texto) => {

    const [miTexto, setMiTexto] = useState(texto);

    // return mas bien opcional
    const mayusculas = () => {
        setMiTexto(texto.toUpperCase());
    }

    const minusculas = () => {
        setMiTexto(texto.toLowerCase());
    }

    const concatenar = (added) => {
        setMiTexto(texto+added);
    }

    return {
        estado: miTexto,
        mayusculas,
        minusculas,
        concatenar
    };

}