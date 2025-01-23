import React from 'react'
import Card from '../Card/Card'
import './UserProduct.css'
import { Link } from 'react-router-dom'

function UserProduct({product}) {
  return (
    <div className='user_product_div'>
        < Card prdct={product} />
        < Link to={'/edit-product'} className='user_product_btn' >
          Edit
        </Link>
    </div>
  )
}

export default React.memo(UserProduct)