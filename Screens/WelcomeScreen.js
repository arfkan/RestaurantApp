import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';

export default function WelcomeScreen({ navigation }) {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Auth');
    }, 5000); // 5 saniye sonra otomatik olarak AuthScreen sayfasına yönlendirme

    return () => clearTimeout(timer); // Timer'ı temizle
  }, [navigation]);

  return (
    <ImageBackground 
      source={require('../assets/images/ilkfoto.jpg')} 
      style={styles.backgroundImage}  
      resizeMode="cover"
    >
     
      {showAnimation && (
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/animations/Animation - 1724317382005.json')} 
            autoPlay
            loop={false}
            style={styles.animation}
          />
        </View>
      )}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {
    width: 150, 
    height: 150, 
    backgroundColor: 'transparent', // Arka planı şeffaf yapar
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF4500',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 50,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  animationContainer: {
    position: 'absolute',
    bottom: 300,
    width: '100%',
    alignItems: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  }
});
