import React from 'react'
import cardImg from '../../assets/luffy.jpg'
import './Details.css'
import useProduct from '../../Contexts/ProductContext'

function Details() {
  const {singleProduct} = useProduct()

  const formattedDate = new Date(singleProduct?.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <div className='product_detail_div'>
        <div className="image_div">
            <img src={singleProduct?.product_image} alt="" className='img' />
        </div>
        <div className="details_div">
            <div className="prod_div">
              <h2>Price : {singleProduct?.price}</h2>
              <h3>Product name : {singleProduct?.product_name}</h3>
              <h4>Category : {singleProduct?.category}</h4>
              <h4>Description : {singleProduct?.description}</h4>
              <h4>Added on : {formattedDate}</h4>
            </div>
  
            <div className="user_div">
              <h3>Username : {singleProduct?.user?.username}</h3>
              <h4>Email : {singleProduct?.user?.email}</h4>
              <h4>Phone : {singleProduct?.user?.phone}</h4>
              <h4>Place : {singleProduct?.user?.address}</h4>
            </div>
        </div>
    </div>
  )
}

export default Details