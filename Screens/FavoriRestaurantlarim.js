import React from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';


export default function FavoriRestaurantlarim() {
  const { favorites, removeFavorite } = useFavorites();

  console.log('Favorites:', favorites); 

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <Button
        title='Favorilerden Çıkar'
        onPress={() => {
          removeFavorite(item.id);
          console.log('Removing favorite:', item.id); // Çıkarma işlemini kontrol edin
          
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favori Restoranlarım</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>Henüz favori restoran eklenmedi.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});