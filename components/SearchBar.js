import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

const SearchBar = ({term, onTermSubmit, onTermChange }) => {
    // const [term, setTerm] = useState('');
    
    const handleTermChange = (newTerm) => {
        // setTerm(newTerm);
        if (onTermChange && typeof onTermChange === 'function') {
            onTermChange(newTerm);
        }
    };
    // onTermChange: Kullanıcı her harf yazdığında veya sildiğinde tetiklenir. Yani, arama çubuğundaki her değişiklikte çağrılır.
    // onTermSubmit: Genellikle kullanıcı arama işlemini tamamladığında tetiklenir. Bu, kullanıcının Enter tuşuna basması veya bir "Ara" butonuna tıklaması gibi durumlarda olabilir.

    const handleTermSubmit = () => { // kullanıcı metin girdikçe çağrılır.
        if (onTermSubmit && typeof onTermSubmit === 'function') {
            onTermSubmit(term);
        }
    };

    return (
        <View style={styles.background}>
            <TextInput
                style={styles.inputStyle}
                value={term}
                onChangeText={handleTermChange}
                onEndEditing={handleTermSubmit} // onEndEditing kullanıcı metin girişini tamamladığında çağrılır.
                placeholder="Search..."
            />
            <TouchableOpacity style={styles.button} onPress={handleTermSubmit}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'grey',
        height: 50,
        borderRadius: 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    inputStyle: {
        flex: 1,
        fontSize: 18,
    },
    buttonText: {
        color: 'white', 
        fontSize: 14, 
    },
    button: {
        backgroundColor: 'green', 
        paddingVertical: 8, 
        paddingHorizontal: 16, 
        borderRadius: 8, 
        marginLeft: 10,
    },
});

export default SearchBar;