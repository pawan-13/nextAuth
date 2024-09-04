'use client'
import { useState } from 'react';
import './index.css';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Login = () => {
  const router = useRouter();
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
    error: {
      email: "",
      password: "",
    }
  });

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInputVal((preValue) => (
      {
        ...preValue,
        [name]: value,
      }
    ));
  };

  const handleSubmit = async(e: { preventDefault: () => void; }) => {
    const notify = () => {
      toast.success('login Successfull', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        });
    };
    const errorNotify = () => {
      toast.error('login not Successfull', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        });
    }
    e.preventDefault();
    const { email, password } = inputVal;
    const errors = {
      email: "",
      password: "",
    };
    let hasError = false;
    if (!email) {
      errors.email = "email is required";
      hasError = true;
    } else if (!email.includes('@')) {
      errors.email = "@ must be included";
      hasError = true;
    };
    if (!password) {
      errors.password = "Password is required";
      hasError = true;
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      hasError = true;
    };

    if (!hasError) {
      try {
         const response = await axios.post('/api/users/login',{
          email: inputVal.email,
          password: inputVal.password,
         },{
          headers:{
            'Content-Type': 'application/json',
          }
         });
         if(response.status === 200){
          setInputVal({
            email: "",
            password: "",
            error: {
              email: "",
              password: "",
            }
          });
          notify();
          localStorage.setItem('token', response.data.token);
          router.replace('/home');
         }
      } catch (error) {
        console.error('Error during signup', error);
        errorNotify();
      }
    }
    else {
      setInputVal((preValue) => ({
        ...preValue,
        error: errors,
      }));
    };
  }

  return (
    <div className="login-container">
      <form action="/action.php" className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={inputVal.email}
            id="email"
            onChange={handleChange}
          />
          <span className='error-message'>{inputVal.error.email}</span>
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={inputVal.password}
            id="password"
            name='password'
            onChange={handleChange}
          />
          <span className='error-message'>{inputVal.error.password}</span>
        </div>
        <p style={{ marginTop: "-0.5rem", textAlign: "end", color: "black", fontWeight: "500", marginBottom: "0.9rem" }}><Link href="/Signup" style={{ color: "cornflowerblue", fontWeight: "500" }}>Forgot Password</Link></p>
        <button type="submit" className="submit-button">Login</button>
        <p style={{ marginTop: "1rem", textAlign: "center", color: "black", fontWeight: "500" }}>Don't have an account? <Link href="/Signup" style={{ color: "cornflowerblue", fontWeight: "500" }}>Signup</Link></p>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Login;