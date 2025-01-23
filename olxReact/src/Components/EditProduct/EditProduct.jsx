import React,{useState} from 'react'
import Arrow from '../Arrow/Arrow'
import './EditProduct.css'
import { useNavigate } from 'react-router-dom'
import {updateProduct} from '../../services/products'
import Loader from '../../utils/Loader/Loader'

function EditProduct() {
  const [isError, setIsError] = useState(false)
  const [errors, setErrors] = useState('')

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const edit_product_detail = JSON.parse(localStorage.getItem('edit_product'))

  const [product, setProduct] = useState({
    product_name: edit_product_detail?.product_name || '',
    price: edit_product_detail?.price || '',
    category: edit_product_detail?.category || '',
    description: edit_product_detail?.description || '',
    product_image: null
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    const errorMessage = validateInput(name, value);
    if (errorMessage) {
      setErrors(errorMessage);
      setIsError(true);
    } else {
      setIsError(false);
    }

    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      product_image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('product_name', product.product_name);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('description', product.description);
    
    // Only append image if a new file is selected
    if (product.product_image instanceof File) {
      formData.append('product_image', product.product_image);
    }

    try {
      setLoading(true)
      const response = await updateProduct(edit_product_detail.id, formData);
      console.log('Product updated successfully', response);
      setIsError(false)
      navigate('/');  
    } catch (error) {
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
    <div className='edit_page'>
      <Arrow />
        { loading ? < Loader /> : (
          <div className="edit_div">
              <div className="edit_logo">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWvz4SoS1_MDfmm-HevR3Wgx2er-ZQNaKm_aGkYHdOgkLKJQXj2j0BlV4&s"
                  alt="olx logo" className="edit_img" />
              </div>
              {
                isError && <div className='error_box'>{errors}</div>
              }
              <form onSubmit={handleSubmit} encType='multipart/form-data' className='edit_form'>
                  
                  <input 
                  type="text" 
                  name="product_name"
                  value={product.product_name} 
                  onChange={handleChange}
                  placeholder='Product Name' 
                  className="edit_field" 
                  required 
                />
                <input 
                  type="text" 
                  name="price"
                  value={product.price} 
                  onChange={handleChange}
                  placeholder='Price' 
                  className="edit_field" 
                  required 
                />
                <input 
                  type="text" 
                  name="category"
                  value={product.category} 
                  onChange={handleChange}
                  placeholder='Category' 
                  className="edit_field" 
                  required 
                />
                <input 
                  type="text" 
                  name="description"
                  value={product.description} 
                  onChange={handleChange}
                  placeholder='Description' 
                  className="edit_field" 
                  required 
                />
                <img 
                  src={product.product_image || edit_product_detail?.product_image} 
                  alt={product.product_name} 
                  className="edit_product_img" 
                />
                <input 
                  type="file" 
                  onChange={handleImageChange}
                  placeholder='Image' 
                  accept='.png, .jpg, .jpeg' 
                  className="edit_upload_img" 
                />
                {
                  !isError && <button type="submit" className='edit_button'>Update Product</button>
                }
              </form>
          </div> )
        }
    </div>
  )
}

export default EditProduct