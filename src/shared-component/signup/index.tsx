'use client'
import './index.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const SignUp = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
    error: {
      username: "",
      email: "",
      password: "",
    }
  });

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setInputValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    const notify = () => {
      toast.success('Signup Successfull', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
      });
    };
    const errorNotify = () => {
      toast.error('Signup not Successfull', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
      });
    };

    e.preventDefault();
    const { username, email, password } = inputValue;
    const errors = {
      username: "",
      email: "",
      password: "",
    };
    let hasError = false;
    if (!username) {
      errors.username = "Please enter your username";
      hasError = true;
    } else if (username.length < 2) {
      errors.username = "Username must be at least 2 characters long";
      hasError = true;
    }
    if (!email) {
      errors.email = "Please enter your email";
      hasError = true;
    } else if (!email.includes('@')) {
      errors.email = "Please enter a valid email";
      hasError = true;
    }
    if (!password) {
      errors.password = "Please enter your password";
      hasError = true;
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      hasError = true;
    }

    if (!hasError) {
      try {
        const response = await axios.post('/api/users/signup', {
          username,
          email,
          password,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          setInputValue({
            username: "",
            email: "",
            password: "",
            error: {
              username: "",
              email: "",
              password: "",
            }
          });
          notify();
          router.push('/Login');
        }
      } catch (error) {
        console.error('Error during signup', error);
        errorNotify();
      }
    } else {
      setInputValue((prevValue) => ({
        ...prevValue,
        error: errors,
      }));
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>SignUp</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={inputValue.username}
            onChange={handleChange}
          />
          <span className='error-message'>{inputValue.error.username}</span>
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={inputValue.email}
            onChange={handleChange}
          />
          <span className='error-message'>{inputValue.error.email}</span>
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={inputValue.password}
            onChange={handleChange}
          />
          <span className='error-message'>{inputValue.error.password}</span>
        </div>
        <button type="submit" className="submit-button">SignUp</button>
        <p style={{ marginTop: "1rem", textAlign: "center", color: "black", fontWeight: "500" }}>
          Already have an account? <Link href="/Login" style={{ color: "cornflowerblue", fontWeight: "500" }}>Login</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
