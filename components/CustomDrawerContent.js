import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useUser } from '../context/UserContext';

function CustomDrawerContent(props) {

  const {user} = useUser();

  const handleNavigation = (screen) => {
    props.navigation.navigate(screen);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/images/ben.jpg')}
          style={styles.profilePic}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.UserName}>{user ? user.userName : 'Kullanıcı Adı'}</Text>
          <Text style={styles.userEmail}>{user ? user.email : 'E-posta' }</Text>
         
        </View>
      </View>

      <TouchableOpacity onPress={() => handleNavigation('Favori Restaurantlarım')} style={styles.navItem}>
        <View style={styles.iconContainer}>
          <Icon name="star" size={20} color="red" />
        </View>
        <Text style={styles.navText}>Favori Restaurantlarım</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigation('Siparislerim')} style={styles.navItem}>
        <View style={styles.iconContainer}>
          <Icon name="list" size={20} color="blue" />
        </View>
        <Text style={styles.navText}>Siparişlerim</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigation('Adreslerim')} style={styles.navItem}>
        <View style={styles.iconContainer}>
          <Icon name="map-marker" size={20} color="green" />
        </View>
        <Text style={styles.navText}>Adreslerim</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigation('Admin Paneli')} style={styles.navItem}>
        <View style={styles.iconContainer}>
          <Icon name="cogs" size={20} color="purple" />
        </View>
        <Text style={styles.navText}>Admin Paneli</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert('Çıkış yapıldı!')} style={styles.navItem}>
        <View style={styles.iconContainer}>
          <Icon name="sign-out" size={20} color="orange" />
        </View>
        <Text style={styles.navText}>Çıkış</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 30,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 16,
  },
});

export default CustomDrawerContent;