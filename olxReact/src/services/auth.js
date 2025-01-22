import api from '../utils/api';

export const registerUser = async (userData) => {

    const response = await api.post('api/users/auth/register/', userData, {
      headers: {
        'Content-Type': 'application/json', 
      },
    });
    return response.data;

};

export const loginUser = async (credentials) => {
 
    const response = await api.post('api/users/auth/login/', credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Stored token:', localStorage.getItem('access'));
    return response.data;
 
};

export const logoutUser = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};
