import React from 'react'
import cardImg from '../../assets/luffy.jpg'
import './Details.css'

function Details() {
  return (
    <div className='product_detail_div'>
        <div className="image_div">
            <img src={cardImg} alt="" className='img' />
        </div>
        <div className="details_div">
            <div className="prod_div">
              <h2>price 12315</h2>
              <h3>product name</h3>
              <h4>category</h4>
              <h4>description</h4>
            </div>
  
            <div className="user_div">
              <h3>username</h3>
              <h4>email</h4>
              <h4>phone</h4>
            </div>
        </div>
    </div>
  )
}

export default Details