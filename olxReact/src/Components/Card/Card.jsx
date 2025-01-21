import React from 'react'
import cardImg from '../../assets/luffy.jpg'
import './Card.css'
import { Link } from 'react-router-dom'

function Card() {
  return (
    < Link to={'/product-detail'} className='card_link'>
      <div className='outer_card'>
          <div className="img_div">
              <img src={cardImg} alt="" className='product_img' />
              <div className='favorite'>🤍</div>
          </div>
          <div className="product_details">
              <h2>₹ 12400</h2>
              <p>Monkey d luffy</p>
              <p>One piece</p>
              <div className="bottom_proudct_detail">
                  <p>Kanhangad</p>
                  <p>10-11-23</p>
              </div>
          </div>
      </div>
    </Link>
  )
}

export default Card