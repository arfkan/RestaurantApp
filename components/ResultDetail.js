import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ResultDetail = () => {
  const route = useRoute();
  const {result} = route.params;

  return(
    <View style={styles.container}>
    <View style={styles.imageContainer}>
      {result.image_url ? (
        <Image
          style={styles.image}
          source={{ uri: result.image_url }}
        />
      ) : (
        <Text>No image available</Text>
      )}
    </View>
    <Text style={styles.name}>{result.name}</Text>
    <Text>{result.rating} Yıldızlı Restaurant, {result.review_count} Değerlendirme</Text>
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 10
  },
  name: {
    fontWeight: 'bold',
  }
});

export default ResultDetail;