import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Platform, FlatList, TouchableOpacity } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import DropdownComponent from '../Screens/dropdown'; 

const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5000/api/'
  : 'http://localhost:5000/api/';

export default function Adreslerim({ navigation }) {
  const [addresses, setAddresses] = useState([]);
  const [neighborhood, setNeighborhood] = useState('');
  const [street, setStreet] = useState('');
  const [doorNumber, setDoorNumber] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}adreses`);
      setAddresses(response.data);
    } catch (error) {
      console.error('Adresler alınırken hata:', error);
    }
  };

  const handleAddAddressAndNavigate = async () => {
    const newAddress = {
      city: selectedCity,
      district: selectedDistrict,
      neighborhood,
      street,
      doorNumber,
      userId: '45TPJloYrCSCnSg1XktWjdEpLAO2',
    };
  
    try {
      await axios.post(`${BASE_URL}adreses`, newAddress);
      // Reset form fields
      setSelectedCity('');
      setSelectedDistrict('');
      setNeighborhood('');
      setStreet('');
      setDoorNumber('');
      // Refetch addresses
      fetchAddresses();
    } catch (error) {
      console.error('Adres eklenirken hata:', error.response ? error.response.data : error.message);
    }
  };
  
  const handleRemoveAdres = async (adresId) => {
    try {
      await axios.delete(`${BASE_URL}adreses/${adresId}`);
      fetchAddresses(); // Adresleri yeniden yükle
    } catch (error) {
      console.error('Adres silinirken hata:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.addressListContainer}>
        <Text style={styles.headerText}>Kayıtlı Adreslerim</Text>
        <FlatList
          data={addresses}
          renderItem={({ item }) => (
            <View style={styles.addressItem}>
              <Text style={styles.addressText}>{item.city}, {item.district}, {item.neighborhood}, {item.street}, {item.doorNumber}</Text>
              <TouchableOpacity onPress={() => handleRemoveAdres(item._id)}>
                <Icon name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      </View>

      <View style={styles.addAddressContainer}>
        <Text style={styles.headerText}>Yeni Adres Ekle</Text>
        
        <DropdownComponent
          style={styles.dropDesign}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
        />
        <DropdownComponent
          style={styles.dropDesign}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
        />
        <DropdownComponent
          style={styles.dropDesign}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
        />
        <TextInput
          style={styles.input}
          placeholder="Mahalle Seçin"
          value={neighborhood}
          onChangeText={setNeighborhood}
        />
        <TextInput
          style={styles.input}
          placeholder="Sokak Seçin"
          value={street}
          onChangeText={setStreet}
        />
        <TextInput
          style={styles.input}
          placeholder="Kapı Numarası Girin"
          value={doorNumber}
          onChangeText={setDoorNumber}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddAddressAndNavigate}>
          <Text style={styles.addButtonText}>Adres Ekle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mapButton} onPress={() => navigation.navigate('Map')}>
          <Fontisto name="map-marker-alt" size={24} color="red" />
          <Text style={styles.mapButtonText}>Haritaya Git</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  addressListContainer: {
    flex: 3,
    marginBottom: 25,
  },
  addAddressContainer: {
    flex: 7,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
  },
  addressText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#FFD700',
  },
  mapButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  dropDesign: {
    marginBottom: 12, 
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
});
