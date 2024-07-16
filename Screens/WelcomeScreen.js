import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React, { useEffect } from 'react';

export default function WelcomeScreen({navigation}) {

  useEffect(()=>{
    const timer = setTimeout(()=>{
      navigation.navigate('Auth');
    }, 5000); // 5 saniye sonra otomatik olarak AuthScreen sayfasına yönlendirme

    return () => clearTimeout(timer); // Timer'ı temizle
  }, [navigation]);

  return (  // Resim, container'ın (bu durumda ekranın) tamamını kaplayacak şekilde büyütülür veya küçültülür.( resizeMode="cover")
    <ImageBackground source={require('../assets/images/ilkfoto.jpg')} style={styles.backgroundImage}  resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to RestaurantApp</Text>
        <Image
          source={require('../assets/gifes/cutlery.gif') }
          style={styles.gif} resizeMode="contain"
        />
      </View>
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
    width: 100, 
    height: 100, 
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
    marginBottom: 100,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
