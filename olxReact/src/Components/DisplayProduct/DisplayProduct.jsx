import React, {useEffect, useState} from 'react'
import Card from '../Card/Card'
import './DisplayProduct.css'
import { fetchProducts } from '../../services/products'
import useProduct from '../../Contexts/ProductContext'

function DisplayProduct() {
  // consuming productContext
  const {products, handleProducts} = useProduct()

  useEffect(()=>{
    const getProducts = async () =>{
      const data = await fetchProducts();
      console.log(data)
      handleProducts(data)
    };
    getProducts()
  }, []);

  return (
    <div className='display_products_div'>
        <h2>Suggested Products</h2>
        <div className='display_products_card_div'>
          {
            products && products.map((product)=>(
              < Card prdct={product} key={product.id} />
            ))
          }
        </div>
    </div>
  )
}

export default DisplayProduct