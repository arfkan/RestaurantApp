import { StyleSheet, Text, View, TextInput, Button, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function AuthScreen({ navigation }) {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <ImageBackground source={require('../assets/images/loginimage.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.rectangle}>
                <FontAwesome name="user-circle-o" size={70} color="black" />
                    <Text style={styles.title}>{isLogin ? 'Giriş Yap' : 'Kayıt ol'}</Text>
                    <TextInput style={styles.input} placeholder='Kullanıcı Adı' />
                    <TextInput style={styles.input} placeholder='Şifre' secureTextEntry />
                    <View style={styles.buttonContainer}>
                        <Button
                            title={isLogin ? 'Giriş yap' : 'Kayıt ol'}
                            onPress={() => {
                                navigation.navigate('Main') // burda main dediğimiz yer SearchScreen.js tıklandığında oraya bağlanıyoruz.
                            }}
                        />
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
        marginTop: 50, 
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
