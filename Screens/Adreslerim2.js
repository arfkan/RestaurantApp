import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Platform, FlatList, TouchableOpacity } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import DropdownComponent from '../Screens/dropdown2'; 
import { cities, districts, neighborhoods } from '../data/cities';
import { set } from 'mongoose';

const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5000/api/'
  : 'http://localhost:5000/api/';

export default function Adreslerim2({ navigation }) {
    const [addresses, setAddresses] = useState([]);
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [doorNumber, setDoorNumber] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
    const [districtsByCity, setDistrictsByCity] = useState([]);
    const [neighborhoodsByDistrict, setNeighborhoodsByDistrict] = useState([]);


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
      neighborhood: selectedNeighborhood,
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



  const handleSelectedCity = (value) => {
    setSelectedCity(value);
    setDistrictsByCity(districts[value] || []);
  }

  const handleSelectedDistrict = (value) => {
    setSelectedDistrict(value);
    setNeighborhoodsByDistrict(neighborhoods[value] || []);
  }

 
  /*const filteredDistrictsByCity = (value) => {
    const filteredDistrict = districts[value]
    console.log(filteredDistrict);

    const filteredNeighborhoodByDistrict = (value) => {
      const filteredNeighborhood = neighborhoods[value]
      console.log(filteredNeighborhood)
    }
    
    // console.log(filteredDistrict);
    
  } */

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
          pickedValue={selectedCity}
          onChange={handleSelectedCity}
          items={cities}
        />
        <DropdownComponent
          style={styles.dropDesign}
          pickedValue={selectedDistrict}
          onChange={handleSelectedDistrict}
          items={districtsByCity}
        />
        <DropdownComponent
          style={styles.dropDesign}
          pickedValue={selectedNeighborhood}
          onChange={setSelectedNeighborhood}
          items={neighborhoodsByDistrict}
        />

          {/*<TextInput
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
          */}
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
        shadowColor: '#000', // Ekstra gölge efekti
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 50,
        width: '100%', // Genişliği tam yaparak ekrandaki boşluğu kullanır
        backgroundColor: '#fff',
        shadowColor: '#000', // Ekstra gölge efekti
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    addressItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
        shadowColor: '#000', // Ekstra gölge efekti
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    addressText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    addButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
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
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#FFD700',
    },
    mapButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    dropDesign: {
        marginBottom: 22,
        borderWidth: 1, // Kenar çizgisi
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#000', // Ekstra gölge efekti
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
});

