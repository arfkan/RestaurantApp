import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProgressBar from '../components/ProgressBar';

export default function LastPayment({ route }) {
  const { cartItems: initialCartItems } = route.params;
  const [currentStep, setCurrentStep] = useState(2); // Assuming LastPayment is the 2nd step

  const tabs = [
    { pageNo: 1, title: 'Menü' },
    { pageNo: 2, title: 'Sepetim' },
    { pageNo: 3, title: 'Ödeme' },
  ];

  return (
    <View style={styles.container}>
      <ProgressBar
        page={currentStep}
        tabs={tabs}
        progressive={true}
        finishedBackgroundColor="#4CAF50"
        inProgressBackgroundColor="#2196F3"
      />
      <View style={styles.firstRectangle}>
        <View style={styles.textContainer}>
          <Text style={styles.writing}>Tahmini Teslimat</Text>
          <Text style={styles.time}>Standart (10-25 dk.)</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
      },
      textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
      },
      writing: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      time: {
        fontSize: 14,
        color: 'grey',
      },
     
})