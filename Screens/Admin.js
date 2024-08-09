import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TextInput, Alert, FlatList, Image, TouchableOpacity, defaultImage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const API_URL = 'http://192.168.95.119:5000/api/restaurants/';

export default function AdminScreen() {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error('Veriler çekilemedi:', error);
      Alert.alert('Hata', 'Veriler çekilirken bir hata oluştu: ' + error.message);
    }
  };

  const handleAddRestaurant = async () => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          image_url: imageUrl
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Restaurant eklendi:', data);
      Alert.alert('Başarılı', 'Restaurant başarıyla eklendi', [
        {
          text: 'OK',
          onPress: () => {
            setName('');
            setImageUrl('');
            fetchData();
          }
        }
      ]);
    } catch (error) {
      console.error('Restaurant eklenemedi:', error);
      Alert.alert('Hata', 'Restaurant eklenirken bir hata oluştu: ' + error.message);
    }
  };

  const handleDeleteRestaurant = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Restaurant silindi:', data);
      fetchData(); 
      Alert.alert('Başarılı', 'Restaurant başarıyla silindi');
    } catch (error) {
      console.error('Restaurant silinemedi:', error);
      Alert.alert('Hata', 'Restaurant silinirken bir hata oluştu: ' + error.message);
    }
  };

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
          <FontAwesome onPress={() => handleDeleteRestaurant(item._id)} name="trash" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Paneli</Text>
      <TextInput
        style={styles.input}
        placeholder="Restaurant Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddRestaurant}>
        <Text style={styles.addButtonText}>Add Restaurant</Text>
      </TouchableOpacity>
      <FlatList
        data={restaurants}
        renderItem={renderRestaurantItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    backgroundColor: '#f0ad4e',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  restaurantItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  restaurantImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  restaurantInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  iconButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

});
