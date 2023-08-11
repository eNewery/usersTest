"use client"
import React, { createContext } from 'react';

const MiContexto = createContext();
const MiContextoProvider = ({ children }) => {



  /* Función para iniciar sesión */



  /* Función para iniciar sesión */


      
    return (
      <MiContexto.Provider value={{}}>
        {children}
      </MiContexto.Provider>
    );
  };
  export { MiContexto, MiContextoProvider };