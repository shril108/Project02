import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
        <Link><button className='form-button'>Login/Sign Up</button></Link>
    </div>
  )
}

export default Header