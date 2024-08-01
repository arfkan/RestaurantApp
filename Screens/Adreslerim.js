// Screens/Adreslerim.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function Adreslerim({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text></Text>
      </View>
      <View style={styles.footer}>
        <Button
          title="Yeni Adres Ekle"
          onPress={() => navigation.navigate('Map')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default Adreslerim;
