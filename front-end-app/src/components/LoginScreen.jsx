import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { login } from '../handlers/loginAPIHandler';

const LoginScreen = (props) => {
    const {
        setIsAuthorized,
        setLoggedInName
    } = props;


    const [email, setEmail] = useState('');
    const changeEmail = (e) => setEmail(e.target.value);
    
    const [password, setPassword] = useState('');
    const changePassword = (e) => setPassword(e.target.value);

    const [emailError, setEmailError] = useState(false);

    const [loginResult, setLoginResult] = useState('');

    const navigate = useNavigate();

    const loginValidationOnClick = async () => {
        let errorsOccured = false;

        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if(emailPattern.test(email)){
            setEmailError(false);
        } else {
            errorsOccured = true;
            setEmailError(true);
        }

        // Check if password is valid based on the API response

        if (errorsOccured) {
            return;
        }

        login({email: email, password: password}).then((loginResult)=> {
            console.log(loginResult);
            if (loginResult === 'Invalid email or password'){
                alert(loginResult);
                setIsAuthorized(false);
                setLoggedInName('');
            } else {
                setIsAuthorized(true);
                setLoggedInName(loginResult);
                localStorage.setItem('name', loginResult);
                localStorage.setItem('authorization', JSON.stringify("true"));
                alert('Login Successful');
                navigate('/');
            }
        });

        
    };

  return (
    <div className='container'>
        <h1 className='title'>Log in</h1>
        <p className='sign-up-tool-tip'>Don't have an account? <Link className='register' to={'/register'}>Sign up!</Link></p>
        <div className='form'>
          <div className="input-group">
            <div className='label'>Email: </div>
            <input type="text" className='text-input' placeholder='name@company.com' value={email} onChange={changeEmail}/>
            {emailError ? <div className='error'>Please enter a valid email</div> : <></>}
          </div>
          <div className="input-group">
            <div className='label'>Password:</div>
            <input type="text" className='text-input' placeholder='Password' value={password} onChange={changePassword}/>
          </div>

          <div className='buttons'>
            <button className='form-button save' onClick={() => loginValidationOnClick()}>Log in</button>
            <button className='form-button cancel' onClick={() => navigate("/")}>Cancel</button>
          </div>
        </div>
      </div>
  )
}

export default LoginScreen