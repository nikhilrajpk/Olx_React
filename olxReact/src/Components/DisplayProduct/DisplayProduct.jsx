import React, {useEffect, useMemo, useState} from 'react'
import Card from '../Card/Card'
import './DisplayProduct.css'
import { fetchProducts } from '../../services/products'
import useProduct from '../../Contexts/ProductContext'
import Loader from '../../utils/Loader/Loader'

function DisplayProduct() {
  const [loading, setLoading] = useState(false)

  // consuming productContext
  const {products, handleProducts, searchTerm} = useProduct()

  // fetching products on mount
  useEffect(()=>{
    const getProducts = async () =>{
      setLoading(true)
      try{
        const data = await fetchProducts();
        console.log(data)
        handleProducts(data)
      }catch(error){
        console.error('Error loading products:', error);
        alert('Failed to fetch products. Please log in again.');
      }finally{
        setLoading(false)
      }
    };
    getProducts()
  }, []);

  // filtering products based on the searchText
  const searchFilterProduct = useMemo(()=>{
    return searchTerm ? (
      products.filter((product)=> product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
    ) : products
  },[searchTerm, products])

  return (
    <div className='display_products_div'>
        <h2>Suggested Products</h2>
        <div className='display_products_card_div'>
          { loading ? < Loader /> :(
              searchFilterProduct && searchFilterProduct.map((product)=>(
                < Card prdct={product} key={product.id} />
              ))
            )
          }
        </div>
    </div>
  )
}

export default DisplayProduct