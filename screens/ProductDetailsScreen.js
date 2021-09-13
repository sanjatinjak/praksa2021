import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import * as ProductsActions from '../redux-store/actions/products';
import ProductDetails from '../components/ProductDetails';
import Colors from '../constants/Colors';
import {styles as defaultStyles} from '../constants/styles';

export default ProductDetailsScreen = props => {
  const {productId} = props.route.params;

  const dispatch = useDispatch();
  const product = useSelector(state => state.products.productById);
  const loadingProduct = useSelector(
    state => state.products.loadingProductById,
  );

  useEffect(() => {
    dispatch(ProductsActions.fetchProductById(productId));
  }, [dispatch]);

  if (loadingProduct || productId != product.itemId) {
    return (
      <View style={defaultStyles.activityContainer}>
        <ActivityIndicator color={"black"} size={80} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ProductDetails product={product} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
