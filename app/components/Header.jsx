import React from 'react'
import { getAuth, signOut } from 'firebase/auth';
import Loading from './Loading';
import { useRouter } from 'next/navigation';
const Header = ({data}) => {
    const auth = getAuth();
const router = useRouter()
    const handleSignOut = async () => {
      try {
        await signOut(auth);
        router.push("./");
        console.log("Se cerró sesión exitosamente");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };
  
  return (
    <div className='dashboardHeader'><div className='dashboardHeaderLogo'>{data !== undefined ? data.userDetails.map((item) => (
        <h1>{item.username}</h1>
          )) : <Loading/>}</div><button className='signOutBtn' onClick={() => handleSignOut()}>Cerrar sesión</button></div>
  )
}

export default Header