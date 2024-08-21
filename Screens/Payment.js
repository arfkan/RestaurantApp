import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useCart } from '../context/CartContext';
import LastPayment from './LastPayment';
import { useNavigation } from '@react-navigation/native';

export default function Payment({ route }) {
  const { cartItems: initialCartItems} = route.params;
  const {cartItems, removeFromCart} = useCart();  // delete işlemi için 
  const [currentStep, setCurrentStep] = useState(1);

  
  const navigation = useNavigation();
   
  const handleLastPayment = () => {
    navigation.navigate('LastPayment', {cartItems: cartItems});
  };


  const tabs = [
    { pageNo: 1, title: 'Menü' },
    { pageNo: 2, title: 'Sepetim' },
    { pageNo: 3, title: 'Ödeme' },
  ];

  // ödeme işlemi 
  const calculateTotalPrice = ()=> {

    return cartItems.reduce((total, item)=> total + (parseFloat(item.price)* (item.quantity || 1)), 0).toFixed(2); 
  };

  // çöp iconuma bastığımda ürünüm silinmesi için 
  const handleRemoveProduct = (itemId) => {
    console.log('Removing item with ID:', itemId);
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    console.log('Updated cart items:', updatedCartItems);
    removeFromCart(itemId);
  };
   // item._id.$oid => ($oid) bu mongo daki ObjectId nin kısaltması oluyor

 const totalPrice = calculateTotalPrice();


// .reduce = JavaScript'te bir dizi (array) üzerinde döngü yaparak her
// bir öğeyi birleştirip tek bir değere indirgemek için kullanılan bir metottur.


  return (
    <View style={styles.container}>
      
      <ProgressBar
        page={currentStep}
        setPage={setCurrentStep}
        tabs={tabs}
        progressive={true}
        finishedBackgroundColor="#4CAF50"
        inProgressBackgroundColor="#2196F3"
      />
      
      <View style={styles.firstRectangle}>
        <MaterialIcons name="delivery-dining" size={30} color="red" />
        <View style={styles.textContainer}>
          <Text style={styles.writing}>Tahmini Teslimat</Text>
          <Text style={styles.time}>Standart (10-25 dk.)</Text>
        </View>
      </View>
      
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => handleRemoveProduct(item.id)}>
              <EvilIcons name="trash" size={30} color="black" />
            </TouchableOpacity>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>Adet: {item.quantity || 1}</Text>
              <Text style={styles.itemPrice}>${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
      
      <View style={styles.secondeRectangle}>
        <Text style={styles.totalPriceText}>Toplam: {totalPrice}</Text>
      </View>

    
      <TouchableOpacity style={styles.button} onPress={handleLastPayment}>
          <Text style={styles.buttonText}>Ödeme İşlemini Tamamla</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', 
  },
  button: {
    backgroundColor: '#ff6b6b',
    padding: 15,
    borderRadius: 50, 
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    elevation: 5, 
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  firstRectangle: {
    padding: 20,
    backgroundColor: '#ffebee', 
    borderColor: '#ff6b6b', 
    borderWidth: 1,
    borderRadius: 15, 
    width: '100%',
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2, 
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
  },
  writing: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d32f2f', 
  },
  time: {
    fontSize: 14,
    color: '#ff6b6b', 
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10, 
    backgroundColor: '#f5f5f5',
  },
  itemName: {
    fontSize: 16,
    color: '#d32f2f', 
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    textAlign: 'right',
    color: '#ff6b6b', 
    marginLeft: 10,
  },
  listContainer: {
    flexGrow: 1,
  },
  secondRectangle: {
    padding: 20,
    backgroundColor: '#ffebee', 
    borderColor: '#ff6b6b', 
    borderWidth: 1,
    borderRadius: 15, 
    width: '100%',
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f', 
  },
});
