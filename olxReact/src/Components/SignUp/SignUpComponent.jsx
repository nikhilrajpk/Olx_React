import React, { useState } from 'react'
import './SignUpComponent.css'
import Arrow from '../Arrow/Arrow'
import {registerUser} from '../../services/auth'
import { useNavigate } from 'react-router-dom'

function SignUpComponent() {
  const [isError, setIsError] = useState(false)
  const [errors, setErrors] = useState('')

  const navigate = useNavigate()

  const [userDetail, setUserDetail] = useState({
    username : '',
    email : '',
    phone : '',
    address : '',
    password : '',
  });

  const validateInput = (name, value) => {
    if (name === 'username' && value.trim() === '') return 'Enter username';
    if (name === 'email' && value.trim() === '') return 'Enter email';
    if (
      name === 'email' &&
      !value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    )
      return 'Enter a valid email';
    if (name === 'phone' && value.trim() === '') return 'Enter phone number';
    if (name === 'phone' && value.length !== 10)
      return 'Enter a 10-digit phone number';
    if (name === 'address' && value.trim() === '') return 'Enter place';
    if (name === 'password' && value.trim() === '') return 'Enter password';
    return '';
  };

  const handleChange = (e) =>{
    const {name, value} = e.target;

    const errorMessage = validateInput(name, value);
    if (errorMessage) {
      setErrors(errorMessage);
      setIsError(true);
    } else {
      setIsError(false);
    }

    setUserDetail({
      ...userDetail, [name] : value
    })
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const response = await registerUser(userDetail);
      setIsError(false)
      console.log('registered successfully', response.message)
      navigate('/login')
    }catch(error){
      const errorResponse = error.response?.data || { detail: 'An error occurred' };
      const errorMessage = Object.values(errorResponse)
      .flat()
      .join(', '); 

      console.error('Error during registration:', errorMessage);
      setErrors(errorMessage); 
      setIsError(true); 
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

            {
              isError && <div className='error_box'>{errors}</div>
            }

            <form onSubmit={handleSubmit} className='signup_form'>
                <input onChange={handleChange} name='username' type="text" placeholder='Username' className="signup_field" required />
                <input onChange={handleChange} name='email' type="email" placeholder='Email' className="signup_field" required />
                <input onChange={handleChange} name='phone' type="text" placeholder='Phone' className="signup_field" required />
                <input onChange={handleChange} name='address' type="text" placeholder='Place' className="signup_field" required />
                <input onChange={handleChange} name='password' type="password" placeholder='Password' className="signup_field" required />
                {
                  !isError && <button onChange={handleChange} className='signup_button'>Register</button>
                }
            </form>
        </div>
    </div>
  )
}

export default SignUpComponent