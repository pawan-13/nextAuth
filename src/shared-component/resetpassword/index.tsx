'use client'
import {useState} from 'react';
import './index.css';
const ResetPassword = () => {
    const[inputVal,setInputVal] = useState({
      password:'',
        confirmpassword:'',
        error:{
            password:'',
            confirmpassword:'',
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
        const{password,confirmpassword} = inputVal;
        const errors = {
          password:'',
            confirmpassword:'',
        };

        let hasError = false;
        if(!password){
            errors.password = "Password is required";
            hasError = true;
        }
        else if(password.length < 10){
            errors.password = "password must be 10 characters";
            hasError = true;
        }
        if(!confirmpassword){
            errors.confirmpassword = "confirm password is required";
            hasError = true;
        }
        else if(confirmpassword !== password){
            errors.confirmpassword = "password is not matching";
            hasError = true;
        }

        if(!hasError){
            console.log('password is reset successfully');
            setInputVal({
              password:'',
              confirmpassword:'',
              error:{
                password:'',
                confirmpassword:'',
              }
            })
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
        <h1 className="title">Reset Your Password?</h1>
        <form action='./action.php' method="post" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="password"
              placeholder="Enter Password"
              className="email-input"
              name="password"
              value={inputVal.password}
              onChange= {handleChange}
            />
            <p style={{color:"red",textAlign:"start",marginTop:"0.3rem"}}>{inputVal.error.password}</p>
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Enter Confirm Password"
              className="email-input"
              name="confirmpassword"
              value={inputVal.confirmpassword}
              onChange= {handleChange}
            />
            <p style={{color:"red",textAlign:"start",marginTop:"0.3rem"}}>{inputVal.error.confirmpassword}</p>
          </div>
          <button type="submit" className="submit-button">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
