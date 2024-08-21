import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Platform, ScrollView, ActivityIndicator, Modal } from 'react-native';
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
  const [isCommentPanelVisible, setIsCommentPanelVisible] = useState(false);
  const [comments, setComments] = useState([]);

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
      const response = await axios.get(`${BASE_URL}/comments`);
      if (response.status !== 200) {
        throw new Error('Yorumları getirirken bir sorun oluştu');
      }
      setComments(response.data);
    } catch (error) {
      console.error('Yorumları getirirken hata oluştu:', error.message);
      alert('Yorumları getirirken bir sorun oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsCommentPanelVisible(true);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation, cartItems]);

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
      setError(error.response ? 'API Hatası' : 'Ağ Hatası');
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
    <>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        numColumns={2}
        ListHeaderComponent={
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>{sonuc.name}</Text>
              <View style={styles.heart}>
                <TouchableOpacity onPress={toggleFavorite}>
                  <AntDesign name={isFavorite ? "heart" : "hearto"} size={27} color="red" />
                </TouchableOpacity>
              </View>
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
                <Text style={styles.infoText}>Menü</Text>
              </View>
            </View>
            <ScrollView horizontal style={styles.photosContainer}>
              {photos.map((photo, index) => (
                <Image key={index} style={styles.image} source={{ uri: photo }} />
              ))}
            </ScrollView>
          </View>
        }
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
                    product_explain: item.product_explain, // burda ürünün açıklamasını back endden getirdik.
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
                onPress={() => addToCart(item)}
              />
            </View>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </View>
        )}
      />

      <CommentsPanel
        visible={isCommentPanelVisible}
        onClose={() => setIsCommentPanelVisible(false)}
        comments={comments}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f4f4f4',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'grey',
    marginTop: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  headerText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#ffffff',
  },
  infoContainer: {
    marginVertical: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 10,  
  fontSize: 14,    
  color: '#333',   
  fontWeight: '700', 
  lineHeight: 28,  
  letterSpacing: 1, 
  fontFamily: 'Arial, sans-serif', 
  },
  productList: {
    marginTop: 25,
  },
  productListHeader: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#2c2c2c',
  },
  productItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 25,
    marginHorizontal: 12,
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
  },
  imageContainer: {
    position: 'relative',
    width: 160,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  icon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 5,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  productName: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  productPrice: {
    marginTop: 6,
    fontSize: 15,
    color: '#777',
  },
  comment: {
    marginLeft: 100,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#1e1e1e',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 12,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff5a5f',
  },
  commentItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 12,
    color: '#444',
  },
  heart: {
    marginRight: 10,
    color: '#ff5a5f',
  }
  
});