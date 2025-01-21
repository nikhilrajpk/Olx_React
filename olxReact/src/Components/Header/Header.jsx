import React, { useState } from 'react'
import './Header.css'
import useUser from '../../Contexts/UserContext'
import { Link } from 'react-router-dom'

function Header() {
    const {isLogged} = useUser()

    const [show, setShow] = useState(false)
    const showProfile = ()=>{
        setShow((prev) => !prev)
    }
    

  return (
    <header className='nav'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWvz4SoS1_MDfmm-HevR3Wgx2er-ZQNaKm_aGkYHdOgkLKJQXj2j0BlV4&s"
             alt="olx logo" className="logo" />

        <input type="text"
         className="search_bar"
         placeholder='Search'
         />

         {
            isLogged ? (
            <div className='profile'>
                <button onClick={showProfile} className='profile_btn'>👤</button>
                <div className={`profile_details ${show && 'profile_details_show'}`}>
                    <h3>username</h3>
                    <h3>name</h3>
                    <h3>email</h3>
                    <h3>phone</h3>
                </div>
            </div>
            ) : ''
         }

        <div className="top_right">
            {
                isLogged ? (
                    <Link>
                        <button className="login_btn">
                            Logout
                        </button>
                    </Link>
                ) : (
                    <>
                        <Link to={'/login'}>
                            <button className="login_btn">
                                Login
                            </button>
                        </Link>
                        <Link to={'/signup'}>
                            <button className="login_btn">
                                SignUp
                            </button>
                        </Link>
                    </>
                )
            }
            <Link to={'/sell-product'}>
                <button className='sell'>
                    +SELL
                </button>
            </Link>
        </div>
    </header>
  )
}

export default Header