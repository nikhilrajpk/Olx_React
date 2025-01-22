import React from 'react'
import cardImg from '../../assets/luffy.jpg'
import './Card.css'
import { Link } from 'react-router-dom'

function Card({prdct}) {
  const formattedDate = new Date(prdct?.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    < Link to={'/product-detail'} className='card_link'>
      <div className='outer_card'>
          <div className="img_div">
              <img src={prdct?.product_image} alt={prdct?.product_name} className='product_img' />
              <div className='favorite'>🤍</div>
          </div>
          <div className="product_details">
              <h2>₹ {prdct?.price}</h2>
              <p>{prdct?.product_name}</p>
              <p>{prdct?.category}</p>
              <div className="bottom_proudct_detail">
                  <p>{prdct?.user?.address || 'Address not available'}</p>
                  <p>{formattedDate}</p>
              </div>
          </div>
      </div>
    </Link>
  )
}

export default React.memo(Card)