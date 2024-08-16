import { useState } from 'react';
import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5000/api/'
  : 'http://localhost:5000/api/';

export const useAddresses = () => {
  const [addresses, setAddresses] = useState([]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}addresses`);
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };
  

  const addAddress = async (newAddress) => {
    try {
      const response = await axios.post(`${BASE_URL}addresses`, newAddress);
      setAddresses((prevAddresses) => [...prevAddresses, response.data]);
    } catch (error) {
      if (error.response) {

        console.error('Sunucu hatası:', error.response.data);
      } else if (error.request) {
     
        console.error('Sunucudan yanıt alınamadı:', error.request);
      } else {
        
        console.error('İstek gönderilirken hata oluştu:', error.message);
      }
      throw error; 
    }
  };
  

  return { addresses, fetchAddresses, addAddress };
};