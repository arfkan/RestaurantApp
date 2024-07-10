import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Favori Restaurantlarım"
        onPress={() => props.navigation.navigate('Favori Restaurantlarım')}
      />
      <DrawerItem
        label="Siparişlerim"
        onPress={() => props.navigation.navigate('Siparişlerim')}
      />
      <DrawerItem
        label="Adreslerim"
        onPress={() => props.navigation.navigate('Adreslerim')}
      />
      <DrawerItem
        label="Çıkış"
        onPress={() => alert('Çıkış yapıldı!')}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;