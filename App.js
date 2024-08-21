import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SearchScreen from './Screens/SearchScreen';
import ResultsShowScreen from './Screens/ResultsShowScreen';
import FavoriRestaurantlarim from './Screens/FavoriRestaurantlarim';
import Siparislerim from './Screens/Siparislerim';
import Adreslerim from './Screens/Adreslerim';
import CustomDrawerContent from './components/CustomDrawerContent';
import { FavoritesProvider } from './context/FavoritesContext';
import WelcomeScreen from './Screens/WelcomeScreen';
import AuthScreen from './Screens/AuthScreen';
import SignupScreen from './Screens/SignupScreen';
import MapScreen from './Screens/MapScreen';
import AdminScreen from './Screens/Admin';
import ProductResult from './Screens/ProductResult';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CartProvider, useCart } from './context/CartContext';
import Payment from './Screens/Payment';
import LastPayment from './Screens/LastPayment';
import CardInfoScreen from './Screens/CardInfoScreen';
import Adreslerim2 from './Screens/Adreslerim2';
import { UserProvider } from './context/UserContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ResultsShow" 
        component={ResultsShowScreen}  
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ProductResult" 
        component={ProductResult} 
      />
      <Stack.Screen 
        name="Siparislerim" 
        component={Siparislerim} 
      />
      <Stack.Screen 
        name="ResultsShowScreen" 
        component={ResultsShowScreen} 
      />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  const { cartItems } = useCart();
  
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}  
      screenOptions={{
        headerStyle: { backgroundColor: 'crimson' },
        headerTintColor: 'white',
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={MainStackNavigator}  // Reference the MainStackNavigator here
        options={({ navigation }) => ({
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
              <Icon 
                name="shopping-cart" 
                size={24} 
                color="white" 
                onPress={() => navigation.navigate('Siparislerim')}
              />
              {cartItems.length > 0 && (
                <View style={styles.counterContainer}>
                  <Text style={styles.counterText}>{cartItems.length}</Text>
                </View>
              )}
            </View>
          ),
        })}
      />
      <Drawer.Screen name="Favori Restaurantlarım" component={FavoriRestaurantlarim} />
      <Drawer.Screen name="Adreslerim" component={Adreslerim2} />
      <Drawer.Screen name="Admin Paneli" component={AdminScreen} />
      <Drawer.Screen name="Map" component={MapScreen} />
      <Drawer.Screen name="Siparislerim" component={Siparislerim} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider> 
      <FavoritesProvider>
        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
              <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
              <Stack.Screen name="MainPage" component={DrawerNavigator} options={{ headerShown: false }} />     
              <Stack.Screen name="Payment" component={Payment} />
              <Stack.Screen name="LastPayment" component={LastPayment} />
              <Stack.Screen name="CardInfoScreen" component={CardInfoScreen} />
              <Stack.Screen name="Siparislerim" component={Siparislerim} />
              <Stack.Screen name="SearchScreen" component={SearchScreen}/>
            </Stack.Navigator>
            <StatusBar style="auto" />
          </NavigationContainer>
        </CartProvider>
      </FavoritesProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  counterContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    color: 'black',
    fontSize: 14,
  },
});
