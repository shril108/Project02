import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";


const Register = () => {
    const [name, setName] = useState('');
    const changeName = (e) => setName(e.target.value);

    const [email, setEmail] = useState('');
    const changeEmail = (e) => setEmail(e.target.value);
    
    const [password, setPassword] = useState('');
    const changePassword = (e) => setPassword(e.target.value);

    const navigate = useNavigate();

  return (
    <div className='container'>
        <h1 className='title'>Register</h1>
        <p className='sign-up-tool-tip'>Already have an account? <Link className='register' to={'/login'}>Log in!</Link></p>
        <div className='form'>
            
          <div className="input-group">
            <div className='label'>Name: </div>
            <input type="text" className='text-input' placeholder='Name' value={name} onChange={changeName}/>
          </div>
          <div className="input-group">
            <div className='label'>Email: </div>
            <input type="text" className='text-input' placeholder='name@company.com' value={email} onChange={changeEmail}/>
          </div>
          <div className="input-group">
            <div className='label'>Password:</div>
            <input type="text" className='text-input' placeholder='Password' value={password} onChange={changePassword}/>
          </div>

          <div className='buttons'>
            <button className='form-button save'>Register</button>
            <button className='form-button cancel' onClick={() => navigate("/")}>Cancel</button>
          </div>
        </div>
      </div>
  )
}

export default Register