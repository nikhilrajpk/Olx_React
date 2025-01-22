import React from 'react'
import './Profile.css'
import Arrow from '../Arrow/Arrow'
import UserProduct from '../UserProduct/UserProduct'
import useUser from '../../Contexts/UserContext'
function Profile() {
  const {user} = useUser()
  return (
    <div className='profile_full_div'>
        <Arrow />
        <div className='user_details'>
            <h3>{user?.username}</h3>
            <h3>{user?.email}</h3>
            <h3>{user?.phone}</h3>
            <h3>{user?.address}</h3>
        </div>
        <div className='profile_product_div'>
            < UserProduct />
        </div>
    </div>
  )
}

export default Profile