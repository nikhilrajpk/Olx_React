import React, { useMemo } from 'react'
import './Profile.css'
import Arrow from '../Arrow/Arrow'
import UserProduct from '../UserProduct/UserProduct'
import useUser from '../../Contexts/UserContext'
import useProduct from '../../Contexts/ProductContext'
import no_product_yet from '../../assets/no_product_yet.png'

function Profile() {
  const {user} = useUser()
  const {products} = useProduct()

  console.log('user', user)
  console.log('products', products)

  const filteredUserProduct = useMemo(()=>{
    return products.filter((product) => product.user.id === user.id)
  },[user,products])

  console.log('filteredUserProduct', filteredUserProduct)
  return (
    <div className='profile_full_div'>
        <Arrow />
        <div className='user_details'>
            <h3>Username : {user?.username}</h3>
            <h3>Email : {user?.email}</h3>
            <h3>Phone : {user?.phone}</h3>
            <h3>Place : {user?.address}</h3>
        </div>
        <div className='profile_product_div'>
          {
            filteredUserProduct.length !== 0 ? (
              filteredUserProduct.map((product)=>(
                
                < UserProduct product={product} key={product.id} />
                
              ))
            ) : (
              <img src={no_product_yet} alt="No products yet" className='no_products_yet' />
            )
          }
        </div>
    </div>
  )
}

export default Profile