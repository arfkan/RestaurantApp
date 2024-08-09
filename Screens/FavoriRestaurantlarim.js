import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5000/api/'
  : 'http://localhost:5000/api/';


export default function FavoriRestaurantlarim() {
  const { favorites, setFavorites, removeFavorite } = useFavorites();
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
        console.error('Favoriler alınırken hata oluştu:', error);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}favorites/${id}`);
      console.log('API Yanıtı:', response.data);
      removeFavorite(id);
    } catch (error) {
      if (error.response) {
        console.error('Sunucu Hatası:', error.response.data);
        alert(`Sunucu Hatası: ${error.response.data.message || 'Bir hata oluştu'}`);
      } else if (error.request) {
        console.error('İstek Hatası:', error.request);
        alert('İstek hatası: Sunucuya ulaşılamıyor.');
      } else {
        console.error('Hata:', error.message);
        alert('Bir hata oluştu: ' + error.message);
      }
    }
  };
  
  const renderItem = ({ item }) => {
    const restaurantId = item._id || item.id;
  
    if (!restaurantId) {
      console.error('Geçersiz item');
      return null;
    }
  
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.restaurantItem}
          onPress={() => {
            console.log("Navigating with ID:", restaurantId);
            navigation.navigate('ResultsShowScreen', { id: restaurantId });
          }}
        >
          <Image 
            source={{ uri: item.image_url }} 
            style={styles.image} 
            onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
          />
          <View style={styles.itemContent}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                console.log('Butona tıklandı!');
                handleRemoveFavorite(restaurantId);
              }}
            >
              <Text style={styles.buttonText}>Favorilerden Çıkar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favori Restaurantlarım</Text>
      {favorites && favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        />
      ) : (
        <Text style={styles.emptyText}>Henüz favori restoran eklenmedi.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  restaurantItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: 'gray',
  },
  button: {
    marginTop: 8,
    padding: 8,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});
