import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, FlatList } from 'react-native';
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
    console.log('Results:', results); // Veriler frontend'e geliyor mu?
  }, [results]);

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ResultShowScreen', { id: item._id })}>
      <Text>{item.name}</Text>
      <Button
        title="Favorilere Ekle"
        onPress={() => {
          addFavorite(item);
          console.log('Favorilere eklendi:', item.name);
        }}
      />
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
          data={results[0]?.businesses || []} // İç içe geçmiş 'businesses' dizisini çekiyoruz.
          keyExtractor={(result, index) => (result?._id ? result._id.toString() : index.toString())} // _id yoksa index kullanıyoruz.
          renderItem={renderRestaurantItem}
        />
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