"use client"

import { useContext } from 'react';
import Login from './components/Login';
import Register from './components/register';
import { MiContexto } from './components/context';

const App = () => {
  const context = useContext(MiContexto)
return(
  <div className='container'>
{context.isRegistered === true ? <Login/> : <Register/> }
  </div>
)
};
export default App;