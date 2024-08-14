import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const PaymentScreen = () => {
  // line için animasyon değeri 
  const lineAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Bileşen takıldığında animasyonu başlat 
    Animated.timing(lineAnimation, {
      toValue: 1,
      duration: 1000, 
      useNativeDriver: false,
    }).start();
  }, [lineAnimation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sepetim</Text>
      <View style={styles.progressContainer}>
        <View style={styles.stepContainer}>
          <View style={styles.circleCompleted}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <Text style={styles.stepTitle}>Menü</Text>
        </View>
        
        {/* Animated Line */}
        <Animated.View
          style={[
            styles.line,
            {
              width: lineAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 80],
              }),
            },
          ]}
        />
        
        <View style={styles.stepContainer}>
          <View style={styles.circleInProgress}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <Text style={styles.stepTitle}>Sepetim</Text>
        </View>

        <View
          style={[
            styles.line,
            {
              width: 80, 
            },
          ]}
        />

        <View style={styles.stepContainer}>
          <View style={styles.circleOutProgress}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <Text style={styles.stepTitle}>Ödeme</Text>
        </View>
      </View>
    </View>
  );
};



export default PaymentScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  stepContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleCompleted: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInProgress: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleOutProgress: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  stepTitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  line: {
    height: 3,
    backgroundColor: 'green',
    marginHorizontal: 10,
  },
});
