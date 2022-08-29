import { useState } from 'react';

import styles from '../styles/login.module.css';
import { login } from '../api/index';
import { useNavigate } from 'react-router-dom';

import {  toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {useAuth} from '../hook';


const Login = () => {
const navigate=useNavigate();
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
 
  const auth=useAuth();
  console.log(auth);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    
    if (!email || !password) {
      return toast.error("Please enter both email and password")
    }

    const response = await auth.login(email, password);

    if (response.success) {
       toast.success("success");
       {navigate('/' , {replase:true})}
      
    } else {
     toast.error(  response.message);
    
    }

    setLoggingIn(false);
    
   
  };

  if(auth.user){
   
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Paasword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging in...' : 'Log In'}
          
        </button>
       
      </div> 
    <ToastContainer/>
    </form>
  );
};

export default Login;
