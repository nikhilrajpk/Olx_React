import React from 'react'
import './LoginComponent.css'
import Arrow from '../Arrow/Arrow'

function LoginComponent() {
  return (
    <div className='login_page'>
      < Arrow />
        <div className="login_div">
            <div className="login_logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWvz4SoS1_MDfmm-HevR3Wgx2er-ZQNaKm_aGkYHdOgkLKJQXj2j0BlV4&s"
                alt="olx logo" className="login_img" />
            </div>
            <form className='login_form'>
                <input type="text" id='username' placeholder='Username' className="login_field" required />
                <input type="password" id='pass' placeholder='Password' className="login_field" required />
                <button className='login_button'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default LoginComponent