import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import axios from 'axios';

const BASE_URL = Platform.OS === 'android'
                      ? 'http://10.0.2.2:5000/api/restaurants/'
                      : 'http://localhost:5000/api/restaurants/';

export default function ResultsShowScreen({ route }) {
  const [sonuc, setSonuc] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = route.params;
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const getSonuc = async (id) => {
    try {
      console.log(`API çağrısı yapılıyor: ${BASE_URL}${id}`);
      const response = await axios.get(`${BASE_URL}${id}`);
      console.log('API yanıtı:', response.data);
      setSonuc(response.data);
    } catch (error) {
      console.error('Hata:', error);
      console.error('Hata yanıtı:', error.response);
      if (error.response) {
        console.error('Durum kodu:', error.response.status);
        console.error('Hata başlıkları:', error.response.headers);
      }
      console.error('Hata detayları:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    console.log("Gönderilen ID:", id);
    if (id) {
      getSonuc(id);
    } else {
      console.error("Geçersiz ID");
    }
  }, [id]);

  useEffect(() => {
    if (sonuc) {
      setIsFavorite(favorites.some(fav => fav.id === sonuc.id));
    }
  }, [favorites, sonuc]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(sonuc.id);
    } else {
      addFavorite(sonuc);
    }
    setIsFavorite(!isFavorite);
  };

  if (!sonuc) {
    return <Text style={styles.loadingText}>Yükleniyor...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>{sonuc.name}</Text>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
          <AntDesign name={isFavorite ? "heart" : "hearto"} size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Telefon: {sonuc.phone}</Text>
        <Text style={styles.infoText}>Puan: {sonuc.rating}</Text>
        <Text style={styles.infoText}>Yorum Sayısı: {sonuc.review_count}</Text>
        <Text style={styles.infoText}>{sonuc.is_closed ? 'Kapalı' : 'Açık'}</Text>
      </View>
      <FlatList
        data={sonuc.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => (
          <Image style={styles.image} source={{ uri: item }} />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Görsel bulunamadı.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  favoriteButton: {
    padding: 10,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
  },
});
