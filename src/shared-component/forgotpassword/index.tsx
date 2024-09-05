'use client'
import Link from 'next/link';
import {useState} from 'react';
import './index.css';
const ForgotPassword = () => {
    const[inputVal,setInputVal] = useState({
        email:'',
        error:{
            email:'',
        },
    });

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        const{name,value} = e.target;
        console.log(name,value);
        setInputVal((preValue) => ({
            ...preValue,
            [name]:value,
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const{email} = inputVal;
        const errors = {
            email:'',
        };

        let hasError = false;
        if(!email){
            errors.email = "Email is required";
            hasError = true;
        }
        else if(!email.includes('@')){
            errors.email = "@ must be included";
            hasError = true;
        }

        if(!hasError){
            console.log(`sent link send to the ${email}`);
        }
        else{
            setInputVal((preValue)=>({
                ...preValue,
                error:errors,
            }));
        };
    };
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h1 className="title">Forgot Your Password?</h1>
        <p className="subtitle">Enter your email address to reset your password.</p>
        <form action='./action.php' method="post" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              placeholder="Your Email Address"
              className="email-input"
              name="email"
              value={inputVal.email}
              onChange= {handleChange}
            />
            <p style={{color:"red",textAlign:"start",marginTop:"0.3rem"}}>{inputVal.error.email}</p>
          </div>
          <button type="submit" className="submit-button">Send Reset Link</button>
        </form>
        <Link href="/Login" className="back-to-login">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
