import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5000/api/'
  : 'http://localhost:5000/api/';

export default function ResultsShowScreen({ route }) {
  const [sonuc, setSonuc] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = route.params;
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  // API'den veri çekme işlevi
  const getSonuc = async (id) => {
    try {
      console.log(`API çağrısı yapılıyor: ${BASE_URL}restaurants/${id}`);
      const response = await axios.get(`${BASE_URL}restaurants/${id}`);
      console.log('API yanıtı:', response.data); // API yanıtını kontrol edin
      setSonuc(response.data);
    } catch (error) {
      console.error('Hata:', error);
      if (error.response) {
        console.error('Durum kodu:', error.response.status);
        console.error('Hata başlıkları:', error.response.headers);
        console.error('Hata detayları:', error.response.data);
      } else {
        console.error('Hata mesajı:', error.message);
      }
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

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`${BASE_URL}favorites/${sonuc.id}`);
        removeFavorite(sonuc.id);
      } else {
        const response = await axios.post(`${BASE_URL}favorites`, {
          userId: '45TPJloYrCSCnSg1XktWjdEpLAO2',
          restaurant: {
            id: sonuc.id,
            name: sonuc.name,
            image_url: sonuc.image_url
          }
        });
        addFavorite(response.data);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Favori işlemi sırasında hata:', error.response ? error.response.data : error.message);
    }
  };

  if (!sonuc) {
    return <Text>Loading...</Text>;
  }

  const photos = [sonuc.image_url, ...(sonuc.photos || [])];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{sonuc.name}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <AntDesign name={isFavorite ? "heart" : "hearto"} size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Icon name="phone" size={20} color="red" />
          <Text style={styles.infoText}> Telefon: {sonuc.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="star" size={20} color="red" />
          <Text style={styles.infoText}>Puan: {sonuc.rating}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="comment" size={20} color="red" />
          <Text style={styles.infoText}>Yorum Sayısı: {sonuc.review_count}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="location-on" size={20} color="red" />
          <Text style={styles.infoText}>Adres: {sonuc.location.display_address.join(', ')}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="menu" size={20} color="red"/>
          <Text style={styles.infoText}>Menu: {sonuc.attributes.menu_url}</Text>
        </View>
      </View>
      <FlatList
        data={photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => (
          <Image style={styles.image} source={{ uri: item }} />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Görsel bulunamadı.</Text>}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 8,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    margin: 16,
    fontSize: 16,
  },
});
