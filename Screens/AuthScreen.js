import { StyleSheet, Text, View, TextInput, Button, Dimensions, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { firebase } from '../firebase';
import axios from "axios";

const { width, height } = Dimensions.get('window');

export default function AuthScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [items, setItems] = useState([]);


    useEffect(() => {
        axios.get("http://192.168.56.1:5001/api/items")
            .then(response => {
                console.log(response.data);
                setItems(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleLogin = () => {
        if (!validateEmail(email)) {
            Alert.alert('Geçersiz E-posta', 'Lütfen geçerli bir e-posta adresi girin.', [{ text: 'Tamam' }], { cancelable: false });
            return;
        }
        if (password.length < 6) {
            Alert.alert('Geçersiz Şifre', 'Şifre en az 6 karakter olmalıdır.', [{ text: 'Tamam' }], { cancelable: false });
            return;
        }

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                navigation.navigate('Main');
            })
            .catch((error) => {
                console.error(error);
                let errorMessage = 'E-posta veya şifre hatalı.';
                switch (error.code) {
                    case 'auth/invalid-email':
                        errorMessage = 'Geçersiz e-posta formatı.';
                        break;
                    case 'auth/user-disabled':
                        errorMessage = 'Bu kullanıcı devre dışı bırakılmış.';
                        break;
                    case 'auth/user-not-found':
                        errorMessage = 'Bu e-posta ile kayıtlı kullanıcı bulunamadı.';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Yanlış şifre. Lütfen tekrar deneyin.';
                        break;
                    case 'auth/invalid-credential':
                        errorMessage = 'Geçersiz kimlik bilgisi. Lütfen tekrar deneyin.';
                        break;
                    default:
                        errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyin.';
                        break;
                }
                Alert.alert('Giriş Hatası', errorMessage, [{ text: 'Tamam' }], { cancelable: false });
            });
    };
   

    return (
        <ImageBackground source={require('../assets/images/loginimage.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.rectangle}>
                    <FontAwesome name="user-circle-o" size={70} color="black" />
                    <Text style={styles.title}>Giriş Yap</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E-posta"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Şifre"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Giriş Yap" onPress={handleLogin} />
                    </View>
                    <View style={styles.signupContainer}>
                        <Text>Henüz üye olmadınız mı? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.signupText}>Kaydol</Text>
                        </TouchableOpacity>
                    </View>

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
        width: width * 0.7,
        height: height * 0.4,
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
        marginTop: height * 0.1,
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
});