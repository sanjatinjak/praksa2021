import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {BodyText} from '../components/CustomText';
import * as ProductsActions from '../redux-store/actions/products';
import TouchableCmp from '../components/TouchableCmp';
import {styles as defaultStyles} from '../constants/styles';

export default function SearchScreen({navigation}) {
  const [value, setValue] = useState('');
  const searchResult = useSelector(state => state.products.searchResult);
  const dispatch = useDispatch();
  const loadingSearch = useSelector(state => state.products.loadingSearch);

  const handleSubmit = () => {
    dispatch(ProductsActions.handleSearch());
    dispatch(ProductsActions.search(value));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Pressable
          onPress={() => {
            dispatch(ProductsActions.resetState());
            navigation.goBack();
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#ccc' : 'transparent',
              borderRadius: pressed ? 80 : 0,
              marginTop: 15,
              width: 40,
              height: 40,
            },
          ]}>
          <Icon
            name="arrow-back"
            size={24}
            color="black"
            style={{alignSelf: 'center', margin: 8}}
          />
        </Pressable>
        <TextInput
          placeholder="Search your product..."
          placeholderTextColor="#ccc"
          onChangeText={txt => setValue(txt)}
          value={value}
          style={styles.input}
        />
        <Button
          title="Search"
          onPress={() => handleSubmit()}
          buttonStyle={styles.buttonContainer}
          titleStyle={{fontFamily: 'Poppins-Regular'}}
          disabled={value.length <= 0 ? true : false}
        />
      </View>

      {/* display search results */}
      {loadingSearch ? (
        <ActivityIndicator size={80} color="black" style={{marginTop:200}} />
      ) : (
        <FlatList
          data={searchResult}
          keyExtractor={(id, index) => index}
          renderItem={itemData => {
            let image = `data:image/png;base64,${itemData.item.image}`;
            return (
              <View>
                <TouchableCmp
                  onPress={() =>
                    navigation.navigate('ProductDetails', {
                      productId: itemData.item.id,
                    })
                  }>
                  <View style={styles.itemContainer}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={{uri: image}}
                        style={styles.image}
                        resizeMode={'center'}
                      />
                      <BodyText style={{width: 240}}>
                        {itemData.item.name}
                      </BodyText>
                    </View>
                  </View>
                </TouchableCmp>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  itemContainer: {
    width: '95%',
    height: 80,
    borderColor: '#ccc',
    borderWidth: 2,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  image: {
    width: 85,
    height: 75,
  },
  input: {
    borderColor: '#ccc',
    borderBottomWidth: 2,
    width: 220,
    marginVertical: 10,
    height: 50,
    marginHorizontal: 5,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  buttonContainer: {
    marginVertical: 15,
    height: 40,
    width: 100,
    borderRadius: 50,
  },
});
