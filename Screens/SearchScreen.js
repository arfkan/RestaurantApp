import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../Hooks/useResults'; // Hook'u kullan
import ResultsList from '../components/ResultsList';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
  const [fetchData, results, errorMessage] = useResults();
  const [term, setTerm] = useState('');
  const { addFavorite } = useFavorites();
  const navigation = useNavigation();

  const renderRestaurantItem = (restaurant) => (
    <View key={restaurant._id}>
      <TouchableOpacity onPress={() => navigation.navigate('ResultShowScreen', { id: restaurant._id })}>
        <Text>{restaurant.name}</Text>
      </TouchableOpacity>
      <Button
        title="Favorilere Ekle"
        onPress={() => {
          addFavorite(restaurant);
          console.log('Favorilere eklendi:', restaurant.name);
        }}
      />
    </View>
  );
  
  

  const filterResultsByPrices = (price) => {
    return results.filter((result) => result.price === price);
  };

  useEffect(() => {
    fetchData();
    console.log('Results:', results); // Veriyi kontrol edin
    console.log('Error Message:', errorMessage); // Hata mesajını kontrol edin
  }, []); // terminalde döngüye giriyordu veriler [] şeklinde boş dönmesi ile bu sorun çözüldü.

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.blueBackground}>
        <SearchBar
          term={term}
          onTermChange={setTerm}
          onTermSubmit={() => fetchData(term)}
        />
      </View>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {results.length === 0 ? (
        <Text>Veri bulunamadı</Text>
      ) : (
        <>
          <ResultsList
            title="Ucuz Restaurantlar"
            results={filterResultsByPrices('₺')}
            renderItem={renderRestaurantItem}
          />
          <ResultsList
            title="Uygun Restaurantlar"
            results={filterResultsByPrices('₺₺')}
            renderItem={renderRestaurantItem}
          />
          <ResultsList
            title="Pahalı Restaurantlar"
            results={filterResultsByPrices('₺₺₺')}
            renderItem={renderRestaurantItem}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  blueBackground: {
    backgroundColor: 'blue',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});