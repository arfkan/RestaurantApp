import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ProductResult({ route }) {
  const { id, name, image, price } = route.params;

  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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

        <View style={[styles.rectangle, styles.sosRectangle]}>
          <Text style={styles.choice}>Sos Tercihleri</Text>
          <Text style={styles.alttitle}>Birini seç</Text>
          
          <View style={styles.optionsColumn}>
            <View style={styles.option}>
              <Icon name="circle" size={20} color="white" />
              <Text style={styles.optionText}>Sos 1</Text>
            </View>
            <View style={styles.option}>
              <Icon name="circle" size={20} color="white" />
              <Text style={styles.optionText}>Sos 2</Text>
            </View>
            <View style={styles.option}>
              <Icon name="circle" size={20} color="white" />
              <Text style={styles.optionText}>Sos 3</Text>
            </View>
            <View style={styles.option}>
              <Icon name="circle" size={20} color="white" />
              <Text style={styles.optionText}>Sos 4</Text>
            </View>
          </View>
        </View>

        <View style={[styles.rectangle, styles.sosRectangle]}>
          <Text style={styles.choice}>İçecek Seçenekleri</Text>
          <Text style={styles.alttitle}>Birini seç</Text>
          
          <View style={styles.optionsColumn}>
            <View style={styles.option}>
              <Icon name="circle" size={20} color="white" />
              <Text style={styles.optionText}>Coco-cola(1L)</Text>
            </View>
            <View style={styles.option}>
              <Icon name="circle" size={20} color="white" />
              <Text style={styles.optionText}>Coco-cola Light(1L)</Text>
            </View>
            <View style={styles.option}>
              <Icon name="circle" size={20} color="white" />
              <Text style={styles.optionText}>Coco-cola Şekersiz(1L)</Text>
            </View>
            <View style={styles.option}>
              <Icon name="circle" size={20} color="white" />
              <Text style={styles.optionText}>Sprite (1L)</Text>
            </View>
            <View style={styles.option}>
              <Icon name="circle" size={20} color="white" />
              <Text style={styles.optionText}>Fanta (1L)</Text>
            </View>
          </View>
        </View>

        <View style={styles.productRectangle}>
          <Text style={styles.note}>Ürün Notu</Text>
          <Text style={styles.alttitle2}>Alerjiniz ya da ürünle ilgili bize aktarmak istediğiniz bir şey varsa bize bildirin.</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Buraya yazın..." 
            multiline 
            numberOfLines={4}
          />
        </View>
      </ScrollView>

      {/* Sabit Altta Yer Alan Rectangle */}
      <View style={styles.fixedRectangle}>
        <Icon name="remove" size={25} color="red" />
        <Text style={styles.fixedText}>1</Text>
        <Icon name="add" size={25} color="red" />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sepete Ekle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
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
    marginBottom: 20,
  },
  sosRectangle: {
    marginTop: 5,
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
  alttitle2: {
    fontSize: 14,
    marginBottom: 10,
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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'black',
  },
  productRectangle: {
    padding: 15,
    backgroundColor: '#fff7e6',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  note: {
    fontSize: 16,
    fontWeight: '700',
    color: 'red',
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
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  fixedText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10, 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
