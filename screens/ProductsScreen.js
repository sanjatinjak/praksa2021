import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Picker} from '@react-native-picker/picker';

import ProductGridItem from '../components/ProductGridItem';
import * as ProductsActions from '../redux-store/actions/products';
import Colors from '../constants/Colors';
import {styles as defaultStyles} from '../constants/styles';
import {BodyText} from '../components/CustomText';
import TouchableCmp from '../components/TouchableCmp';

export default ProductsScreen = props => {
  const {id, title, genderId} = props.route.params;
  const [brand, setBrand] = useState(0);

  const dispatch = useDispatch();

  //fetch products by selected category
  const productsCategory = useSelector(
    state => state.products.productsByFilters,
  );
  const brands = useSelector(state => state.products.filters);
  const loadingProducts = useSelector(
    state => state.products.loadingProductFilters,
  );

  const state = useSelector(state => state.products.productsByFilters);

  useEffect(() => {
    dispatch(ProductsActions.fetchProductsByFilters(genderId, id, brand));
    dispatch(ProductsActions.fetchFilters());
  }, [dispatch, brand]);

  const arraySubCategory = [];
  for (let i in productsCategory) {
    arraySubCategory.push(productsCategory[i].subCategory);
  }

  if (
    loadingProducts ||
    (arraySubCategory.length != 0 && arraySubCategory[0] != title)
  ) {
    return (
      <View style={defaultStyles.activityContainer}>
        <ActivityIndicator color={'black'} size={80} />
      </View>
    );
  }

  const checkProducts = () => {
    if (productsCategory.length <= 0) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 50,
          }}>
          <BodyText>No products here</BodyText>
        </View>
      );
    }
  };

  const brandCategoryPicker = () => {
    if (brands) {
      return (
        <Picker
          style={{width: 200}}
          selectedValue={brand}
          onValueChange={itemVal => setBrand(itemVal)}>
          <Picker.Item label="All brands" value={0} />
          {brands.map((type, i) => {
            return <Picker.Item label={type.name} value={type.id} key={i} />;
          })}
        </Picker>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <View style={{alignSelf: 'flex-end'}}>{brandCategoryPicker()}</View>
      </View>
      {checkProducts()}
      {/* display products in flat list, om touch navigate to screen product details */}
      <FlatList
        data={productsCategory}
        keyExtractor={itemData => itemData.id.toString()}
        renderItem={itemData => {
          return (
            <TouchableCmp
              useForeground={true}
              onPress={() => {
                props.navigation.navigate('ProductDetails', {
                  productId: itemData.item.id,
                });
              }}>
              <View style={styles.productItemContainer}>
                <ProductGridItem item={itemData.item} />
              </View>
            </TouchableCmp>
          );
        }}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productItemContainer: {
    width: Dimensions.get('window').width / 2.5,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  filterContainer: {
    height: 50,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
