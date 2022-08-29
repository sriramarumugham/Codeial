import React from "react";
import styles from "../styles/login.module.css";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { login } from "../api";
import { useAuth } from "../hook";

// import { createBrowserHistory } from "react-router-dom";

    const Register =async => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signingUp, setSigningUp] = useState("");
  const auth = useAuth();

  
  // const history = createBrowserHistory();
  const navigate=useNavigate();


  const handleFormSubmit = async (e) => {

    e.preventDefault(); 

    setSigningUp(true);

    let error = false;
    if (!name || !email || !password || !confirmPassword) {
      toast.error("enter you email and password");
      error = true;
    }

    if (password !== confirmPassword) {
      toast.error("Make sure password and confirm password matches");

      error = true;
    }

    if (error) {
      return setSigningUp(false);
    }

    const response = await auth.signup(name, email, password, confirmPassword);

    if (response.success) {
      
      setSigningUp(false);
       toast.success("User registered successfully, please login now");
    } else {
       toast.error("error cant signup");
      
    }
   
    setSigningUp(false);
   {navigate('/' , {replace:true})}
  };

  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}> Signup</span>
      <div className={styles.field}>
        <input
          placeholder="Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Confirm password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? "Signing up..." : "Signup"}
        </button>
      </div>
      <ToastContainer />
    </form>
  );
}

export default Register;