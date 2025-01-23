import React, { useState, useEffect } from 'react'
import Arrow from '../Arrow/Arrow'
import './SellProduct.css'
import {addProduct} from '../../services/products'
import useUser from '../../Contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import Loader from '../../utils/Loader/Loader'

function SellProduct() {
  const [isError, setIsError] = useState(false)
  const [errors, setErrors] = useState('')

  const [loading, setLoading] = useState(false)

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

  const validateInput = (name, value) => {
    if (name === 'product_name' && value.trim() === '') return 'Enter product name';
    if (name === 'price' && value.trim() === '') return 'Enter price';
    if (
      name === 'price' &&
      Number(value) < 0
    )
      return 'Enter a valid price';
    if (name === 'category' && value.trim() === '') return 'Enter category';
    if (name === 'description' && value.trim() === '') return 'Enter description';
    return '';
  };
  
  const handleChange = (e) =>{
    const {name, value} = e.target;

    const errorMessage = validateInput(name, value);
    if (errorMessage) {
      setErrors(errorMessage);
      setIsError(true);
    } else {
      setIsError(false);
    }

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
    
    console.log("Auth header:", `Bearer ${localStorage.getItem('access')}`);
    
    try{
      setLoading(true)
      const response = await addProduct(formData)
      console.log('product added successfully', response)
      setIsError(false)
      navigate('/')
    }catch(error){
      const errorResponse = error.response?.data || { detail: 'An error occurred' };
      const errorMessage = Object.values(errorResponse)
      .flat()
      .join(', '); 

      console.error('Error during registration:', errorMessage);
      setErrors(errorMessage); 
      setIsError(true); 
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className='sell_page'>
      <Arrow />
      {loading ? < Loader /> : (
        <div className="sell_div">
          <div className="sell_logo">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWvz4SoS1_MDfmm-HevR3Wgx2er-ZQNaKm_aGkYHdOgkLKJQXj2j0BlV4&s"
              alt="olx logo" className="sell_img" />
          </div>
          {
            isError && <div className='error_box'>{errors}</div>
          }
          <form onSubmit={handleSubmit} className='sell_form' encType='multipart/form-data'>
              <input onChange={handleChange} name='product_name' type="text" placeholder='Product Name' className="sell_field" required />
              <input onChange={handleChange} name='price' type="text" placeholder='Price' className="sell_field" required />
              <input onChange={handleChange} name='category' type="text" placeholder='Category' className="sell_field" required />
              <input onChange={handleChange} name='description' type="text" placeholder='Description' className="sell_field" required />
              <input onChange={handleImageChange} name='product_image' type="file" placeholder='Image' accept='.png, .jpg, .jpeg' className="sell_upload_img" required />
              {
                !isError && <button type='submit' className='sell_button'>Sell</button>
              }
          </form>
        </div>
      )
    }
    </div>
  )
}

export default SellProduct