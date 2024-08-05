import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, FlatList, Image} from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../Hooks/useResults';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import FontAwesome from '@expo/vector-icons/FontAwesome';

const API_URL = 'http://192.168.95.101:5000/api/restaurants/';

export default function SearchScreen() {
  const [fetchData, results, errorMessage] = useResults();
  const [term, setTerm] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // restaurantlar filtrelendi
  const [selectedFilter, setSelectedFilter] = useState(null); 
  const [restaurants, setRestaurants] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      fetchData("/restaurants"); // ekran focus edildiğinde veriler geldi
    }, [])
  );

  const handleSearch = () => {
    fetchDataFromAPI(term); 
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  useEffect(() => {
    filterRestaurants();
  }, [selectedFilter, term, restaurants]);

  const fetchDataFromAPI = async (searchTerm = '') => {
    try {
      const url = searchTerm ? `${API_URL}?search=${searchTerm}` : API_URL;
      const response = await fetch(url);
      const data = await response.json();
      setRestaurants(data);
      filterRestaurants();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterRestaurants = () => {
    let filtered = restaurants;

    if (selectedFilter) {
      filtered = filtered.filter(restaurant => restaurant.price === selectedFilter);
    }

    if (term) {
      filtered = filtered.filter(restaurant => 
        restaurant.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredRestaurants(filtered);
  };

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
    setActiveFilter(filter); //
  };

  const defaultImage = 'https://via.placeholder.com/100'; // Default image

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.restaurantItem}
      onPress={() => {
        console.log("Navigating with ID:", item._id);
        navigation.navigate('ResultsShowScreen', { id: item._id });
      }}
    >
      <Image
        source={{ uri: item.image_url || defaultImage }}
        style={styles.restaurantImage}
      />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <View style={styles.iconButtonContainer}>
          
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={handleSearch}
      />
      <Text style={styles.title}>Search Restaurants</Text>

      <View style={styles.filterContainer}>
        <Button 
          title='Ucuz Restaurantlar (₺)' 
          onPress={() => handleFilter('₺')} 
        />
        {activeFilter === '₺' && (
          <FlatList
            data={filteredRestaurants}
            renderItem={renderRestaurantItem}
            keyExtractor={(item) => item._id}
            vertical = {true}
          />
        )}
        
        <Button 
          title='Uygun Restaurantlar (₺₺)' 
          onPress={() => handleFilter('₺₺')} 
        />
        {activeFilter === '₺₺' && (
          <FlatList
            data={filteredRestaurants}
            renderItem={renderRestaurantItem}
            keyExtractor={(item) => item._id}
            vertical = {true}
          />
        )}
        
        <Button 
          title='Pahalı Restaurantlar (₺₺₺)' 
          onPress={() => handleFilter('₺₺₺')} 
        />
        {activeFilter === '₺₺₺' && (
          <FlatList
            data={filteredRestaurants}
            renderItem={renderRestaurantItem}
            keyExtractor={(item) => item._id}
            vertical = {true}
          />
        )}
        
        <Button 
          title='Tümünü Göster' 
          onPress={() => {
            setSelectedFilter(null);
            setActiveFilter(null); 
          }} 
        />
        {activeFilter === null && (
          <FlatList
            data={filteredRestaurants}
            renderItem={renderRestaurantItem}
            keyExtractor={(item) => item._id}
            vertical = {true}
          />
        )}
      </View>
     
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {results.length === 0 && activeFilter === null ? (
        <Text>Veri bulunamadı</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: 16,
    gap: 5,
  },
  restaurantItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  restaurantInfo: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 18,
  },
  iconButtonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
});
