import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SpeedDialAction = ({ icon, name, onPress, style }) => (
  <TouchableOpacity style={[styles.actionButton, style]} onPress={onPress}>
    <Text style={styles.actionText}>{name}</Text>
  </TouchableOpacity>
);

const SpeedDial = ({ actions, onOpen, onClose }) => {
  const [open, setOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) {
      onOpen && onOpen();
    } else {
      onClose && onClose();
    }
  }, [open, onOpen, onClose]);

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-45deg'], 
        }),
      },
    ],
  };
  const reverseRotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['-45deg', '0deg'], 
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleMenu}
        activeOpacity={0.8}
      >
        <Animated.View style={open ? rotation : reverseRotation}>
          <Icon name="filter-list" size={24} color="#fff"  />
        </Animated.View>
      </TouchableOpacity>
      <View style={styles.actionContainer}>
        {actions.map((action, index) => {
          const translateX = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 50 * (index + 1)], 
          });

          const opacity = animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1],
          });

          return (
            <Animated.View
              key={action.name}
              style={[
                styles.actionWrapper,
                { transform: [{ translateX }], opacity }
              ]}
            >
              
              <SpeedDialAction
                name={action.name}
                onPress={() => {
                  action.onPress();
                  setOpen(false); // set(!open)
                  toggleMenu();
                }}
              />
            </Animated.View>
            // yukarıda SpeedDialAc
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff6347',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 330,
    zIndex: 1001,
  },
  actionContainer: {
    position: 'absolute',
    top: 70,
    alignItems: 'center',
    width: '100%',
  },
  actionWrapper: {
    marginBottom: 10,
    width: '100%',
  },
  actionButton: {
    width: '50%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff6347',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SpeedDial;