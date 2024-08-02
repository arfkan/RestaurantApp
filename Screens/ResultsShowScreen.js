import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import axios from 'axios';

const BASE_URL = Platform.OS === 'android'
                      ? 'http://10.0.2.2:5000/api/restaurants/'
                      : 'http://localhost:5000/api/restaurants/';


export default function ResultsShowScreen({ route }) {
  const [sonuc, setSonuc] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const {id} = route.params;
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
    return <Text>Yükleniyor...</Text>;
  }

  return (
    <View>
      <Text>{sonuc.name}</Text>
      <Text>{sonuc.phone}</Text>
      <Text>{sonuc.rating}</Text>
      <Text>{sonuc.review_count}</Text>
      <Text>{sonuc.is_closed ? 'Kapalı' : 'Açık'}</Text>
      <TouchableOpacity onPress={toggleFavorite}>
        <AntDesign name={isFavorite ? "heart" : "hearto"} size={24} color="red" />
      </TouchableOpacity>
      <FlatList
        data={sonuc.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => (
          <Image style={styles.image} source={{ uri: item }} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 20,
  },
  icon2: {
    marginLeft: 20,
  },
  title: {
    alignItems: 'center',
    marginVertical: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  telno: {
    alignItems: 'center',
    marginBottom: 20,
  },
});