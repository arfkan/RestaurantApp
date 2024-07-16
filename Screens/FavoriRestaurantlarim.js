import React from 'react';
import { Button, StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';


export default function FavoriRestaurantlarim() {
  const { favorites, removeFavorite } = useFavorites();

  console.log('Favorites:', favorites); 

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image 
        source={{ uri: item.image_url }} 
        style={styles.image} 
        onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
      />
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Button
          title='Favorilerden Çıkar'
          onPress={() => {
            removeFavorite(item.id);
            console.log('Removing favorite:', item.id);
          }}
        />
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favori Restaurantlarım</Text>
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
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,  
    height: 100, 
    marginRight: 10,
    borderRadius: 5,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});