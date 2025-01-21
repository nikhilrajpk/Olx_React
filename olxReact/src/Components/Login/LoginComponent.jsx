import React, {useState} from 'react'
import './LoginComponent.css'
import Arrow from '../Arrow/Arrow'
import {loginUser} from '../../services/auth'
import useUser from '../../Contexts/UserContext'

function LoginComponent() {
  const {handleUser} = useUser()

  const [credentials, setCredentials] = useState({
    username : '',
    password : '',
  })

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setCredentials({
      ...credentials, [name] : value
    })
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const data = await loginUser(credentials)
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)
      console.log(data.userDetails)
      handleUser(data.userDetails)
      alert('Login successful')
    }catch(error){
      alert('Invalid credentials', error.message)
    }
  };

  return (
    <div className='login_page'>
      < Arrow />
        <div className="login_div">
            <div className="login_logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWvz4SoS1_MDfmm-HevR3Wgx2er-ZQNaKm_aGkYHdOgkLKJQXj2j0BlV4&s"
                alt="olx logo" className="login_img" />
            </div>
            <form onSubmit={handleSubmit} className='login_form'>

                <input type="text" name='username' onChange={handleChange} id='username' placeholder='Username' className="login_field" required />
                <input type="password" name='password' onChange={handleChange} id='pass' placeholder='Password' className="login_field" required />
                
                <button className='login_button'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default LoginComponent