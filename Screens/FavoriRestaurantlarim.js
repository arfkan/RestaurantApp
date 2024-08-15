import React, { useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5000/api/'
  : 'http://localhost:5000/api/';

const defaultImage = 'https://example.com/defaultImage.png';

const userId = '45TPJloYrCSCnSg1XktWjdEpLAO2'; 

export default function FavoriRestaurantlarim() {
  const { favorites, setFavorites, removeFavorite } = useFavorites();
  const navigation = useNavigation();

  const fetchFavorites = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}favorites/${userId}`);
      console.log('API Yanıtı:', response.data);
      if (Array.isArray(response.data)) {
        setFavorites(response.data.map(fav => fav.restaurant || fav));
      } else {
        console.error('Beklenmeyen veri formatı:', response.data);
      }
    } catch (error) {
      console.error('Favoriler alınırken hata oluştu:', error.response ? error.response.data : error.message);
    }
  }, [setFavorites]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleDeleteRestaurant = async (restaurantId) => {
    if (!restaurantId) {
      console.error('Geçersiz restaurant ID');
      Alert.alert('Hata', 'Geçersiz restaurant ID');
      return;
    }
  
    try {
      const response = await axios.delete(`${BASE_URL}favorites/${userId}/${restaurantId}`);
      console.log('Restaurant silindi:', response.data);
      await fetchFavorites();
      Alert.alert('Başarılı', 'Restaurant başarıyla silindi');
    } catch (error) {
      console.error('Restaurant silinemedi:', error);
  
      // Hatanın nedenini daha iyi anlamak için hata mesajını genişletelim
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        Alert.alert('Hata', `Restaurant silinirken bir hata oluştu: ${error.response.data}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        Alert.alert('Hata', 'Sunucuya ulaşılamadı');
      } else {
        console.error('Error message:', error.message);
        Alert.alert('Hata', `Bir hata oluştu: ${error.message}`);
      }
    }
  };
  

  const renderItem = ({ item }) => {
    const restaurantId = item._id || item.id;

    if (!restaurantId) {
      console.error('Geçersiz item ID', item);
      return null;
    }

    return (
      <TouchableOpacity
        style={styles.restaurantItem}
        onPress={() => navigation.navigate('ResultsShowScreen', { id: restaurantId })}
      >
        <Image
          source={{ uri: item.image_url || defaultImage }}
          style={styles.restaurantImage}
        />
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <View style={styles.iconButtonContainer}>
            <FontAwesome onPress={() => handleDeleteRestaurant(restaurantId)} name="trash" size={24} color="black" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item._id || item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  restaurantItem: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  restaurantInfo: {
    marginLeft: 10,
    justifyContent: 'space-between',
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
