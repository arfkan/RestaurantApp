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
              <Icon name="home" size={24} color="red" />
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
    placeholder="Şehir Seç"
/>
<DropdownComponent
    style={styles.dropDesign}
    pickedValue={selectedDistrict}
    onChange={handleSelectedDistrict}
    items={districtsByCity}
    placeholder="İlçe Seç"
/>
<DropdownComponent
    style={styles.dropDesign}
    pickedValue={selectedNeighborhood}
    onChange={setSelectedNeighborhood}
    items={neighborhoodsByDistrict}
    placeholder="Mahalle Seç"
/>


      {/*
       <TextInput
          style={styles.input}
          placeholder="Sokak ismini yazınız"
          value={street}
          onChangeText={setStreet}
        />
        <TextInput
          style={styles.input}
          placeholder="Kapı Numarası Giriniz"
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
      padding: 20,
  },
  addressListContainer: {
      flex: 3,
      marginBottom: 10,
  },
  addAddressContainer: {
      flex: 7,
      borderRadius: 15,
      padding: 20,
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      borderColor: '#ff6b6b',
      borderWidth: 1,
  },
  headerText: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 15,
      color: '#ff6b6b',
      textTransform: 'uppercase',
      letterSpacing: 2,
      textAlign: 'center',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 50,
    marginBottom: 10,
    
 
  },
  addressItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#1c1e24',
      padding: 15,
      borderRadius: 15,
      marginBottom: 15,
      elevation: 5,
      shadowColor: '#ff6b6b',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      borderWidth: 1,
      borderColor: '#ff6b6b',
      marginRight: 10,
  },
  addressText: {
      flex: 1,
      fontSize: 18,
      color: '#f1f1f1',
      fontWeight: '500',
      marginLeft: 10,
  },
  addButton: {
      backgroundColor: '#ff6b6b',
      paddingVertical: 15,
      paddingHorizontal: 25,
      borderRadius: 50,
      alignItems: 'center',
      marginBottom: 20,
      elevation: 5,
      shadowColor: '#ff6b6b',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 10,
  },
  addButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: 1.5,
  },
  mapButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 15,
      paddingHorizontal: 25,
      borderRadius: 50,
      backgroundColor: '#f9c74f',
      elevation: 5,
      shadowColor: '#f9c74f',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 10,
  },
  mapButtonText: {
      marginLeft: 10,
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
      letterSpacing: 1,
  },
  dropDesign: {
      marginBottom: 25,
      borderWidth: 1,
      borderColor: '#ff6b6b',
      borderRadius: 15,
      padding: 15,
      backgroundColor: '#2c2f38',
      shadowColor: '#ff6b6b',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      color: '#fff',
      fontSize: 16,
  },
});

