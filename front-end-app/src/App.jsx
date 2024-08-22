import { useEffect, useState } from 'react'
import './App.css'
import CustomerList from './components/CustomerList';
import CustomerAddUpdateForm from './components/CustomerAddUpdateForm';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import {
  getAll,
} from './handlers/customerAPIHandler'
import LoginScreen from './components/LoginScreen';
import Register from './components/Register';

function App() {
  const [customerList, setCustomerList] = useState([{'id': 1, name: 'Connect API', email: 'Connect API', password: 'Connect API'}]);
  const [customerSelectedID, setCustomerSelectedID] = useState(-1);
  const [isCustomerSelected, setIsCustomerSelected] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loggedInName, setLoggedInName] = useState('');

  useEffect(() => {
    setIsAuthorized(JSON.parse(localStorage.getItem('authorization')))
    setLoggedInName(localStorage.getItem('name'));
  }, []);

  
  const selectCustomer = (item) => {
    setCustomerSelectedID((prevState) => {
      if (prevState === item.id) {
        setIsCustomerSelected(false);
        return -1;
      }

      setIsCustomerSelected(true);
      return item.id;
    });
  }

  useEffect(() => {
    getCustomers()
  }, [customerSelectedID])

  const getCustomers = () => {
    getAll(setCustomerList)
  }

  const [colorPicked, setColor] = useState("#0077b6");



  return (
    <Router>
      <div className='wrapper'>
        {isAuthorized ? 
          <Routes>
            <Route exact path="/" element={<Navigate to="/customer" />}/>
            <Route path='/customer' element={
            <CustomerList 
              customerList={customerList} 
              selectCustomer={(id) => selectCustomer(id)} 
              customerSelectedID={customerSelectedID}
              isCustomerSelected={isCustomerSelected}
              colorPicked={colorPicked}
              setColor={setColor}
              getCustomers={() => getCustomers()}
              setIsAuthorized={setIsAuthorized}
              loggedInName={loggedInName}
            />}
            />

            <Route path='/form' element={<CustomerAddUpdateForm
              isCustomerSelected={isCustomerSelected}
              customerSelectedID={customerSelectedID}
              customerList={customerList}
              getCustomers={() => getCustomers()}
              setCustomerSelectedID={setCustomerSelectedID}
              setIsCustomerSelected={setIsCustomerSelected}
              colorPicked={colorPicked}
              setIsAuthorized={setIsAuthorized}
                />}
            />
            <Route path="*" element={<Navigate to="/" />}/>
          </Routes>
        : 
          <Routes>
            <Route exact path="/" element={<Navigate to="/login" />}/>
            <Route path='/login' element={<LoginScreen setIsAuthorized={setIsAuthorized} setLoggedInName={setLoggedInName}/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path="*" element={<Navigate to="/" />}/>
          </Routes>
        }
      </div>
    </Router>
  )
}

export default App
