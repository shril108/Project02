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

    const [confirmPassword, setConfirmPassword] = useState('');
    const changeConfirmPassword = (e) => setConfirmPassword(e.target.value);
    
    const [nameLengthError, setNameLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordLengthError, setPasswordLengthError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const navigate = useNavigate();

    const registrationValidationOnClick = () => {
        let errorsOccured = false;

        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if(emailPattern.test(email)){
            setEmailError(false);
        } else {
            errorsOccured = true;
            setEmailError(true);
        }

        console.log(name.length);
        if (name.length > 0) {
            setNameLengthError(false);
        } else {
            errorsOccured = true;
            setNameLengthError(true);
        }

        if (password.length >= 4) {
            setPasswordLengthError(false);
        } else {
            errorsOccured = true;
            setPasswordLengthError(true);
        }

        // Check if password is valid based on the API response
        if(password === confirmPassword){
            setPasswordMatchError(false);
        } else {
            errorsOccured = true;
            setPasswordMatchError(true);
        }


        if (errorsOccured) {
            return;
        }

    };

  return (
    <div className='container'>
        <h1 className='title'>Register</h1>
        <p className='sign-up-tool-tip'>Already have an account? <Link className='register' to={'/login'}>Log in!</Link></p>
        <div className='form'>
            
          <div className="input-group">
            <div className='label'>Name: </div>
            <input type="text" className='text-input' placeholder='Name' value={name} onChange={changeName}/>
            {nameLengthError ? <div className='error'>Please enter a name</div> : <></>}
          </div>
          <div className="input-group">
            <div className='label'>Email: </div>
            <input type="email" className='text-input' placeholder='name@company.com' value={email} onChange={changeEmail}/>
            {emailError ? <div className='error'>Please enter a valid email</div> : <></>}
          </div>
          <div className="input-group">
            <div className='label'>Password:</div>
            <input type="text" className='text-input' placeholder='Password' value={password} onChange={changePassword}/>
            {passwordLengthError ? <div className='error'>Password must be at least 4 characters</div> : <></>}
          </div>
          <div className="input-group">
            <div className='label'>Confirm Password:</div>
            <input type="text" className='text-input' placeholder='Confirm Password' value={confirmPassword} onChange={changeConfirmPassword}/>
            {passwordMatchError ? <div className='error'>Passwords do not match</div> : <></>}
          </div>

          <div className='buttons'>
            <button className='form-button save' onClick={() => registrationValidationOnClick()}>Register</button>
            <button className='form-button cancel' onClick={() => navigate("/")}>Cancel</button>
          </div>
        </div>
      </div>
  )
}

export default Register