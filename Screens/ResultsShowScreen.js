import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Platform, ScrollView, ActivityIndicator, Animated, Modal } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';


const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5000/api/'
  : 'http://localhost:5000/api/';

export default function ResultsShowScreen({ route }) {
  const [sonuc, setSonuc] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { cartItems, addToCart } = useCart();
  const { id } = route.params;
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();


  const [quantity, setQuantity] = useState(1);
  const [counter, setCounter] = useState(0);
  const [animatedValue] = useState(new Animated.Value(0));

  // yorumlar kısmı için 
  const [isCommentPanelVisible, setIsCommentPanelVisible] = useState(false); // yorum panelinin görünürlüğünü kontrol etmek için
  const [comments, setComments] = useState([]); // bu state yorumları tutmak için 

 
    const CommentsPanel = ({ visible, onClose, comments }) => (
      <Modal
        transparent={true}
        visible={visible}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <FlatList
              data={comments}
              renderItem={({ item }) => (
                <View style={styles.commentItem}>
                  <Text>{item.text}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </Modal>
    );

    const handleShowComments = async () => {
      try {
          // API'den yorumları çek
          const response = await axios.get(`${BASE_URL}/comments`);
  
          if (response.status !== 200) { 
              throw new Error('Yorumları getirirken bir sorun oluştu');
          }
  
          const commentsData = response.data;
 
          setComments(commentsData);
  
      } catch (error) {
          console.error('Yorumları getirirken hata oluştu:', error.message);

          alert('Yorumları getirirken bir sorun oluştu. Lütfen tekrar deneyin.');

          const sampleComments = [
              { id: 1, text: "Harika bir restoran!" },
              { id: 2, text: "Yemekler lezzetliydi." },
              { id: 3, text: "Servis biraz yavaştı." },
          ];
          setComments(sampleComments);
      } finally {
          // Yorum panelini her durumda göster
          setIsCommentPanelVisible(true);
      }
  };
  
  const animateIcon = () => {
    animatedValue.setValue(0);
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const iconTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0],
  });

  const iconTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0],
  });


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.cartContainer}>
          <Animated.View
            style={[
              styles.cartIconContainer,
              {
                transform: [
                  { translateX: iconTranslateX },
                  { translateY: iconTranslateY }
                ]
              }
            ]}
          >
            <Icon
              name="shopping-cart"
              size={30}
              color="red"
              onPress={() => {
                navigation.navigate('Siparislerim', { cartItems });
              }}
            />
            {cartItems.length > 0 && (
              <View style={styles.counterContainer}>
                <Text style={styles.counterText}>{cartItems.length}</Text>
              </View>
            )}
          </Animated.View>
        </View>
      ),
    });
  }, [navigation, iconTranslateX, iconTranslateY, cartItems]);

  const getSonuc = async () => {
    if (!id) {
      console.error("Geçersiz ID");
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}restaurants/${id}`);
      setSonuc(response.data);
    } catch (error) {
      console.error('Hata:', error);
      if (error.response) {
        setError('API Hatası');
      } else {
        setError('Ağ Hatası');
      }
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}products`);
      setProducts(response.data);
    } catch (error) {
      setError('Ürünleri alırken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    getSonuc();
  }, [id]);

  useEffect(() => {
    if (sonuc) {
      setIsFavorite(favorites.some(fav => fav.id === sonuc.id));
    }
  }, [favorites, sonuc]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`${BASE_URL}favorites/${sonuc.id}`);
        removeFavorite(sonuc.id);
      } else {
        const response = await axios.post(`${BASE_URL}favorites`, {
          userId: '45TPJloYrCSCnSg1XktWjdEpLAO2',
          restaurant: {
            id: sonuc.id,
            name: sonuc.name,
            image_url: sonuc.image_url
          }
        });
        addFavorite(response.data);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Favori işlemi sırasında hata:', error.message);
      alert('Favori işlemi sırasında bir hata oluştu.');
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>{error}</Text>;

  if (!sonuc) {
    return <Text>Loading...</Text>;
  }

  const photos = [sonuc.image_url, ...(sonuc.photos || [])];


  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{sonuc.name}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <AntDesign name={isFavorite ? "heart" : "hearto"} size={24} color="red" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Icon name="phone" size={20} color="red" />
          <Text style={styles.infoText}>Telefon: {sonuc.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="star" size={20} color="red" />
          <Text style={styles.infoText}>Puan: {sonuc.rating}</Text>
        </View>
        <View style={styles.infoRow}>
         <Icon name="comment" size={20} color="red" />
         <Text style={styles.infoText}>Yorum Sayısı: {sonuc.review_count}</Text>
        <TouchableOpacity onPress={handleShowComments}>
        <Text style={styles.comment}>Yorumları Gör</Text>
        </TouchableOpacity>
        <Icon name="comment" size={20} color="red" />
        </View>
        <View style={styles.infoRow}>
          <Icon name="location-on" size={20} color="red" />
          <Text style={styles.infoText}>Adres: {sonuc.location.display_address.join(', ')}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="menu" size={20} color="red" />
          <Text style={styles.infoText}>Menü: {sonuc.attributes.menu_url}</Text>
        </View>
      </View>

      <ScrollView horizontal style={styles.photosContainer}>
        {photos.map((photo, index) => (
          <Image key={index} style={styles.image} source={{ uri: photo }} />
        ))}
      </ScrollView>

      <View style={styles.productList}>
        <Text style={styles.productListHeader}>Ürünler:</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ProductResult', {
                      id: item._id,
                      name: item.name,
                      image: item.image,
                      price: item.price,
                    });
                  }}
                >
                  <Image source={{ uri: item.image }} style={styles.productImage} />
                </TouchableOpacity>
                <Icon
                  name="add"
                  size={30}
                  color="red"
                  style={styles.icon}
                  onPress={() => increaseQuantity(item)}
                />
              </View>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
          )}
        />
      </View>
       
    <CommentsPanel
      visible={isCommentPanelVisible}
      onClose={() => setIsCommentPanelVisible(false)}
      comments={comments}
    />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333', 
    fontWeight: '600', 
    lineHeight: 24, 
    letterSpacing: 0.5, 
    textTransform: 'capitalize', 
  },
  

  productList: {
    marginTop: 20,
  },
  productListHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
    flex: 1,
  },
  imageContainer: {
    position: 'relative', 
    width: 150,
    height: 150,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  icon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  productName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  comment: {
    marginLeft: 100,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  commentItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
});