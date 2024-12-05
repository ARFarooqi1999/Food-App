import axios from 'axios';

const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://192.168.100.10:5000/api/users/register', userData);
 
    console.log('User registered:', response.data);
  } catch (error) {
    console.error('Error registering user:', error);
  }
};
