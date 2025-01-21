import React from 'react'
import Arrow from '../Arrow/Arrow'
import './SellProduct.css'

function SellProduct() {
  return (
    <div className='sell_page'>
      <Arrow />
        <div className="sell_div">
            <div className="sell_logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWvz4SoS1_MDfmm-HevR3Wgx2er-ZQNaKm_aGkYHdOgkLKJQXj2j0BlV4&s"
                alt="olx logo" className="sell_img" />
            </div>
            <form className='sell_form'>
                <input type="text" placeholder='Product Name' className="sell_field" required />
                <input type="text" placeholder='Price' className="sell_field" required />
                <input type="text" placeholder='Category' className="sell_field" required />
                <input type="text" placeholder='Description' className="sell_field" required />
                <input type="file" placeholder='Image' accept='.png, .jpg, .jpeg' className="sell_upload_img" required />
                <button className='sell_button'>Sell</button>
            </form>
        </div>
    </div>
  )
}

export default SellProduct