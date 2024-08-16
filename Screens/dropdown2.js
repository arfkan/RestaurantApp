import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const DropdownInTextInput = (props) => {
    const {onChange, pickedValue, items} = props;
  const [isDropdownVisible, setDropdownVisible] = useState(false);


  const [searchText, setSearchText] = useState('');

  


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setDropdownVisible(true)}
      >
        <TextInput
          style={styles.textInput}
          value={pickedValue}
          placeholder="Şehir Seç"
          editable={false}
        />
        <AntDesign name="down" size={20} color="black" />
      </TouchableOpacity>

      {isDropdownVisible && (
        <Modal
          transparent
          animationType="slide"
          visible={isDropdownVisible}
          onRequestClose={() => setDropdownVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchText}
                onChangeText={setSearchText}
              />
              <FlatList
                data={items}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                      onChange(item.label);
                      
                      // handlePickingCity(item.label)
                      setDropdownVisible(false);
                      setSearchText('');
                    }}
                  >
                    <Text style={styles.itemText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 50,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  itemText: {
    fontSize: 16,
  },
});

export default DropdownInTextInput;