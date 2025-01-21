import React from 'react'
import './SignUpComponent.css'
import Arrow from '../Arrow/Arrow'
function SignUpComponent() {
  return (
    <div className='signup_page'>
      <Arrow />
        <div className="signup_div">
            <div className="signup_logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWvz4SoS1_MDfmm-HevR3Wgx2er-ZQNaKm_aGkYHdOgkLKJQXj2j0BlV4&s"
                alt="olx logo" className="signup_img" />
            </div>
            <form className='signup_form'>
                <input type="text" placeholder='Username' className="signup_field" required />
                <input type="email" placeholder='Email' className="signup_field" required />
                <input type="text" placeholder='Phone' className="signup_field" required />
                <input type="password" placeholder='Password' className="signup_field" required />
                <button className='signup_button'>Register</button>
            </form>
        </div>
    </div>
  )
}

export default SignUpComponent