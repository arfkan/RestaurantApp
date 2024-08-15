import React from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import { cities, districts } from '../components/citiesAndDistricts.';

const DropdownComponent = ({ selectedCity, setSelectedCity, selectedDistrict, setSelectedDistrict }) => {
  return (
    <View>
      <Text>Şehir Seçin:</Text>
      <Picker
        selectedValue={selectedCity}
        onValueChange={(itemValue) => setSelectedCity(itemValue)}
        style={styles.picker}
      >
        {cities.map((city) => (
          <Picker.Item label={city.label} value={city.value} key={city.value} />
        ))}
      </Picker>

      <Text>İlçe Seçin:</Text>
      <Picker
        selectedValue={selectedDistrict}
        onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
        style={styles.picker}
      >
        {selectedCity && districts[selectedCity] ? (
          districts[selectedCity].map((district) => (
            <Picker.Item label={district.label} value={district.value} key={district.value} />
          ))
        ) : (
          <Picker.Item label="Önce bir şehir seçin" value="" />
        )}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: 200,
  },
});

export default DropdownComponent;
