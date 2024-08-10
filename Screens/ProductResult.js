import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ProductResult({ route }) {
  const { id, name, image, price } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>${price}</Text>
      <Text style={styles.explain}>1 Adet Beef Burger + Patates kızartması(Orta) + Çıtır Soğan(5'li) + 1 adet Cola (1L)</Text>
      
      <View style={styles.rectangle}>
        <Text style={styles.choice}>Soğanlı/ Soğansız</Text>
        <Text style={styles.alttitle}>Birini seç</Text>
        
        <View style={styles.options}>
          <View style={styles.option}>
            <Icon name="circle" size={20} color="white" />
            <Text style={styles.optionText}>Soğanlı</Text>
          </View>
          <View style={styles.option}>
            <Icon name="circle" size={20} color="white" />
            <Text style={styles.optionText}>Soğansız</Text>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  explain: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 25,
  },
  rectangle: {
    padding: 15,
    backgroundColor: '#ffefd5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
  },
  choice: {
    fontSize: 16,
    fontWeight: '700',
    color: 'red',
    marginBottom: 8,
  },
  alttitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  options: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 10,
  },
  option: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  optionText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'black',
  },
});
