import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Button } from 'react-native';
import axios from 'axios'; 

export default function MapScreen() {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });
    };

    const handleSaveLocation = async () => {
        if (selectedLocation) {
            console.log('Gönderilen veri:', selectedLocation);
            try {
                const response = await axios.post('http://localhost:5000/saveLocation', selectedLocation);
                console.log('Sunucu yanıtı:', response.data);
            } catch (error) {
                console.error('Hata detayları:', error.response ? error.response.data : error.message);
            }
        }
    };



    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress}
            >
                {selectedLocation && (
                    <Marker coordinate={selectedLocation} />
                )}
            </MapView>
            {selectedLocation && (
                <Button title="Konumu Kaydet" onPress={handleSaveLocation} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

