import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';


const data = [
    { label: 'ADANA', value: 'ADANA' },
    { label: 'ADIYAMAN', value: 'ADIYAMAN' },
    { label: 'AFYONKARAHİSAR', value: 'AFYONKARAHİSAR' },
    { label: 'AĞRI', value: 'AĞRI' },
    { label: 'AMASYA', value: 'AMASYA' },
    { label: 'ANKARA', value: 'ANKARA' },
    { label: 'ANTALYA', value: 'ANTALYA' },
    { label: 'ARTVİN', value: 'ARTVİN' },
    { label: 'AYDIN', value: 'AYDIN' },
    { label: 'BALIKESİR', value: 'BALIKESİR' },
    { label: 'BİLECİK', value: 'BİLECİK' },
    { label: 'BİNGÖL', value: 'BİNGÖL' },
    { label: 'BİTLİS', value: 'BİTLİS' },
    { label: 'BOLU', value: 'BOLU' },
    { label: 'BURDUR', value: 'BURDUR' },
    { label: 'BURSA', value: 'BURSA' },
    { label: 'ÇANAKKALE', value: 'ÇANAKKALE' },
    { label: 'ÇANKIRI', value: 'ÇANKIRI' },
    { label: 'ÇORUM', value: 'ÇORUM' },
    { label: 'DENİZLİ', value: 'DENİZLİ' },
    { label: 'DİYARBAKIR', value: 'DİYARBAKIR' },
    { label: 'EDİRNE', value: 'EDİRNE' },
    { label: 'ELAZIĞ', value: 'ELAZIĞ' },
    { label: 'ERZİNCAN', value: 'ERZİNCAN' },
    { label: 'ERZURUM', value: 'ERZURUM' },
    { label: 'ESKİŞEHİR', value: 'ESKİŞEHİR' },
    { label: 'GAZİANTEP', value: 'GAZİANTEP' },
    { label: 'GİRESUN', value: 'GİRESUN' },
    { label: 'GÜMÜŞHANE', value: 'GÜMÜŞHANE' },
    { label: 'HAKKARİ', value: 'HAKKARİ' },
    { label: 'HATAY', value: 'HATAY' },
    { label: 'ISPARTA', value: 'ISPARTA' },
    { label: 'MERSİN', value: 'MERSİN' },
    { label: 'İSTANBUL', value: 'İSTANBUL' },
    { label: 'İZMİR', value: 'İZMİR' },
    { label: 'KARS', value: 'KARS' },
    { label: 'KASTAMONU', value: 'KASTAMONU' },
    { label: 'KAYSERİ', value: 'KAYSERİ' },
    { label: 'KIRKLARELİ', value: 'KIRKLARELİ' },
    { label: 'KIRŞEHİR', value: 'KIRŞEHİR' },
    { label: 'KOCAELİ', value: 'KOCAELİ' },
    { label: 'KONYA', value: 'KONYA' },
    { label: 'KÜTAHYA', value: 'KÜTAHYA' },
    { label: 'MALATYA', value: 'MALATYA' },
    { label: 'MANİSA', value: 'MANİSA' },
    { label: 'KAHRAMANMARAŞ', value: 'KAHRAMANMARAŞ' },
    { label: 'MARDİN', value: 'MARDİN' },
    { label: 'MUĞLA', value: 'MUĞLA' },
    { label: 'MUŞ', value: 'MUŞ' },
    { label: 'NEVŞEHİR', value: 'NEVŞEHİR' },
    { label: 'NİĞDE', value: 'NİĞDE' },
    { label: 'ORDU', value: 'ORDU' },
    { label: 'RİZE', value: 'RİZE' },
    { label: 'SAKARYA', value: 'SAKARYA' },
    { label: 'SAMSUN', value: 'SAMSUN' },
    { label: 'SİİRT', value: 'SİİRT' },
    { label: 'SİNOP', value: 'SİNOP' },
    { label: 'SİVAS', value: 'SİVAS' },
    { label: 'TEKİRDAĞ', value: 'TEKİRDAĞ' },
    { label: 'TOKAT', value: 'TOKAT' },
    { label: 'TRABZON', value: 'TRABZON' },
    { label: 'TUNCELİ', value: 'TUNCELİ' },
    { label: 'ŞANLIURFA', value: 'ŞANLIURFA' },
    { label: 'UŞAK', value: 'UŞAK' },
    { label: 'VAN', value: 'VAN' },
    { label: 'YOZGAT', value: 'YOZGAT' },
    { label: 'ZONGULDAK', value: 'ZONGULDAK' },
    { label: 'AKSARAY', value: 'AKSARAY' },
    { label: 'BAYBURT', value: 'BAYBURT' },
    { label: 'KARAMAN', value: 'KARAMAN' },
    { label: 'KIRIKKALE', value: 'KIRIKKALE' },
    { label: 'BATMAN', value: 'BATMAN' },
    { label: 'ŞIRNAK', value: 'ŞIRNAK' },
    { label: 'BARTIN', value: 'BARTIN' },
    { label: 'ARDAHAN', value: 'ARDAHAN' },
    { label: 'IĞDIR', value: 'IĞDIR' },
    { label: 'YALOVA', value: 'YALOVA' },
    { label: 'KARABÜK', value: 'KARABÜK' },
    { label: 'KİLİS', value: 'KİLİS' },
    { label: 'OSMANİYE', value: 'OSMANİYE' },
    { label: 'DÜZCE', value: 'DÜZCE' },
  ];



const DropdownInTextInput = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [searchText, setSearchText] = useState('');

  // Filter the data based on search input
  const filteredData = data.filter(city =>
    city.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setDropdownVisible(true)}
      >
        <TextInput
          style={styles.textInput}
          value={selectedCity}
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
                data={filteredData}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                      setSelectedCity(item.label);
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
    borderWidth: 0.5,
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
