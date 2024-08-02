import { useEffect, useState } from 'react';
import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5000/api'
  : 'http://localhost:5000/api'; // burda cannot get api aldık burayı sor?

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async (path) => {
    try {
     // console.log('API çağrısı yapılıyor: ', BASE_URL); 
      const response = await axios.get(BASE_URL+path); // burda BASE_URL + path yaptım ve bunu postmande yazıyorum
      console.log('API Yanıtı:', response); 
      if (response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
        console.log('API Yanıtı data:', response.data); 
        setResults(response.data);
        setErrorMessage('');
      } else {
        setErrorMessage(`API ${response.status} durum kodu döndürdü veya veri formatı hatalı`);
      }
    } catch (error) {
      console.error('Veri çekme hatası:', error);
      if (error.response) {
        setErrorMessage(`Veri çekme hatası: ${error.response.data}`);
      } else if (error.request) {
        setErrorMessage('Veri çekme hatası: Yanıt alınamadı');
      } else {
        setErrorMessage('Veri çekme hatası: ' + error.message);
      }
      setResults([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [fetchData, results, errorMessage];
};