import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import {Button, Divider, Input} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {BodyText, HeaderText} from '../components/CustomText';
import jwt_decode from 'jwt-decode';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as AuthActions from '../redux-store/actions/auth';
import {styles as defaultStyles} from '../constants/styles';

export default function UserDetailsScreen(props) {
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.auth.token);
  const userId = userToken ? jwt_decode(userToken).UserID : 0;
  const [mail, setMail] = useState('');
  const modalVisible = useSelector(state => state.auth.modal);
  const mess = useSelector(state => state.auth.inviteFriendMessage);
  const loadingInvite = useSelector(state => state.auth.loadingInvite);
  useEffect(() => {
    if (userId) {
      dispatch(AuthActions.fetchHistory(userId));
    }
  }, [userId, historyOfPayments]);

  const historyOfPayments = useSelector(state => state.auth.historyPayments);

  if (!historyOfPayments) {
    return (
      <View style={defaultStyles.activityContainer}>
        <ActivityIndicator size={100} color={'black'} />
      </View>
    );
  }

  const modal = () => {
    if (modalVisible) {
      return (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <View
              style={{
                alignSelf: 'center',
                marginTop: 200,
                width: Dimensions.get('window').width / 1.1,
                height: 220,
                backgroundColor: 'white',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  marginTop: 10,
                }}>
                <HeaderText style={{fontSize:17, marginTop:5}}>Invite friend and get coupon !</HeaderText>
                <Pressable
                  onPress={() => dispatch(AuthActions.dismiss())}
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed ? '#ccc' : 'transparent',
                      borderRadius: pressed ? 80 : 0,
                      alignItems: 'center',
                      width: 40,
                      height: 40,
                    },
                  ]}>
                  <Icon name="close" size={24} color="black" style={{marginTop:5}} />
                </Pressable>
              </View>
              <BodyText style={{marginHorizontal: 10, color: 'green'}}>
                {mess}
              </BodyText>
              <Input
                placeholder="email@adress.com"
                inputStyle={{fontFamily: 'Poppins-Regular'}}
                onChangeText={value => setMail(value)}
                style={{marginTop: 25}}
              />
              <Button
                title="Send"
                loading={loadingInvite ? true : false}
                onPress={() => {

                  if (userId) {
                    dispatch(AuthActions.inviteHandler())
                    dispatch(AuthActions.sendInvite(userId, mail));
                  }
                }}
                buttonStyle={{
                  width: 200,
                  alignSelf: 'center',
                  borderRadius: 50,
                }}
              />
            </View>
          </View>
        </Modal>
      );
    }
  };

  return (
    <View style={styles.container}>
      <HeaderText style={{margin: 16, alignSelf: 'center'}}>
        {' '}
        HISTORY OF PAYMENTS:{' '}
      </HeaderText>

      <FlatList
        data={historyOfPayments}
        keyExtractor={(id, index) => index}
        renderItem={itemData => {
          return (
            <View style={styles.historyContainer}>
              <BodyText> DATE: {itemData.item.date} </BodyText>
              <BodyText> PRICE: {itemData.item.totalPrice} </BodyText>
              <Divider style={styles.dividerStyle} />
            </View>
          );
        }}
      />
      {modal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  historyContainer: {
    margin: 16,
    width: Dimensions.get('window').width,
  },
  dividerStyle: {
    backgroundColor: 'black',
    height: 1,
    width: '90%',
  },
});
