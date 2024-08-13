import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5000/api/'
  : 'http://localhost:5000/api/';

const defaultImage = 'https://example.com/defaultImage.png'; // Varsayılan resim URL'si

export default function FavoriRestaurantlarim() {
  const { favorites, setFavorites } = useFavorites();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${BASE_URL}favorites/45TPJloYrCSCnSg1XktWjdEpLAO2`);
        console.log('API Yanıtı:', response.data);
        if (Array.isArray(response.data)) {
          setFavorites(response.data.map(fav => fav.restaurant || fav));
        } else {
          console.error('Beklenmeyen veri formatı:', response.data);
        }
      } catch (error) {
        console.error('Favoriler alınırken hata oluştu:', error.response ? error.response.data : error.message);
      }
    };
    
    fetchFavorites();
  }, []);

  const handleDeleteRestaurant = async (id) => {
    if (!id) {
      console.error('Invalid restaurant ID');
      Alert.alert('Hata', 'Geçersiz restaurant ID');
      return;
    }
  
    try {
      const response = await fetch(`${BASE_URL}favorites/${userId}/${id}`, { // userId'yi doğru şekilde geçirin
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Restaurant silindi:', data);
      fetchFavorites(); 
      Alert.alert('Başarılı', 'Restaurant başarıyla silindi');
    } catch (error) {
      console.error('Restaurant silinemedi:', error);
      Alert.alert('Hata', 'Restaurant silinirken bir hata oluştu: ' + error.message);
    }
  };
  
  const renderItem = ({ item }) => {
    const restaurantId = item._id || item.id;

    if (!restaurantId) {
      console.error('Geçersiz item ID');
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
            <FontAwesome onPress={() => handleDeleteRestaurant(item._id)} name="trash" size={24} color="black" />
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
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  restaurantItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  restaurantInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconButtonContainer: {
    marginTop: 10,
  },
});
