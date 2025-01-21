import React from 'react'
import cardImg from '../../assets/luffy.jpg'
import './Card.css'
import { Link } from 'react-router-dom'

function Card({prdct}) {
  return (
    < Link to={'/product-detail'} className='card_link'>
      <div className='outer_card'>
          <div className="img_div">
              <img src={prdct?.product_image.url} alt={prdct?.product_name} className='product_img' />
              <div className='favorite'>🤍</div>
          </div>
          <div className="product_details">
              <h2>₹ {prdct?.price}</h2>
              <p>{prdct?.product_name}</p>
              <p>{prdct?.category}</p>
              <div className="bottom_proudct_detail">
                  <p>{prdct?.user?.address}</p>
                  <p>{prdct?.created_at}</p>
              </div>
          </div>
      </div>
    </Link>
  )
}

export default React.memo(Card)