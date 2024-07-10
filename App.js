import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './Screens/SearchScreen';
import ResultsShowScreen from './Screens/ResultsShowScreen';
import FavoriRestaurantlarim from './Screens/FavoriRestaurantlarim';
import Siparislerim from './Screens/Siparislerim';
import Adreslerim from './Screens/Adreslerim';
import LoginScreen from './Screens/LoginScreen'; 
import CustomDrawerContent from './components/CustomDrawerContent';
import { FavoritesProvider } from './context/FavoritesContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: 'Restaurant Uygulaması',
        headerStyle: { backgroundColor: 'blue' },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="ResultsShow" component={ResultsShowScreen} />
    </Stack.Navigator>
  );
}

function SearchWithTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerStyle: { backgroundColor: 'blue' },
            headerTintColor: 'white',
          }}
        >
          <Drawer.Screen name="Home" component={MainStackNavigator} />
          <Drawer.Screen name="Favori Restaurantlarım" component={FavoriRestaurantlarim} />
          <Drawer.Screen name="Siparişlerim" component={Siparislerim} />
          <Drawer.Screen name="Adreslerim" component={Adreslerim} />
          <Drawer.Screen name="Search" component={SearchWithTabNavigator} />
        </Drawer.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </FavoritesProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
