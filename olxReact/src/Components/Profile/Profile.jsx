import React from 'react'
import './Profile.css'
import Arrow from '../Arrow/Arrow'
import UserProduct from '../UserProduct/UserProduct'

function Profile() {
  return (
    <div className='profile_full_div'>
        <Arrow />
        <div className='user_details'>
            <h3>username</h3>
            <h3>name</h3>
            <h3>email</h3>
            <h3>phone</h3>
            <h3>address</h3>
        </div>
        <div className='profile_product_div'>
            < UserProduct />
            < UserProduct />
            < UserProduct />
            < UserProduct />
            < UserProduct />
        </div>
    </div>
  )
}

export default Profile