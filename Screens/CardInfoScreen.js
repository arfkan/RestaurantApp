import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import LottieView from 'lottie-react-native';

export default function CardInfoScreen() {
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const [showAnimation, setShowAnimation] = useState(false);

  // Kart numarasını 4-4-4-4 formatında biçimlendirmek için 
  const formatCardNumber = (number) => {
    return number
      .replace(/\s+/g, '') 
      .replace(/(\d{4})(?=\d)/g, '$1 '); // Her 4 rakamdan sonra bir boşluk ekliyoruz.
  };

  const validateCardNumber = (number) => {
    const re = /^(\d{4} \d{4} \d{4} \d{4})$/;
    return re.test(number);
  };

  // Kart numarasını kontrol eder ve doğrular
  const handleCardNumber = () => {
    const formattedCardNumber = formatCardNumber(cardNumber);

    if (!validateCardNumber(formattedCardNumber)) {
      Alert.alert('Geçersiz kart numarası', 'Kart numarası 16 rakam ve 3 boşluk içermelidir.', [{ text: 'Tamam' }], { cancelable: false });
      return;
    }
    if (formattedCardNumber.replace(/\s+/g, '').length !== 16) {
      Alert.alert('Geçersiz kart numarası', 'Kart numarası 16 rakam olmalıdır.', [{ text: 'Tamam' }], { cancelable: false });
      return;
    }

    //Alert.alert('Başarılı!', 'Alışveriş başarılı bir şekilde gerçekleşti.', [{ text: 'Tamam' }]);

    // Animasyon 
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 3000);
    
    
  };

   // Ay/Yıl formatını otomatik olarak düzenleyen fonksiyon
   const formatExpiryDate = (text) => {
    // Sayı olmayan karakterleri kaldır
    const cleaned = text.replace(/[^0-9]/g, '');
    
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    
    return formatted;
  };

 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kart Bilgileri</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Kart Sahibinin Adı"
        value={cardHolderName}
        onChangeText={setCardHolderName}
        placeholderTextColor="#888"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Kart Numarası"
        value={cardNumber}
        onChangeText={(text) => setCardNumber(formatCardNumber(text))}
        keyboardType="numeric"
        placeholderTextColor="#888"
        maxLength={19} // Formatlı kart numarası için maxLength
      />
      
      <View style={styles.rowContainer}>
        <TextInput
          style={styles.inputHalf}
          placeholder="Ay/Yıl"
          value={expiryDate}
          onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
          keyboardType="numeric"
          placeholderTextColor="#888"
          maxLength={5} // Ay/Yıl formatında giriş için
        />
        <TextInput
          style={styles.inputHalf}
          placeholder="CVV"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
          placeholderTextColor="#888"
          // secureTextEntry
          maxLength={3} // CVV numarasının 3 karakterle sınırlı olması için
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCardNumber}>
        <Text style={styles.buttonText}>Tamam</Text>
      </TouchableOpacity>

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
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#2c2f38',  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6b6b',  
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',  
    letterSpacing: 1.5,  
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ff6b6b', 
    borderWidth: 2,
    borderRadius: 10,  
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    elevation: 2,  
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 5,  
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputHalf: {
    width: '48%',
    height: 50,
    borderColor: '#ff6b6b',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  button: {
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
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
