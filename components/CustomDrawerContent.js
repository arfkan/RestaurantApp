import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerContentScrollView } from '@react-navigation/drawer';

function CustomDrawerContent(props) {
  const handleNavigation = (screen) => {
    props.navigation.navigate(screen);
  };

  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={() => handleNavigation('Favori Restaurantlarım')} style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <Icon name="star" size={20} color="red" />
        <Text style={{ marginLeft: 8 }}>Favori Restaurantlarım</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Siparişlerim')} style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <Icon name="list" size={20} color="blue" />
        <Text style={{ marginLeft: 8 }}>Siparişlerim</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Adreslerim')} style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <Icon name="map-marker" size={20} color="green" />
        <Text style={{ marginLeft: 8 }}>Adreslerim</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Admin Paneli')} style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <Icon name="cogs" size={20} color="purple" />
        <Text style={{ marginLeft: 8 }}>Admin Paneli</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert('Çıkış yapıldı!')} style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <Icon name="sign-out" size={20} color="orange" />
        <Text style={{ marginLeft: 8 }}>Çıkış</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
