import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button, Divider} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';

import * as AuthActions from '../redux-store/actions/auth';
import {BodyText} from '../components/CustomText';

export default LoginScreen = props => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const message = useSelector(state => state.auth.loginMessage);
  const loadingUser = useSelector(state => state.auth.loadingUser);

  const validateEmail = () => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail,
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (mail.length <= 0 || password.length <= 0) {
      Alert.alert('Failed', 'Please input valid data.', [{text: 'OK'}]);
    } else {
      if (validateEmail()) {
        setError(false);
        dispatch(AuthActions.loginHandler());
        await dispatch(AuthActions.login(mail, password));
      } else {
        setError(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <BodyText style={{marginBottom: 20, color: 'red'}}>{message}</BodyText>
      <Input
        placeholder="email@address.com"
        leftIcon={{type: 'font-awesome', name: 'envelope'}}
        inputStyle={{fontFamily: 'Poppins-Regular'}}
        onChangeText={value => setMail(value)}
        errorStyle={{color: 'red'}}
        errorMessage={error ? 'Enter a valid email here.' : ''}
      />
      <Input
        placeholder="Password"
        style={{marginHorizontal: 10}}
        leftIcon={{type: 'font-awesome', name: 'lock'}}
        inputStyle={{fontFamily: 'Poppins-Regular'}}
        onChangeText={value => setPassword(value)}
        secureTextEntry={true}
      />

      <Button
        title="Log in"
        loading={loadingUser}
        containerStyle={{borderRadius: 50}}
        onPress={handleSubmit}
        buttonStyle={styles.button}
        titleStyle={{
          fontFamily: 'Poppins-Bold',
          color: 'white',
          textTransform: 'uppercase',
        }}
        raised={true}
      />

      <Pressable
        onPress={() => props.navigation.navigate('ResetPassword')}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#ccc' : 'transparent',
            width: 210,
            height: 40,
            marginTop: 15,
            alignItems: 'center',
            borderRadius: 50,
          },
        ]}>
        <BodyText style={{marginTop: 10}}>Forgot your password ?</BodyText>
      </Pressable>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Divider
          style={{
            height: 1,
            backgroundColor: 'gray',
            width: '40%',
            marginTop: 10,
          }}
        />
        <BodyText style={{marginHorizontal: 15}}>OR</BodyText>
        <Divider
          style={{
            height: 1,
            backgroundColor: 'gray',
            width: '40%',
            marginTop: 10,
          }}
        />
      </View>
      <Pressable
        onPress={() => props.navigation.navigate('Register')}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#ccc' : 'transparent',
            width: 210,
            height: 40,
            marginTop: 15,
            alignItems: 'center',
            borderRadius: 50,
          },
        ]}>
        <BodyText style={{marginTop: 10}}>Create new account.</BodyText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  button: {
    width: 300,
    fontFamily: 'Poppins-Bold',
    borderRadius: 50,
  },
});
