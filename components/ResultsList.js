import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ResultsList = ({ title, results, renderItem }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={results}
        keyExtractor={(result) => result._id.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  );
};

export default ResultsList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5,
  }
});
