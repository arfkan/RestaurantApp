import { StyleSheet, View, Image, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';

export default function ProductResult({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const BASE_URL = Platform.OS === 'android'
    ? 'http://10.0.2.2:5000/api/'
    : 'http://localhost:5000/api/';

  useEffect(() => {
    const fetchProductById = async (id) => {
      try {
        const response = await fetch(`${BASE_URL}products/${id}`);
        if (!response.ok) {
          throw new Error(`Ağ yanıtı uygun değil: ${response.statusText}`);
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error('Fetch hatası:', error); 
        setError('Ürün verilerini alırken bir hata oluştu.');
      }
    };

    fetchProductById(id);
  }, [id]);

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.restaurantItem}
      onPress={() => {
        navigation.navigate('ProductResult', { id: item._id });
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

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!product) {
    return <Text>Yükleniyor...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
});
