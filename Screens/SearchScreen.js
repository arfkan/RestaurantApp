import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image, Animated } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../Hooks/useResults';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import SpeedDial from '../components/SpeedDial';

const API_URL = 'http://192.168.95.125:5000/api/restaurants/'; // burda uygulama ilk açıldığında  veriler gelmedi pc ıpv4 adresini almak ve yazmak lazım.

export default function SearchScreen() {
  const [fetchData, results, errorMessage] = useResults();
  const [term, setTerm] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const navigation = useNavigation();
  const listAnimation = useRef(new Animated.Value(0)).current;
  const titleAnimation = useRef(new Animated.Value(0)).current;

  const speedDialActions = [
    { icon: 'attach-money', name: "Ucuz Restaurantlar", onPress: () => handleFilter('₺') },
    { icon: 'attach-money', name: "Uygun Restaurantlar", onPress: () => handleFilter('₺₺') },
    { icon: 'attach-money', name: "Pahalı Restaurantlar", onPress: () => handleFilter('₺₺₺') },
    { icon: 'restaurant-menu', name: "Tüm Restaurantlar", onPress: () => handleFilter(null) },
  ];

  useFocusEffect(
    React.useCallback(() => {
      fetchData("/restaurants");
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

  useEffect(() => {
    Animated.spring(listAnimation, {
      toValue: isSpeedDialOpen ? 200 : 0,
      useNativeDriver: true,
    }).start();
  }, [isSpeedDialOpen]);

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
    setIsSpeedDialOpen(false);
  };

  const handleOpen = () => {
    setIsSpeedDialOpen(true);
    Animated.timing(titleAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  const handleClose = () => {
    setIsSpeedDialOpen(false);
    Animated.timing(titleAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  const titleTranslateX = titleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const defaultImage = 'https://via.placeholder.com/100';

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.restaurantItem}
      onPress={() => {
        navigation.navigate('ResultsShowScreen', { id: item._id });
      }}
    >
      <Image
        source={{ uri: item.image_url || defaultImage }}
        style={styles.restaurantImage}
      />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantPrice}>{item.price}</Text>
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
        <Animated.View style={[styles.titleContainer, { opacity: titleAnimation, transform: [{ translateX: titleTranslateX }] }]}>
          <Text style={styles.title}>Aradığın Restaurantlar burada!</Text>
        </Animated.View>


      <View style={styles.speedDialContainer}>
        <SpeedDial 
          actions={speedDialActions} 
          onOpen={handleOpen}
          onClose={handleClose}
        />
      </View>
      
      <Animated.View style={[styles.listContainer, { transform: [{ translateY: listAnimation }] }]}>
        <FlatList
          data={filteredRestaurants.length > 0 ? filteredRestaurants : restaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={(item) => item._id}
          vertical={true}
        />
      </Animated.View>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {restaurants.length === 0 && !errorMessage ? (
        <Text style={styles.noDataText}>Veri bulunamadı</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  listContainer: {
    flex: 1,
  },
  restaurantItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  restaurantImage: {
    width: 75,
    height: 75,
    borderRadius: 25,
  },
  restaurantInfo: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  restaurantPrice: {
    fontSize: 14,
    color: 'gray',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 10,
  },
  speedDialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 25,
  },
});
