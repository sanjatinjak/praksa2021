import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {ButtonGroup} from 'react-native-elements';

import * as CategoryActions from '../redux-store/actions/category';
import * as ProductsActions from '../redux-store/actions/products';
import {HeaderText} from '../components/CustomText';
import ProductGridItem from '../components/ProductGridItem';
import Colors from '../constants/Colors';
import {styles as defaultStyles} from '../constants/styles';
import TouchableCmp from '../components/TouchableCmp';

export default HomeScreen = props => {
  let buttons = ['Women', 'Man'];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();

  const categories = useSelector(state =>
    selectedIndex === 0
      ? state.category.loadedCategories[0]
      : state.category.loadedCategories[1],
  );
  const products = useSelector(state =>
    selectedIndex === 0
      ? state.products.products[0]
      : state.products.products[1],
  );
  const loadingCategories = useSelector(state => state.category.loading);
  const loadingProducts = useSelector(state => state.products.loadingProducts);

  const updateIndex = selectedIndex => {
    setSelectedIndex(selectedIndex);
  };

  //fetching categories based on selected gender
  useEffect(() => {
    dispatch(CategoryActions.fetchCategories());
    dispatch(ProductsActions.fetchProducts());
  }, []);

  if (loadingCategories || loadingProducts) {
    return (
      <View style={defaultStyles.activityContainer}>
        <ActivityIndicator size={100} color={'black'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* buttons select gender */}
      <ButtonGroup
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{borderRadius: 30, marginVertical: 20}}
        textStyle={{fontFamily: 'Poppins-Bold'}}
        selectedButtonStyle={{backgroundColor: 'black'}}
      />

      {/* categories based on selected gender */}
      <View style={{height: 80, marginBottom: 20}}>
        <FlatList
          horizontal={true}
          numOfColumns={2}
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={itemData => (
            <TouchableCmp
              useForeground={true}
              onPress={() => {
                props.navigation.navigate('Products', {
                  id: itemData.item.id,
                  title: itemData.item.name,
                  genderId: selectedIndex + 1,
                });
              }}>
              <View style={styles.item}>
                <HeaderText style={{color: Colors.primary}}>
                  {itemData.item.name}
                </HeaderText>
              </View>
            </TouchableCmp>
          )}
        />
      </View>
      {/* few products to display on landing screen */}
      <View style={styles.productsContainer}>
        <HeaderText>See what's new</HeaderText>

        <FlatList
          horizontal={true}
          numOfColumns={2}
          showsHorizontalScrollIndicator={false}
          data={products}
          renderItem={items => (
            <TouchableCmp
              useForeground={true}
              onPress={() => {
                props.navigation.navigate('ProductDetails', {
                  productId: items.item.id,
                });
              }}>
              <View style={styles.productItemContainer}>
                <ProductGridItem item={items.item} />
              </View>
            </TouchableCmp>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 5,
    marginHorizontal: 10,
    backgroundColor: 'black',
    marginVertical: 20,
    borderRadius:40,
    overflow:'hidden',
    alignItems: 'center',
    height: 40,
    padding: 5,
    width: 150,
  },
  productsContainer: {
    marginHorizontal: 20,
  },
  productItemContainer: {
    width: Dimensions.get('window').width / 2.5,
    marginVertical: 10,
    marginRight: 20,
  },
});
