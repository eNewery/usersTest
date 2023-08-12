"use client"
import React, {useContext, useState} from 'react'
import { useRouter } from 'next/navigation';
import { auth, firestore, createUserWithEmailAndPassword } from '../firebase'; // Ajusta la ruta a tu archivo firebase.js
import { doc, setDoc } from 'firebase/firestore';
import { MiContexto } from './context';
const register = () => {
  const context = useContext(MiContexto)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
const router = useRouter()
  /* Función para crear usuario y colección */
  const createUserAndCollection = async () => {
    try {
      // Crea el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Accede al UID del usuario recién creado
      const uid = userCredential.user.uid;

      // Crea una colección con el UID del usuario como nombre
      const userDocRef = doc(firestore, "users", uid);
      await setDoc(userDocRef, {
id: uid,
userDetails: [{
  email: email,
  username:username,
  password:password
}],
tasks: []
      });

      console.log('Usuario y colección creados exitosamente.');
      
        context.setIsRegistered(true)

    } catch (error) {
      alert('Error al crear usuario o colección:', error);
    }
  };
  /* Función para crear usuario y colección */



  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    createUserAndCollection();
  };
  return (
  
    <div className="registerFormContainer">
      <h2 className='registerFormTitle'>Registro</h2>
      <form className='registerForm' onSubmit={handleSubmit}>
        <input
        className='registerInput'
            type="username"
            id="username"
            value={username}
            placeholder='Username'
            onChange={handleUsernameChange}
            required
          />
          <input
          className='registerInput'
            type="email"
            id="email"
            placeholder='E-mail'
            value={email}
            onChange={handleEmailChange}
            required
          />

          <input
          className='registerInput'
            type="password"
            id="password"
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        <button className='registerBtn' type="submit">Registrarse</button>
      </form>
      <p onClick={() => context.setIsRegistered(true)} className='registerLogin'>¿Ya tienes una cuenta?</p>
    </div>
)
}

export default register