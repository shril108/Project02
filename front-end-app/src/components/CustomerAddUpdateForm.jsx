import React from 'react'
import { useState, useEffect } from 'react';
import {
  post,
  put,
  deleteById
} from '../restdb'
import { useNavigate } from "react-router-dom";

const CustomerAddUpdateForm = (props) => {
  const {
    customerSelectedID,
    isCustomerSelected,
    customerList,
    getCustomers,
    setCustomerSelectedID,
    setIsCustomerSelected,
    colorPicked
  } = props
  
  const navigate = useNavigate();

  // Setting up state and onChange handlers for the form fields
  const [name, setName] = useState('');
  const changeName = (e) => setName(e.target.value);

  const [email, setEmail] = useState('');
  const changeEmail = (e) => setEmail(e.target.value);
  
  const [password, setPassword] = useState('');
  const changePassword = (e) => setPassword(e.target.value);

  useEffect(() => {
    console.log(customerSelectedID);
    const customer = customerList.find((customer) => customer.id === customerSelectedID);

    if(isCustomerSelected){
      setName(customer.name);
      setEmail(customer.email);
      setPassword(customer.password);
    } else {
      setName('');
      setEmail('');
      setPassword('');
    }
  }, [customerSelectedID]);


  const onDeleteClick = async () => {
    if (!isCustomerSelected) {
      return
    }

    deleteById(customerSelectedID);
    await clearSelection();
    await getCustomers();
  }

  const onSaveClick = async () => {
    const customer = {
      'name': name,
      'email': email,
      'password': password,
    }

    if(isCustomerSelected){
      customer.id = customerSelectedID;
      put(customerSelectedID, customer);
    } else {
      post(customer);
    }

    await clearSelection();

    await getCustomers();
  }
  
  const clearSelection = () => {
    setIsCustomerSelected(false);
    setCustomerSelectedID(-1);
    setName('');
    setEmail('');
    setPassword('');
    navigate("/");
  }

  return (
    <div className='container'>
        <h1 className='title'>{isCustomerSelected ? 'Update' : 'Add'}</h1>
        <div className='form'>
          <div className="input-group">
            <div className='label'>Name: </div>
            <input type="text" className='text-input' placeholder='Customer Name' value={name} onChange={changeName}/>
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
            <button className='form-button save' style={{backgroundColor: colorPicked}} onClick={onSaveClick}>Save</button>
            <button className='form-button delete' onClick={onDeleteClick}>Delete</button>
            <button className='form-button cancel' onClick={clearSelection}>Cancel</button>
          </div>
        </div>
      </div>
  )
}

export default CustomerAddUpdateForm