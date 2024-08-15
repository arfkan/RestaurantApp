import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

const FavoritesContext = createContext();

const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5000/api/'
  : 'http://localhost:5000/api/';

const userId = '45TPJloYrCSCnSg1XktWjdEpLAO2'; // Sabit kullanıcı ID'si

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}favorites/${userId}`);
      if (Array.isArray(response.data)) {
        setFavorites(response.data.map(fav => fav.restaurant || fav));
      } else {
        console.error('Beklenmeyen veri formatı:', response.data);
      }
    } catch (error) {
      console.error('Favoriler alınırken hata oluştu:', error.response ? error.response.data : error.message);
    }
  }, []);

  const addFavorite = async (restaurant) => {
    try {
      const response = await axios.post(`${BASE_URL}favorites`, { userId, restaurant });
      if (response.status === 201) {
        setFavorites(prevFavorites => [...prevFavorites, restaurant]);
      }
    } catch (error) {
      console.error('Favori eklenirken hata oluştu:', error.response ? error.response.data : error.message);
    }
  };

  const removeFavorite = async (restaurantId) => {
    try {
      const response = await axios.delete(`${BASE_URL}favorites/${userId}/${restaurantId}`);
      if (response.status === 200) {
        setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== restaurantId));
      }
    } catch (error) {
      console.error('Favori silinirken hata oluştu:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, setFavorites, fetchFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);