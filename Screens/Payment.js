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
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState(initialCartItems); //delete işlemi için 
  
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

    return cartItems.reduce((total, item)=> total+ parseFloat(item.price), 0).toFixed(2);
  };

  // çöp iconuma bastığımda ürünüm silinmesi için 
  const handleRemoveProduct = (itemId) => {
    console.log('Removing item with ID:', itemId);
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    console.log('Updated cart items:', updatedCartItems);
    setCartItems(updatedCartItems);
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
              <Text style={styles.itemPrice}>{item.price}</Text>
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
    padding: 10,
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  firstRectangle: {
    padding: 25,
    backgroundColor: '#ffefd5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  writing: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    color: 'grey',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    textAlign: 'right',
  },
  listContainer: {
    flexGrow: 1,
  },
  secondeRectangle: {
    padding: 25,
    backgroundColor: '#ffefd5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:-100
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
