import React, { useState } from 'react'
import './Header.css'
import useUser from '../../Contexts/UserContext'
import { Link } from 'react-router-dom'
import {logoutUser} from '../../services/auth'
import useProduct from '../../Contexts/ProductContext'

function Header() {
    const {isLogged, handleIsLogged} = useUser()

    const {searchTerm, handleSearchTerm} = useProduct()


    const handleSearchChange = (searchText)=>{
        handleSearchTerm(searchText)
    }

    const handleLogout = () =>{
        logoutUser();
        handleIsLogged()
    }

  return (
    <header className='nav'>
        <Link to={'/'}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWvz4SoS1_MDfmm-HevR3Wgx2er-ZQNaKm_aGkYHdOgkLKJQXj2j0BlV4&s"
             alt="olx logo" className="logo" />
        </Link>

        <input type="text"
         className="search_bar"
         placeholder='Search product name / category'
         value={searchTerm}
         onChange={(e)=>handleSearchChange(e.target.value)}
         />

         {
            isLogged ? (
            <div className='profile'>
                < Link to={'/user-profile'} >
                    <button className='profile_btn'>👤</button>
                </Link>
            </div>
            ) : ''
         }

        <div className="top_right">
            {
                isLogged ? (
                    <Link>
                        <button onClick={handleLogout} className="login_btn">
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
            {
                isLogged ? (
                    <Link to={'/sell-product'}>
                        <button className='sell'>
                            +SELL
                        </button>
                    </Link>
                ) : (
                    <div>   </div>
                )
            }
        </div>
    </header>
  )
}

export default Header