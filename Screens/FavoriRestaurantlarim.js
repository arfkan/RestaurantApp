import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import axios from 'axios';

const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5000/api/'
  : 'http://localhost:5000/api/';

export default function FavoriRestaurantlarim() {
  const { favorites, setFavorites, removeFavorite } = useFavorites();

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
        // İstemci tarafında sunucudan dönen hata mesajı
        console.error('Sunucu Hatası:', error.response.data);
      } else if (error.request) {
        // İstek gönderildi ancak yanıt alınamadı
        console.error('İstek Hatası:', error.request);
      } else {
        // Diğer hatalar
        console.error('Hata:', error.message);
      }
    }
  };
  
  const renderItem = ({ item }) => {
    if (!item || !item.id) {
      console.error('Geçersiz item:', item);
      return null;
    }
  
    return (
      <View style={styles.item}>
        <Image 
          source={{ uri: item.image_url }} 
          style={styles.image} 
          onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
        />
        <View style={styles.itemContent}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log('Butona tıklandı!');
              handleRemoveFavorite(item.id);
            }}
          >
            <Text style={styles.buttonText}>Favorilerden Çıkar</Text>
          </TouchableOpacity>
        </View>
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
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} // ekrana gelen toString hatasını burda çözdüm.
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
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#ff6347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});
