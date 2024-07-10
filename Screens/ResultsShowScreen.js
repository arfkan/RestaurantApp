import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import yelp from '../api/yelp';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

export default function ResultsShowScreen({ route }) {
  const [sonuc, setSonuc] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const id = route.params.id;
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const getSonuc = async (id) => {
    try {
      const response = await yelp.get(`/${id}`);
      setSonuc(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
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
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{sonuc.name}</Text>
      </View>
      <View style={styles.telno}>
        <Text>{sonuc.phone}</Text>
      </View>
      
      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          {sonuc.is_closed ? (
            <AntDesign name="closecircleo" size={24} color="black" />
          ) : (
            <MaterialIcons name="delivery-dining" size={24} color="black" />
          )}
        </View>
        <TouchableOpacity style={styles.icon2} onPress={toggleFavorite}>
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={24}
            color={isFavorite ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>

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