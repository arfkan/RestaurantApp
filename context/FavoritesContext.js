import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (restaurant) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some(fav => fav.id === restaurant.id)) {
        return [...prevFavorites, restaurant];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);