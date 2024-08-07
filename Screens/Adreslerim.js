import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Platform, FlatList, TouchableOpacity } from 'react-native';
import { useAddresses } from '../Hooks/useAddresses';
import Fontisto from '@expo/vector-icons/Fontisto';

const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5000/api/'
  : 'http://localhost:5000/api/';

export default function Adreslerim({ navigation }) {
  const { addresses, fetchAddresses, addAddress } = useAddresses();
  
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [street, setStreet] = useState('');
  const [doorNumber, setDoorNumber] = useState('');

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddAddressAndNavigate = async () => {
    const newAddress = {
      city,
      district,
      neighborhood,
      street,
      doorNumber
    };
    
    try {
      await addAddress(newAddress);
      setCity('');
      setDistrict('');
      setNeighborhood('');
      setStreet('');
      setDoorNumber('');
      fetchAddresses(); // Adresleri yeniden yükle
    } catch (error) {
      console.error('Adres eklenirken hata:', error);
    }
  };

  const renderAddressItem = ({ item }) => (
    <Text style={styles.addressItem}>
      {item.city}, {item.district}, {item.neighborhood}, {item.street}, {item.doorNumber}
    </Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Şehir Seçin"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="İlçe Seçin"
          value={district}
          onChangeText={setDistrict}
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
          placeholder="Kapı numarası girin"
          value={doorNumber}
          onChangeText={setDoorNumber}
        />
        <Button title="Adres Ekle" onPress={handleAddAddressAndNavigate} />
        
        <TouchableOpacity style={styles.mapButton} onPress={() => navigation.navigate('Map')}>
        <Fontisto name="map-marker-alt" size={24} color="red" />
        <Text style={styles.mapButtonText}>Haritaya Git</Text>
        </TouchableOpacity>


        <FlatList
          data={addresses}
          renderItem={renderAddressItem}
          keyExtractor={(item) => item.id.toString()} // ID ile benzersiz anahtar sağlanıyor
          style={styles.addressList} // stili burdan ekleyecem sonra
         />
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  addressItem: {
    marginBottom: 5,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  mapButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
