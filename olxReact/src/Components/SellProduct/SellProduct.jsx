import React, { useState, useEffect } from 'react'
import Arrow from '../Arrow/Arrow'
import './SellProduct.css'
import {addProduct} from '../../services/products'
import useUser from '../../Contexts/UserContext'
import { useNavigate } from 'react-router-dom'

function SellProduct() {
  const navigate = useNavigate()

  const {user} = useUser()

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [product, setProduct] = useState({
    product_name : '',
    price : '',
    category : '',
    description : '',
    product_image : null,
    user_id : user?.id,
  })
  
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setProduct({
      ...product, [name] : value
    });
  };

  const handleImageChange = (e) =>{
    setProduct({
      ...product, product_image : e.target.files[0]
    });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    // converting to FormData for sending files.
    const formData = new FormData();

    // Add each field to FormData
    formData.append('product_name', product.product_name.trim());
    formData.append('price', product.price.trim());
    formData.append('category', product.category.trim());
    formData.append('description', product.description.trim());
    if (product.product_image) {
      formData.append('product_image', product.product_image);
    }
    // if (user?.id) {
    //   formData.append('user', user.id);
    // }

    // for (let key in product){
    //   formData.append(key, product[key])
    // }

    // Debugging: Log formData entries
    // console.log("FormData contents:");
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    console.log("Auth header:", `Bearer ${localStorage.getItem('access')}`);
    
    try{
      const response = await addProduct(formData)
      console.log('product added successfully', response)
      navigate('/')
    }catch(error){
      const errorMessage = error.response?.data?.error || error.response?.data || error.message;
      console.error('Error adding product:', errorMessage);
      
      alert(`Failed to add product: ${errorMessage}`);

    }
  };

  return (
    <div className='sell_page'>
      <Arrow />
        <div className="sell_div">
            <div className="sell_logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWvz4SoS1_MDfmm-HevR3Wgx2er-ZQNaKm_aGkYHdOgkLKJQXj2j0BlV4&s"
                alt="olx logo" className="sell_img" />
            </div>
            <form onSubmit={handleSubmit} className='sell_form' encType='multipart/form-data'>
                <input onChange={handleChange} name='product_name' type="text" placeholder='Product Name' className="sell_field" required />
                <input onChange={handleChange} name='price' type="text" placeholder='Price' className="sell_field" required />
                <input onChange={handleChange} name='category' type="text" placeholder='Category' className="sell_field" required />
                <input onChange={handleChange} name='description' type="text" placeholder='Description' className="sell_field" required />
                <input onChange={handleImageChange} name='product_image' type="file" placeholder='Image' accept='.png, .jpg, .jpeg' className="sell_upload_img" required />
                <button type='submit' className='sell_button'>Sell</button>
            </form>
        </div>
    </div>
  )
}

export default SellProduct