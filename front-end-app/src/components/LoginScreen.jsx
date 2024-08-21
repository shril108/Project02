import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const changeEmail = (e) => setEmail(e.target.value);
    
    const [password, setPassword] = useState('');
    const changePassword = (e) => setPassword(e.target.value);

    const navigate = useNavigate();

  return (
    <div className='container'>
        <h1 className='title'>Log in</h1>
        <p className='sign-up-tool-tip'>Don't have an account? <Link className='register' to={'/register'}>Sign up!</Link></p>
        <div className='form'>
          <div className="input-group">
            <div className='label'>Email: </div>
            <input type="text" className='text-input' placeholder='name@company.com' value={email} onChange={changeEmail}/>
          </div>
          <div className="input-group">
            <div className='label'>Password:</div>
            <input type="text" className='text-input' placeholder='Password' value={password} onChange={changePassword}/>
          </div>

          <div className='buttons'>
            <button className='form-button save'>Log in</button>
            <button className='form-button cancel' onClick={() => navigate("/")}>Cancel</button>
          </div>
        </div>
      </div>
  )
}

export default LoginScreen