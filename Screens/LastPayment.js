import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import ProgressBar2 from '../components/ProgressBar2';
import MapView from 'react-native-maps';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ModalDropdown from 'react-native-modal-dropdown';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function LastPayment({ route }) {
  const { cartItems: initialCartItems } = route.params;
  const [currentStep, setCurrentStep] = useState(2);

  const navigation = useNavigation();

  // ödeme seçeneği için 
  const [selectedPayment, setSelectedPayment] = useState('');

  const paymentOptions = ['Nakit', 'Kapıda Temassız Kartla Ödeme', 'Online Kredi Kartı/Banka Kartı'];

  const tabs = [
    { pageNo: 1, title: 'Menü' },
    { pageNo: 2, title: 'Sepetim' },
    { pageNo: 3, title: 'Ödeme' },
  ];

  // burda kredi kartı seçeneği seçilince otomatik olarak bizi sayfaya yönlendirecek
  const handlePaymentSelection = (index, value) => {
    setSelectedPayment(value);

    if (value === 'Online Kredi Kartı/Banka Kartı') {
      navigation.navigate('CardInfoScreen');
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar2
        page={currentStep}
        tabs={tabs}
        progressive={true}
        finishedBackgroundColor="#4CAF50"
        inProgressBackgroundColor="#2196F3"
      />

      <View style={styles.FirstRectangle}>
        <View style={styles.iconAndText}>
          <MaterialIcons name="location-on" size={20} color="red" />
          <Text style={styles.adress}>Teslimat Adresi</Text>
        </View>
        
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 41.0082,
              longitude: 28.9784,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      </View>

      <View style={styles.paymentOptions}>
        <Text style={styles.paymentText}>Ödeme Seçenekleri</Text>
        <ModalDropdown 
          options={paymentOptions}
          defaultValue="Seçiniz"
          onSelect={handlePaymentSelection} 
          style={styles.dropdown} 
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownDropdown}
          dropdownTextStyle={styles.dropdownDropdownText}
          dropdownTextHighlightStyle={styles.dropdownDropdownTextHighlight}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 10,
  },
  adress: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  mapContainer: {
    height: 200,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  FirstRectangle: {
    height: 250,
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffefd5',
    marginBottom: 180,
  },
  paymentOptions: {
    padding: 20,
    backgroundColor: '#ffefd5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
  },
  paymentText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '700'
  },
  dropdown: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '600'
  },
  dropdownDropdown: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
   
  },
  dropdownDropdownText: {
    fontSize: 16,
    padding: 10,
     fontWeight: '800'
  },
  dropdownDropdownTextHighlight: {
    backgroundColor: 'red',
  },
});

