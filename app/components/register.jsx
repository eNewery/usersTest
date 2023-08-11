"use client"
import React, {useState} from 'react'
import { useRouter } from 'next/navigation';
import { auth, firestore, createUserWithEmailAndPassword } from '../firebase'; // Ajusta la ruta a tu archivo firebase.js
import { doc, setDoc } from 'firebase/firestore';
const register = () => {
  
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

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
}]
      });

      console.log('Usuario y colección creados exitosamente.');
    } catch (error) {
      console.error('Error al crear usuario o colección:', error);
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
  
    <div className="register-form">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
            type="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
)
}

export default register