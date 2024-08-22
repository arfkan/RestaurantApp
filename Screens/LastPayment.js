import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import ProgressBar2 from '../components/ProgressBar2';
import MapView from 'react-native-maps';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ModalDropdown from 'react-native-modal-dropdown';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import LottieView from 'lottie-react-native'; // Lottie animasyonu için gerekli import

const { width, height } = Dimensions.get('window');

export default function LastPayment({ route }) {
  const { cartItems: initialCartItems } = route.params;
  const [currentStep, setCurrentStep] = useState(2);

  const [showAnimation, setShowAnimation] = useState(false);

  const navigation = useNavigation();
  const { clearCart } = useCart(); // ödeme işleminden sonra clear ile sepet sıfırlanmakta.

  // ödeme seçeneği için 
  const [selectedPayment, setSelectedPayment] = useState('');

  const paymentOptions = ['Nakit', 'Kapıda Temassız Kartla Ödeme', 'Online Kredi Kartı/Banka Kartı'];

  const tabs = [
    { pageNo: 1, title: 'Menü' },
    { pageNo: 2, title: 'Sepetim' },
    { pageNo: 3, title: 'Ödeme' },
  ];

  // Kredi kartı seçeneği seçilince otomatik olarak bizi sayfaya yönlendirecek
  const handlePaymentSelection = (index, value) => {
    setSelectedPayment(value);

    if (value === 'Online Kredi Kartı/Banka Kartı') {
      navigation.navigate('CardInfoScreen');
    } else if (value === 'Nakit' || value === 'Kapıda Temassız Kartla Ödeme') {
      setShowAnimation(true);

      setTimeout(() => {
        setShowAnimation(false);
        clearCart();
        navigation.navigate('SearchScreen'); // SearchScreen'e yönlendirme
      }, 3000); // 3000ms animasyon süresi
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

      {showAnimation && (
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/animations/delivery-boy (1).json')} 
            autoPlay
            loop={false}
            style={styles.animation}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', 
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
    color: '#d32f2f', 
  },
  mapContainer: {
    height: 200,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#fff', 
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
    backgroundColor: '#ffebee', 
    marginBottom: 180,
  },
  paymentOptions: {
    padding: 20,
    backgroundColor: '#ffebee', 
    borderColor: '#d32f2f',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
  },
  paymentText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '700',
    color: '#d32f2f', 
  },
  dropdown: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d32f2f', 
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff', 
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#d32f2f', 
  },
  dropdownDropdown: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d32f2f', 
    borderRadius: 5,
    backgroundColor: '#fff', 
  },
  dropdownDropdownText: {
    fontSize: 16,
    padding: 10,
    fontWeight: '800',
    color: '#d32f2f',
  },
  dropdownDropdownTextHighlight: {
    backgroundColor: '#ffcdd2', 
  },
  animationContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -75 }],
    width: 150,
    height: 150,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  animation: {
    width: 300,
    height: 600,
  },
});
