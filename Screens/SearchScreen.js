import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, FlatList, Image} from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../Hooks/useResults';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigation } from '@react-navigation/native';


export default function SearchScreen() {
  const [fetchData, results, errorMessage] = useResults();
  const [term, setTerm] = useState('');
  const { addFavorite } = useFavorites();
  const navigation = useNavigation();

  useEffect(() => {
    console.log('Fetching data...');
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Results:', JSON.stringify(results, null, 2)); 
  }, [results]);

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.restaurantItem} 
      onPress={() => {
        console.log("Navigating with ID:", item.id);  // ID'yi loglayalım
        navigation.navigate('ResultsShowScreen', { id: item.id })
      }}

      >
      <Image 
        source={{ uri: item.image_url }} 
        style={styles.restaurantImage} 
      />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Button
          title="Favorilere Ekle"
          onPress={() => {
            console.log(item.id);
            addFavorite(item);
            console.log('Favorilere eklendi:', item.name);
          }}
        />
      </View>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <SearchBar term={term} onTermChange={setTerm} onTermSubmit={() => fetchData(term)} />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {results.length === 0 ? (
        <Text>Veri bulunamadı</Text>
      ) : (
        <FlatList
          data={results[0]?.businesses || []} 
          keyExtractor={(result, index) => (result?._id ? result._id.toString() : index.toString())} 
          renderItem={renderRestaurantItem}
        />
      )}
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
    borderBottomColor: '#eee',
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});