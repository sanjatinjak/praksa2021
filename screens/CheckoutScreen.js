import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  Pressable,
  Dimensions,
} from 'react-native';
import {Input, Button, Divider} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import jwt_decode from 'jwt-decode';

import {BodyText, HeaderText} from '../components/CustomText';
import * as CheckoutActions from '../redux-store/actions/checkout';
import * as CartActions from '../redux-store/actions/cart';

export default function CheckoutScreen({route, navigation}) {
  const dispatch = useDispatch();
  const month = 0;
  const paymentMethods = useSelector(state => state.checkout.paymentMethods);
  const responseStatus = useSelector(state => state.checkout.response);
  const userToken = useSelector(state => state.auth.token);
  const totalPrice = useSelector(state => state.cartItems.sum);
  const [modalVisible, setModalVisible] = useState(
    responseStatus === 200 ? true : false,
  );
  const modal = useSelector(state => state.checkout.modal);
  const loadingResponse = useSelector(state => state.checkout.loadingResponse);

  const {cartItems, coupon, total} = route.params;
  const orders = cartItems.map(item => {
    return {
      inventoryId: item.inventoryId,
      unitcost: item.productPrice,
      quantity: item.sentQuantity,
      totalpriceitem: item.productPrice * item.sentQuantity,
      name: item.productName,
    };
  });

  const [formInfo, setFormInfo] = useState({
    firstname: '',
    lastname: '',
    city: '',
    adress: '',
    cvc: '',
    year: 0,
    month: 0,
    cardnumber: '',
    paymentmethodId: 2,
    Orders: orders,
    totalprice: totalPrice,
    coupon: coupon ,
    branchId: 1,
    customerId: userToken ? jwt_decode(userToken).UserID : 0,
  });

  useEffect(() => {
    dispatch(CheckoutActions.fetchPaymentMethods());
  }, []);

  /*const checkPaymentMethod = () => {
    if (formInfo.paymentmethodId == 1) {
      return (
        <View style={{flex: 1, width: '100%'}}>
          <Input
            placeholder="Card number"
            inputStyle={{fontFamily: 'Poppins-Regular'}}
            onChangeText={val => setFormInfo({...formInfo, cardnumber: val})}
          />
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                borderWidth: 2,
                borderColor: 'black',
                marginHorizontal: 10,
              }}>
              <Picker
                style={{width: 165}}
                itemStyle={{textTransform: 'uppercase'}}
                selectedValue={formInfo.month}
                onValueChange={itemVal =>
                  setFormInfo({...formInfo, month: itemVal})
                }>
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
                <Picker.Item label="5" value={5} />
                <Picker.Item label="6" value={6} />
                <Picker.Item label="7" value={7} />
                <Picker.Item label="8" value={8} />
                <Picker.Item label="9" value={9} />
                <Picker.Item label="10" value={10} />
                <Picker.Item label="11" value={11} />
                <Picker.Item label="12" value={12} />
              </Picker>
            </View>
            <View
              style={{
                borderWidth: 2,
                borderColor: 'black',
              }}>
              <Picker
                style={{width: 165}}
                itemStyle={{textTransform: 'uppercase'}}
                selectedValue={formInfo.year}
                onValueChange={itemVal =>
                  setFormInfo({...formInfo, year: itemVal})
                }>
                <Picker.Item label="2021" value={2021} />
                <Picker.Item label="2022" value={2022} />
                <Picker.Item label="2023" value={2023} />
                <Picker.Item label="2024" value={2024} />
                <Picker.Item label="2025" value={2025} />
                <Picker.Item label="2026" value={2026} />
                <Picker.Item label="2027" value={2027} />
                <Picker.Item label="2028" value={2028} />
                <Picker.Item label="2029" value={2029} />
                <Picker.Item label="2030" value={2030} />
                <Picker.Item label="2031" value={2031} />
                <Picker.Item label="2032" value={2032} />
              </Picker>
            </View>
          </View>

          <Input
            placeholder="CVV"
            inputStyle={{fontFamily: 'Poppins-Regular'}}
            onChangeText={val => {
              setFormInfo({...formInfo, cvc: val});
            }}
          />
        </View>
      );
    }
  };*/

  const handleConfirm = async () => {

    dispatch(CheckoutActions.checkoutHandler());
    await dispatch(CheckoutActions.confirmCheckout(formInfo));
  };

  const response = () => {
    if (responseStatus > 200) {
      return (
        <BodyText style={{color: 'red', alignSelf: 'center'}}>
          There was a problem with your order. Please try again.
        </BodyText>
      );
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={styles.formContainer}>
        {response()}
        <Input
          placeholder="First name"
          inputStyle={{fontFamily: 'Poppins-Regular'}}
          onChangeText={val => setFormInfo({...formInfo, firstname: val})}
        />
        <Input
          placeholder="Last name"
          inputStyle={{fontFamily: 'Poppins-Regular'}}
          onChangeText={val => setFormInfo({...formInfo, lastname: val})}
        />
        <Input
          placeholder="Address"
          inputStyle={{fontFamily: 'Poppins-Regular'}}
          onChangeText={val => setFormInfo({...formInfo, adress: val})}
        />
        <Input
          placeholder="City"
          inputStyle={{fontFamily: 'Poppins-Regular'}}
          onChangeText={val => setFormInfo({...formInfo, city: val})}
        />
        <BodyText style={{marginHorizontal:10, marginVertical:10}}>Payment method: Pay in cash to the vendor.</BodyText>

        {/*{checkPaymentMethod()}*/}

        <Button
          title="Confirm"
          loading={loadingResponse}
          onPress={handleConfirm}
          buttonStyle={{
            borderRadius: 50,
            width: 300,
            alignSelf: 'center',
            height: 45,
          }}
          titleStyle={{fontFamily: 'Poppins-Bold', textTransform: 'uppercase'}}
        />

        <Modal animationType="slide" transparent={true} visible={modal}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <View
              style={{
                alignSelf: 'center',
                marginTop: 70,
                width: Dimensions.get('window').width / 1.1, 
                height: Dimensions.get('window').height / 1.4,
                backgroundColor: 'white',
              }}>
              <BodyText
                style={{
                  marginHorizontal: 10,
                  color: 'green',
                  alignSelf: 'center',
                  marginVertical: 20,
                }}>
                Your order was sent successfully !
              </BodyText>
              <HeaderText
                style={{
                  marginHorizontal: 20,
                  color: 'black',
                }}>
                Order summary
              </HeaderText>
              <FlatList
                data={orders}
                keyExtractor={(id, index) => index}
                renderItem={itemData => {
                  return (
                    <ScrollView
                      style={{
                        marginHorizontal: 20,
                        width: '100%',
                        marginVertical: 5,
                      }}>
                      <BodyText>NAME: {itemData.item.name} </BodyText>
                      <BodyText>ITEM COST: {itemData.item.unitcost} </BodyText>
                      <BodyText>QUANTITY: {itemData.item.quantity} </BodyText>

                      <Divider
                        style={{
                          width: '80%',
                          height: 2,
                          backgroundColor: 'gray',
                        }}
                      />

                      <HeaderText style={{marginTop:10}}>TOTAL PRICE:   ${total} </HeaderText>
                      <BodyText>DELIVERY:               + $6</BodyText>
                    </ScrollView>
                  );
                }}
              />

              <Pressable
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'Home',
                        //  params:{key:'param'},
                      },
                    ],
                  })
                }
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? '#ccc' : 'transparent',
                    borderRadius: pressed ? 80 : 0,
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                  },
                  ,
                  {
                    alignSelf: 'flex-end',
                    marginVertical: 15,
                    marginHorizontal: 15,
                  },
                ]}>
                <BodyText style={{marginTop: 5}}> OK </BodyText>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  formContainer: {
    width: '90%',
    height: '100%',
    marginVertical: 30,
  },
});
