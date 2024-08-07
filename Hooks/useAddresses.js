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
      const response = await axios.get(`${BASE_URL}adreses`);
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const addAddress = async (newAddress) => {
    try {
      const response = await axios.post(`${BASE_URL}adreses`, newAddress);
      setAddresses([...addresses, response.data]);
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  };

  return { addresses, fetchAddresses, addAddress };
};