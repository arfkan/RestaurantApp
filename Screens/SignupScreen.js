import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../firebase';

const { width, height } = Dimensions.get('window');

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    useEffect(() => {
        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                setPasswordsMatch(false);
            } else {
                setPasswordsMatch(true);
            }
        }
    }, [password, confirmPassword]);

    const handleSignup = () => {
        if (!passwordsMatch) {
            alert('Şifreler uyuşmuyor!');
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signup successful
                navigation.navigate('Auth');
            })
            .catch((error) => {
                console.error(error);
                alert('Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.');
            });
    };

    return (
        <ImageBackground source={require('../assets/images/authimages.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.rectangle}>
                    <AntDesign name="addusergroup" size={50} color="black" style={styles.icon} />
                    <TextInput 
                        style={styles.input} 
                        placeholder='E-posta' 
                        value={email} 
                        onChangeText={setEmail} 
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder='Şifre oluştur' 
                        secureTextEntry 
                        value={password} 
                        onChangeText={setPassword} 
                    />
                    <TextInput 
                        style={[styles.input, !passwordsMatch && styles.inputError]} 
                        placeholder='Şifreyi tekrar giriniz' 
                        secureTextEntry 
                        value={confirmPassword} 
                        onChangeText={setConfirmPassword} 
                    />
                    {!passwordsMatch && <Text style={styles.errorText}>Şifreler uyuşmuyor!</Text>}
                    <TouchableOpacity style={styles.button} onPress={handleSignup}>
                        <Text style={styles.buttonText}>Kaydol</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectangle: {
    width: width * 0.8,
    height: height * 0.5,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginBottom: 25, // Move the icon up
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#4169E1',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#4169E1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupText: {
    color: '#4169E1',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
},
inputError: {
  borderColor: 'red',
},

});
