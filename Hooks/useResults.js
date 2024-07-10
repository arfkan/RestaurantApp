import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async (searchTerm) => {
    try {
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: searchTerm,
          location: ' İstanbul',
        },
      });
      setResults(response.data.businesses);
      setErrorMessage(''); 
    } catch (error) {
      setErrorMessage('Bağlantı hatası'); // eğer yukarıda get metodundaki search kısmını searchh şeklinde yazarsak bağlantı hatası yazdırı ekrana.
    }
  };

  useEffect(() => {
    searchApi('Toast');
  }, []);

  return [searchApi, results, errorMessage]; // Array olarak dönün
};