import React from 'react'
import Card from '../Card/Card'
import './UserProduct.css'
import { Link } from 'react-router-dom'

function UserProduct() {
  return (
    <div className='user_product_div'>
        < Card />
        < Link to={'/edit-product'} className='user_product_btn' >
          Edit
        </Link>
    </div>
  )
}

export default UserProduct