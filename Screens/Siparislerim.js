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
    backgroundColor: '#fff5f5',
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffffff', 
    borderRadius: 15,
    shadowColor: '#ff6b6b', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, 
  },
  image: {
    width: 100, 
    height: 100,
    borderRadius: 15,
    marginRight: 15,
    backgroundColor: '#ffe6e6', 
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#d32f2f', 
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6b6b', 
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ff6b6b', 
  },
  itemChoice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#d32f2f', 
  },
  itemNote: {
    fontSize: 14,
    fontWeight: '500',
    color: '#b71c1c', 
    marginTop: 5,
  },
  fixedRectangle: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15, 
    shadowColor: '#ff6b6b', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 20,
  },
  paymentButton: {
    backgroundColor: '#ff6b6b', 
    paddingVertical: 15,
    borderRadius: 50, 
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  paymentButtonText: {
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailButton: {
    backgroundColor: '#d32f2f', 
    paddingVertical: 12,
    borderRadius: 50, 
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#d32f2f',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  detailButtonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});
