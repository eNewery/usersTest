"use client"
import { useContext, useState } from 'react';
import { auth } from '../firebase';
import { MiContexto } from './context';
import { signInWithEmailAndPassword } from '../firebase';
import { useRouter } from 'next/navigation';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const context = useContext(MiContexto)
const router = useRouter()
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/Dashboard'); // Redireccionar a la página protegida
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }
  const handleLogin = async (event) => {
    event.preventDefault();
logIn()
  };

  return (
    <div className="login-form">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
<input type="text" onChange={handleEmailChange} /><input type="password" onChange={handlePasswordChange} />
<button type="submit">Iniciar</button>
      </form>
    </div>
  );
};

export default Login;
