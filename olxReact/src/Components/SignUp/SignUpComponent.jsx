import React, { useState } from 'react'
import './SignUpComponent.css'
import Arrow from '../Arrow/Arrow'
import {registerUser} from '../../services/auth'
import { useNavigate } from 'react-router-dom'

function SignUpComponent() {
  const navigate = useNavigate()

  const [userDetail, setUserDetail] = useState({
    username : '',
    email : '',
    phone : '',
    address : '',
    password : '',
  });

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setUserDetail({
      ...userDetail, [name] : value
    })
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const response = await registerUser(userDetail);
      console.log('registered successfully', response.message)
      navigate('/login')
    }catch(error){
      console.log('Error during registration:', error.response?.data || error.message);
      alert('Registration failed');
    }
  };

  return (
    <div className='signup_page'>
      <Arrow />
        <div className="signup_div">
            <div className="signup_logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWvz4SoS1_MDfmm-HevR3Wgx2er-ZQNaKm_aGkYHdOgkLKJQXj2j0BlV4&s"
                alt="olx logo" className="signup_img" />
            </div>
            <form onSubmit={handleSubmit} className='signup_form'>
                <input onChange={handleChange} name='username' type="text" placeholder='Username' className="signup_field" required />
                <input onChange={handleChange} name='email' type="email" placeholder='Email' className="signup_field" required />
                <input onChange={handleChange} name='phone' type="text" placeholder='Phone' className="signup_field" required />
                <input onChange={handleChange} name='address' type="text" placeholder='Address' className="signup_field" required />
                <input onChange={handleChange} name='password' type="password" placeholder='Password' className="signup_field" required />
                <button onChange={handleChange} className='signup_button'>Register</button>
            </form>
        </div>
    </div>
  )
}

export default SignUpComponent