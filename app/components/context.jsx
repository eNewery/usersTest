"use client"
import React, { createContext, useState } from 'react';

const MiContexto = createContext();
const MiContextoProvider = ({ children }) => {
const [isRegistered, setIsRegistered] = useState(true)


  /* Función para iniciar sesión */



  /* Función para iniciar sesión */


      
    return (
      <MiContexto.Provider value={{isRegistered, setIsRegistered}}>
        {children}
      </MiContexto.Provider>
    );
  };
  export { MiContexto, MiContextoProvider };