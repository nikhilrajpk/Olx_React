import api from '../utils/api';

export const fetchProducts = async () => {
  try {
    // const token = localStorage.getItem('access'); // Retrieve token from localStorage
    // if (!token) {
    //   throw new Error('No authentication token found');
    // }

    const response = await api.get('api/users/products/products/');

    console.log('Products fetched:', response.data);
    return response.data;
  }catch(error){
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const addProduct = async (productData) => {
  const response = await api.post('api/users/products/products/', productData);
  return response.data;
};
