import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  Alert,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Divider, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import {HeaderText, BodyText} from '../components/CustomText';
import Colors from '../constants/Colors';
import * as cartActions from '../redux-store/actions/cart';

export default ShoppingCartScreen = ({navigation}, props) => {
  const [disabled, setDisabled] = useState(false);
  const [promoCode, setPromoCode] = useState(null);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const totalAmount = useSelector(state => state.cartItems.sum);
  const cartItems = useSelector(state => state.cartItems.cartItems);
  const user = useSelector(state => state.auth.user);
  const responseStatus = useSelector(state => state.checkout.response);
  const discount = useSelector(state => state.cartItems.discount);
  const loadingDiscount = useSelector(state => state.cartItems.loadingDiscount);

  useEffect(() => {
    if (discount) {
      // do something with the item now that we now it exists
      if (discount * 100 > 0) {
        setError(false);
        setDisabled(true);
        Alert.alert(
          `You got ${discount * 100} % `,
          'Discount is included in total price!',
          [{text: 'OK'}],
        );
      }
    } else {
      setError(true);
      setDisabled(false);
    }
  }, [discount]);

  if (
    cartItems.length === 0 ||
    cartItems.find(item => item.sentQuantity <= 0)
  ) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <HeaderText>Cart is empty</HeaderText>
      </View>
    );
  }

  const handleOnPress = (q, aq, id, size) => {
    if (q === aq) {
      Alert.alert('Available quantity', 'Number of available items reached!', [
        {text: 'OK'},
      ]);
    } else {
      dispatch(cartActions.addQuantity(id, size));
    }
  };

  const handlePromoCode = async () => {
    await dispatch(cartActions.discountHandler());
    await dispatch(cartActions.getDiscount(promoCode));
  };

  return (
    <View style={styles.container}>
      <View style={{height: Dimensions.get('window').height / 1.71}}>
        {/* cart items with add & remove options */}
        <FlatList
          data={cartItems}
          keyExtractor={(id, index) => index.toString()}
          renderItem={itemData => {
            let image = `data:image/png;base64,${itemData.item.image}`;
            if (itemData.item.sentQuantity > 0) {
              return (
                <View style={styles.itemsContainer}>
                  <View style={styles.productInfoContainer}>
                    <Image source={{uri: image}} style={styles.image} />

                    <BodyText style={{width: 250}}>
                      {itemData.item.productName}
                    </BodyText>

                    <View style={{marginRight: 5}}>
                      <BodyText style={{alignSelf: 'flex-end'}}>
                        ${itemData.item.productPrice}
                      </BodyText>
                      <BodyText>size:{itemData.item.size}</BodyText>
                    </View>
                  </View>

                  <Divider style={styles.divider} />

                  <View style={styles.quantityContainer}>
                    <BodyText style={{marginTop: 8}}>
                      QTY: {itemData.item.sentQuantity}
                    </BodyText>
                    <View style={styles.iconsContainer}>
                      <Pressable
                        onPress={() => {
                          handleOnPress(
                            itemData.item.sentQuantity,
                            itemData.item.availableQuantity,
                            itemData.item.id,
                            itemData.item.size,
                          );
                        }}
                        style={({pressed}) => [
                          {
                            backgroundColor: pressed ? '#ccc' : 'transparent',
                            borderRadius: pressed ? 80 : 0,
                            alignItems: 'center',
                            width: 30,
                            height: 30,
                          },
                        ]}>
                        <Icon
                          name="add-outline"
                          size={30}
                          color={'green'}
                          disabledStyle={{color: '#ccc'}}
                        />
                      </Pressable>

                      <Pressable
                        onPress={() => {
                          dispatch(
                            cartActions.subtractQuantity(
                              itemData.item.id,
                              itemData.item.size,
                            ),
                          );
                        }}
                        style={({pressed}) => [
                          {
                            backgroundColor: pressed ? '#ccc' : 'transparent',
                            borderRadius: pressed ? 80 : 0,
                            alignItems: 'center',
                            width: 30,
                            height: 30,
                          },
                        ]}>
                        <Icon
                          name="remove-outline"
                          size={30}
                          color={'red'}
                          disabledStyle={{color: '#ccc'}}
                        />
                      </Pressable>

                      <Pressable
                        onPress={() => {
                          dispatch(
                            cartActions.removeItem(
                              itemData.item.id,
                              itemData.item.size,
                            ),
                          );
                        }}
                        style={({pressed}) => [
                          {
                            backgroundColor: pressed ? '#ccc' : 'transparent',
                            borderRadius: pressed ? 80 : 0,
                            alignItems: 'center',
                            width: 40,
                            height: 35,
                          },
                        ]}>
                        <Icon
                          name="trash-outline"
                          size={28}
                          color="black"
                          style={{margin: 2}}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              );
            }
          }}
        />
      </View>
      {/* total amount & checkout button */}
      <View style={styles.infoContainer}>
        <View style={styles.buyContainer}>
          <View style={styles.priceContainer}>
            <HeaderText style={styles.headerStyle}>TOTAL:</HeaderText>
            <BodyText style={styles.headerStyle}>
              ${totalAmount.toFixed(2)}
            </BodyText>
          </View>
          <Divider style={styles.priceDivider} />
          <View
            style={{width: 200, flexDirection: 'row', marginHorizontal: 15}}>
            <Input
              placeholder="Use promo code"
              style={{width: 200}}
              inputStyle={{fontFamily: 'Poppins-Regular'}}
              onChangeText={val => {
                setPromoCode(val);
                setError(false);
              }}
              errorStyle={{color: 'red'}}
              errorMessage={error ? 'Promo code is not valid.' : ''}
            />
            <Button
              title="CHECK CODE"
              loading={loadingDiscount}
              onPress={() => handlePromoCode()}
              titleStyle={{fontFamily: 'Poppins-Bold', color: 'white'}}
              raised={true}
              containerStyle={{
                width: 175,
                height: 40,
                marginTop: 10,
                borderRadius: 40,
              }}
              buttonStyle={{backgroundColor: 'gray', borderRadius: 40}}
              disabled={disabled}
            />
          </View>
          <Button
            title="CHECKOUT"
            onPress={() =>
              user
                ? navigation.navigate('Checkout', {
                    cartItems: cartItems,
                    coupon: discount * 10 > 0 ? promoCode : null,
                    total: totalAmount,
                  })
                : navigation.navigate('Login')
            }
            titleStyle={{fontFamily: 'Poppins-Bold', color: 'white'}}
            raised={true}
            containerStyle={styles.buttonContainer}
            buttonStyle={{backgroundColor: 'green', borderRadius: 40}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    marginBottom: 12,
  },
  itemsContainer: {
    height: 100,
    width: Dimensions.get('window').width,
    marginVertical: 2,
    borderColor: '#ccc',
    borderWidth: 2,
    backgroundColor: 'white',
  },
  infoContainer: {
    marginTop: 10,
    width: '100%',
    height: Dimensions.get('window').height / 6,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginVertical: 20,
  },
  productInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '57%',
  },
  image: {
    width: 80,
    height: 90,
    marginTop: 4,
  },
  divider: {
    backgroundColor: '#ccc',
    width: Dimensions.get('window').width - 85,
    alignSelf: 'flex-end',
    height: 2,
  },
  quantityContainer: {
    marginLeft: 100,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  promocodeContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 20,
  },
  buyContainer: {
    width: '100%',
  },
  price: {
    borderColor: 'green',
    borderWidth: 2,
    marginVertical: 5,
    height: 45,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  priceDivider: {
    backgroundColor: '#ccc',
    height: 2,
    width: '90%',
    marginVertical: 5,
    marginHorizontal: 20,
  },
  headerStyle: {
    margin: 5,
    fontSize: 14,
  },
  buttonContainer: {
    width: '90%',
    height: 40,
    marginHorizontal: 20,
    borderRadius: 40,
  },
});
