import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';


const getProductType = (name) => {
  const lowerCaseName = name.toLowerCase();
  if (lowerCaseName.includes('kebap')) {
    return 'kebap';
  } else if (lowerCaseName.includes('döner')) {
    return 'döner';
  } else if (lowerCaseName.includes('baklava')) {
    return 'baklava';
  } else {
    return 'other';
  }
};


export default function ProductResult({ route }) {
  const { id, name, image, price, product_explain, type = 'other' } = route.params; // burda kebap ve döner için bir type belirlenmesi için type a other dedik
// product_explain ürün açıklamalarını veri tabanından getirmekte
  const productType = getProductType(name);

  const [selectedOnion, setSelectedOnion] = useState(null);
  const [selectedSauce, setSelectedSauce] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState(''); 

  const navigation = useNavigation();

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
  };

  useEffect(() => {
    console.log('Type:', type);
  }, [type]);

  const addToCart = () => {
    const productDetails = {
      id,
      name,
      image,
      price,
      product_explain,
      quantity,
      selectedOnion,
      selectedSauce,
      selectedDrink,
      note,
    };

    navigation.navigate('Siparislerim', { updatedCartItem: productDetails });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.product_explain}>{product_explain}</Text> 

        {productType !== 'baklava' && (
          <>
            {(productType === 'kebap' || productType === 'döner') && (
              <>
                {/* Soğan Seçenekleri */}
                <View style={styles.rectangle}>
                  <Text style={styles.choice}>Soğanlı/ Soğansız</Text>
                  <Text style={styles.alttitle}>Birini seç</Text>
                  <View style={styles.options}>
                    <TouchableOpacity onPress={() => setSelectedOnion('Soğanlı')} style={styles.optionButton}>
                      <Icon name={selectedOnion === 'Soğanlı' ? "check-circle" : "circle"} size={20} color={selectedOnion === 'Soğanlı' ? 'green' : 'gray'} />
                      <Text style={styles.optionText}>Soğanlı</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedOnion('Soğansız')} style={styles.optionButton}>
                      <Icon name={selectedOnion === 'Soğansız' ? "check-circle" : "circle"} size={20} color={selectedOnion === 'Soğansız' ? 'green' : 'gray'} />
                      <Text style={styles.optionText}>Soğansız</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Sos Tercihleri */}
                <View style={[styles.rectangle, styles.sosRectangle]}>
                  <Text style={styles.choice}>Sos Tercihleri</Text>
                  <Text style={styles.alttitle}>Birini seç</Text>
                  <View style={styles.optionsColumn}>
                    {['Sos 1', 'Sos 2', 'Sos 3', 'Sos 4'].map(option => (
                      <TouchableOpacity key={option} onPress={() => setSelectedSauce(option)} style={styles.optionButton}>
                        <Icon name={selectedSauce === option ? "check-circle" : "circle"} size={20} color={selectedSauce === option ? 'green' : 'gray'} />
                        <Text style={styles.optionText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </>
            )}

            {/* İçecek Seçenekleri */}
            <View style={[styles.rectangle, styles.sosRectangle]}>
              <Text style={styles.choice}>İçecek Seçenekleri</Text>
              <Text style={styles.alttitle}>Birini seç</Text>
              <View style={styles.optionsColumn}>
                {['Coco-cola(1L)', 'Coco-cola Light(1L)', 'Coco-cola Şekersiz(1L)', 'Sprite (1L)', 'Fanta (1L)'].map(option => (
                  <TouchableOpacity key={option} onPress={() => setSelectedDrink(option)} style={styles.optionButton}>
                    <Icon name={selectedDrink === option ? "check-circle" : "circle"} size={20} color={selectedDrink === option ? 'green' : 'gray'} />
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}

        <View style={styles.productRectangle}>
          <View>
            <Text style={styles.note}>Ürün Notu</Text>
          </View> 
          <Text style={styles.alttitle2}>
            Alerjiniz ya da ürünle ilgili bize aktarmak istediğiniz bir şey varsa bize bildirin.
          </Text>
          <TextInput 
            style={styles.input} 
            placeholder="Buraya yazın..." 
            multiline 
            numberOfLines={4}
            value={note}
            onChangeText={setNote}
          />
        </View>
      </ScrollView>

      <View style={styles.fixedRectangle}>
        <TouchableOpacity onPress={decreaseQuantity}>
          <Icon name="remove" size={25} color="red" />
        </TouchableOpacity>
        <Text style={styles.fixedText}>{quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity}>
          <Icon name="add" size={25} color="red" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={addToCart}>
          <Text style={styles.buttonText}>Sepete Kaydet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', 
    padding: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 70,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 15, 
    marginBottom: 20,
    backgroundColor: '#e0e0e0',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333', 
  },
  price: {
    fontSize: 20,
    color: '#28a745', 
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '700', 
  },
  product_explain: {
    fontSize: 16,
    color: 'black',
    marginVertical:10,
    textAlign: 'center',
    fontWeight: '700',
  },
  rectangle: {
    padding: 15,
    backgroundColor: '#ffefd5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15, 
    width: '100%',
    marginBottom: 20,
  },
  sosRectangle: {
    marginTop: 5,
  },
  choice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#dc3545', 
    marginBottom: 8,
  },
  alttitle: {
    fontSize: 14,
    marginBottom: 12,
    marginVertical: 5,
    color: '#666', 
  },
  alttitle2: {
    fontSize: 14,
    marginBottom: 10,
    color: '#666', 
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  optionsColumn: {
    flexDirection: 'column',
    marginTop: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333', 
  },
  productRectangle: {
    padding: 15,
    backgroundColor: '#fff7e6',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15, 
    width: '100%',
    marginBottom: 20,
  },
  note: {
    fontSize: 16,
    fontWeight: '700',
    color: '#dc3545', 
    marginBottom: 8,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
  },
  fixedRectangle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff', 
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, 
  },
  fixedText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#333', 
  },
  button: {
    backgroundColor: '#007bff', 
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: '600',
  },
});
