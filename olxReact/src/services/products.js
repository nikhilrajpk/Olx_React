import api from '../utils/api';

export const fetchProducts = async () => {
  const token = localStorage.getItem('access');
  try {
    const response = await api.get('api/users/products/products/',
      // {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    // }
  );

    console.log('Products fetched:', response.data);
    return response.data;
  }catch(error){
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const addProduct = async (formData) => {
  const token = localStorage.getItem('access');
  console.log('Token:', token);
  console.log('Headers:', {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
  });

  // Debug log to verify FormData contents
  console.log("FormData contents before sending:");
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }

  try {
    const response = await api.post('api/users/add-product/', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      validateStatus: function (status) {
        return status < 500; 
      }
    } );

    if (response.status !== 201) {
      throw new Error(response.data.error || 'Failed to add product');
    }

    return response.data;
  } catch (error) {
    console.error('Upload error details:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
    throw error;
  }

  // console.log(token)
  // if (!token) {
  //   throw new Error('Authentication token is missing');
  // }

  // const headers = {
  //   'Authorization': `Bearer ${token}`,
  // };

    // return response.data;
};
