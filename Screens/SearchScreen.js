import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Button} from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../Hooks/useResults';
import ResultsList from '../components/ResultsList';
import { useFavorites } from '../context/FavoritesContext';

export default function SearchScreen() {
  const [searchApi, results, errorMessage] = useResults();
  const [term, setTerm] = useState('');
  const {addFavorite} = useFavorites();
  
  const renderRestaurantItem = (restaurant) => (
    <View>
      <Text>{restaurant.name}</Text>
      <Button 
        title="Favorilere Ekle" 
        onPress={() => {
          addFavorite(restaurant);
          console.log('Favorilere eklendi:', restaurant.name);
        }} 
      />
    </View>
  );


  useEffect(() => {
    // Ekran yüklendiğinde otomatik olarak arama yap
    searchApi('');
  }, []);

  const filterResultsByPrices = (price) => {
    return results.filter((result) => {
      return result.price === price;
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.blueBackground}>
        <SearchBar
          term={term}
          onTermChange={setTerm}
          onTermSubmit={() => searchApi(term)}
        />
      </View>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {results.length === 0 ? ( // burda lahmacunnnn diye bir arama yaptık diyelim böyle olduğunda veri tabanında lahmacunn diye bir şey yok bundan dolayı veri gelmiyor boş döndürüyor.
        <Text></Text> 
      ) : (
        <ScrollView>
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
        </ScrollView>
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