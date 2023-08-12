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
    <div className="loginFormContainer">
      <h2 className="loginFormTitle">Iniciar Sesión</h2>
      <form className='loginForm' onSubmit={handleLogin}>
<input className='loginFormInput' placeholder='E-mail' type="text" onChange={handleEmailChange} /><input className='loginFormInput' placeholder='Password' type="password" onChange={handlePasswordChange} />
<button className='loginBtn' type="submit">Iniciar</button>
<p onClick={() => context.setIsRegistered(false)} className='loginRegister'>¿No tienes una cuenta?</p>
      </form>
    </div>
  );
};

export default Login;
