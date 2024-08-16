import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Button, Platform } from 'react-native';
import axios from 'axios'; 
import { useAddresses } from '../Hooks/useAddresses';

const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5000/api/'
  : 'http://localhost:5000/api/';

export default function MapScreen({ navigation }) {
    const [selectedLocation, setSelectedLocation] = useState({
        latitude: 41.0082,
        longitude: 28.9784,
    });
    const { addAddress } = useAddresses();

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });
    };

    const handleSaveLocation = async () => {
        try {
          const newAddress = {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          };
          await addAddress(newAddress);
          navigation.navigate('Adreslerim');
        } catch (error) {
          if (error.response) {
            console.error('Sunucu yanıtı:', error.response.data);
          } else if (error.request) {
            console.error('İstek yapıldı ancak sunucudan yanıt alınamadı:', error.request);
          } else {
            console.error('Axios isteği sırasında bir hata oluştu:', error.message);
          }
        }
      };
    
      
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 41.0082,
                    longitude: 28.9784,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress}
            >
                <Marker coordinate={selectedLocation} />
            </MapView>
            <Button title="Konumu Kaydet" onPress={handleSaveLocation} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '90%',
    },
});