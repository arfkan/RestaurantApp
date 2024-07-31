import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import axios from 'axios';

const BASE_URL = 'https://your-api-base-url';

export default function ResultsShowScreen({ route }) {
  const [sonuc, setSonuc] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const id = route.params.id;
  const { favorites, addFavorite, removeFavorite } = useFavorites();



  const getSonuc = async (id) => {
    try {
      console.log(`API çağrısı yapılıyor: ${`http://10.0.2.2:5000/api/users`}/${id}`);
      const response = await axios.get(`${`http://10.0.2.2:5000/api/users`}/${id}`);
      setSonuc(response.data);
    } catch (error) {
      if (error.response) {
        // Sunucu 2xx dışında bir durum koduyla yanıt verdi
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // İstek yapıldı ancak yanıt alınamadı
        console.error('Error request:', error.request);
      } else {
        // İsteği hazırlarken bir şeyler yanlış gitti
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };

  useEffect(() => {
    getSonuc(id);
  }, []);

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