import { useEffect, useState } from 'react';
import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL = Platform.OS === 'android' 
  ? 'http://10users.0.2.2:5000/api/' 
  : 'http://localhost:5000/api/users';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async () => {
    try {
      console.log('API çağrısı yapılıyor: ', BASE_URL);
      const response = await axios.get(BASE_URL);
      console.log('API Yanıtı status:', response.status);
      console.log('API Yanıtı data:', JSON.stringify(response.data, null, 2));
  
      if (response.status === 200) {
        if (Array.isArray(response.data) && response.data.length > 0) {
          if (response.data[0].businesses && Array.isArray(response.data[0].businesses)) {
            setResults(response.data[0].businesses);
            console.log("İşlenmiş veriler:", JSON.stringify(response.data[0].businesses, null, 2));
            setErrorMessage('');
          } else {
            throw new Error('businesses dizisi bulunamadı veya dizi değil');
          }
        } else {
          throw new Error('Yanıt bir dizi değil veya boş');
        }
      } else {
        throw new Error(`API ${response.status} durum kodu döndürdü`);
      }
    } catch (error) {
      console.error('Veri çekme hatası:', error);
      if (error.response) {
        console.error('Hata yanıtı:', error.response.data);
        console.error('Hata durum kodu:', error.response.status);
      } else if (error.request) {
      
        console.error('Yanıt alınamadı');
      } else {
  
        console.error('Hata mesajı:', error.message);
      }
      setErrorMessage('Veri çekme hatası: ' + error.message);
      setResults([]);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return [fetchData, results, errorMessage];
}
