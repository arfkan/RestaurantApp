import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image, Animated } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../Hooks/useResults';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import SpeedDial from '../components/SpeedDial';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCart } from '../context/CartContext'; // Sepet bağlamını içe aktar

const API_URL = 'http://192.168.95.125:5000/api/restaurants/';

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
  const { cartItems } = useCart(); // Sepet öğelerini bağlamdan al




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
      <View style={styles.header}>
  <TouchableOpacity
    onPress={() => navigation.openDrawer()} // Menü butonuna basıldığında çekmece açılır
    style={styles.menuButton}
  >
    <Icon name="menu" size={24} color="black" />
  </TouchableOpacity>

  <View style={styles.titleContainer}>
    <Text style={styles.title}>RestaurantApp</Text>
  </View>

  <TouchableOpacity
    onPress={() => navigation.navigate('Siparislerim')} // Siparislerim ekranına gider
    style={styles.cartButton}
  >
    <Icon name="shopping-cart" size={24} color="black" />
    {cartItems.length > 0 && (
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{cartItems.length}</Text>
      </View>
    )}
  </TouchableOpacity>
</View>


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
    backgroundColor: 'white',
    paddingTop: 10,
  },
  restaurantItem: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
    borderColor: '#FF6F61',
    borderWidth: 2,
  },
  restaurantInfo: {
    marginLeft: 15,
    justifyContent: 'center',
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6347',
  },
  restaurantPrice: {
    fontSize: 16,
    color: '#FF6F61',
    marginTop: 5,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF6F61',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: '#BDBDBD',
  },
  titleContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 22,
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    elevation: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  menuButton: {
    backgroundColor: '#FF6F61',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6F61',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  counterContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#FFC107',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  counterText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  
});


