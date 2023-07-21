import React, { useContext } from 'react'
import { Routes, Route, NavLink, BrowserRouter } from 'react-router-dom';
import { Inicio } from '../components/Inicio';
import { Articulos } from '../components/Articulos';
import { Acerca } from '../components/Acerca';
import { Contacto } from '../components/Contacto';
import { Login } from '../components/Login';
import { PruebaContext } from '../context/PruebaContext';

export const AppRouter = () => {

  const {usuario, setUsuario} = useContext(PruebaContext);

  return (
    <BrowserRouter>

      <header className='header'>
        {/* MENU NAVEGACIÓN */}
        <nav>
          <div className='logo'>
            <h2>Aprendiendo React Context</h2>
          </div>
          <ul>
            <li>
              <NavLink to='/'>Inicio</NavLink>
            </li>
            <li>
              <NavLink to='/articulos'>Articulos</NavLink>
            </li>
            <li>
              <NavLink to='/acerca-de'>Acerca de</NavLink>
            </li>
            <li>
              <NavLink to='/contacto'>Contacto</NavLink>
            </li>

              {usuario.hasOwnProperty("nick") && usuario.nick !== null ? (
                <>
                  <li>
                    <NavLink to='/'>{usuario.nick}</NavLink>
                  </li>
                  <li>
                    <NavLink to='/' onClick={ e => {
                      setUsuario({})
                    }}>Cerrar sesión</NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to='/login'>Identificate</NavLink>
                </li>
              )}

          </ul>
        </nav>
      </header>

      <section className='content'>
        {/* CONFIGURAR RUTAS */}

        <Routes>

          <Route path='/' element={<Inicio />} />
          <Route path='/inicio' element={<Inicio />} />
          <Route path='/articulos' element={<Articulos />} />
          <Route path='/acerca-de' element={<Acerca />} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={(
              <div>
                  <h1>Página no encontrada</h1>
              </div>
              )} />
        </Routes>

      </section>
        

    </BrowserRouter>
  )
}
