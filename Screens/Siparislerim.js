import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';


export default function Siparislerim({ route }) {
  const {cartItems, setCartItems} = useCart(); // burda hatayı çözdük setCartItems ı bunu CartContext.Provider içinde yazdık
  const navigation = useNavigation();
  

  useEffect(() => {
    if (route.params?.cartItems) {
      setCartItems(route.params.cartItems);
    }
    if (route.params?.updatedCartItem) {
      const updatedItem = route.params.updatedCartItem;
      setCartItems(prevItems => {
        const itemIndex = prevItems.findIndex(item => item.id === updatedItem.id);
        if (itemIndex !== -1) {
          const newItems = [...prevItems];
          newItems[itemIndex] = updatedItem;
          return newItems;
        } else {
          return [...prevItems, updatedItem];
        }
      });
    }
  }, [route.params?.cartItems, route.params?.updatedCartItem]);

  const handleDetail = (item) => {
    navigation.navigate('ProductResult', { 
      id: item.id,  
      name: item.name,
      image: item.image,
      price: item.price
    });
  };

  // Ödeme işlemi butonu için onPress işlevi
  const handlePayment = () => {
    navigation.navigate('Payment', {cartItems: cartItems});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.detailsContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>Fiyat: ${item.price}</Text>
              <Text>Adet: {item.quantity}</Text>
              <Text>Soğan Tercihi: {item.selectedOnion || 'Seçilmedi'}</Text>
              <Text>Sos Tercihi: {item.selectedSauce || 'Seçilmedi'}</Text>
              <Text>İçecek Tercihi: {item.selectedDrink || 'Seçilmedi'}</Text>
              <Text>Ürün Notu: {item.note || 'Yok'}</Text>

              <TouchableOpacity style={styles.detailButton} onPress={() => handleDetail(item)}>
                <Text style={styles.detailButtonText}>Ürün Detaylarına Git</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.fixedRectangle}>
        <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
          <Text style={styles.paymentButtonText}>Ödeme İşlemini Tamamla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: '400',
    color: '#888',
  },
  itemChoice: {
    fontSize: 14,
    fontWeight: '400',
    color: '#444',
  },
  itemNote: {
    fontSize: 14,
    fontWeight: '400',
    color: '#555',
    marginTop: 5,
  },
  fixedRectangle: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 15,
  },
  paymentButton: {
    backgroundColor: '#ff6347', 
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailButton: {
    backgroundColor: '#ff6347', 
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
