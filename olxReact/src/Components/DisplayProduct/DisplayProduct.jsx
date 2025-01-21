import React from 'react'
import Card from '../Card/Card'
import './DisplayProduct.css'

function DisplayProduct() {
  return (
    <div className='display_products_div'>
        <h2>Suggested Products</h2>
        <div className='display_products_card_div'>
          < Card />
          < Card />
          < Card />
          < Card />
          < Card />
          < Card />
          < Card />
          < Card />
          < Card />
        </div>
    </div>
  )
}

export default DisplayProduct