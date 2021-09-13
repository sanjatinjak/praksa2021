import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button, Divider} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';

import * as AuthActions from '../redux-store/actions/auth';
import {BodyText} from '../components/CustomText';

export default RegisterScreen = props => {
  const [errorName, setErrorName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [registerInfo, setRegisterInfo] = useState({
    Email: '',
    Password: '',
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
  });
  const dispatch = useDispatch();
  const registerMessage = useSelector(state => state.auth.registerMessage);
  const status = useSelector(state => state.auth.status);
  const loadingUser = useSelector(state => state.auth.loadingUser);

  const handleSubmit = async () => {
    validateInfo();

    if (
      errorName.length === 0 &&
      errorLastName.length === 0 &&
      errorEmail.length === 0 &&
      errorPhoneNumber.length === 0 &&
      errorPassword.length === 0
    ) {
      console.log('dispatch action');
      dispatch(AuthActions.loginHandler());
      await dispatch(AuthActions.register(registerInfo));
    } else {
      Alert.alert('Failed', 'Please input valid data.', [{text: 'OK'}]);
    }
  };

  const validateInfo = () => {
    if (!registerInfo.FirstName.trim()) {
      setErrorName('First name required.');
    } else {
      setErrorName('');
    }

    if (!registerInfo.LastName.trim()) {
      setErrorLastName('Last name required.');
    } else {
      setErrorLastName('');
    }
    if (!registerInfo.Email) {
      setErrorEmail('Email required');
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        registerInfo.Email,
      )
    ) {
      setErrorEmail('Email adress is invalid');
    } else {
      setErrorEmail('');
    }

    if (!registerInfo.Password) {
      setErrorPassword('Password required.');
    } else if (registerInfo.Password.length < 6) {
      setErrorPassword('Password needs to be 6 or more.');
    } else if (/(?=.*[A-Z].*)$/i.test(registerInfo.Password)) {
      setErrorPassword('Password needs to contain at least one uppercase.');
    } else if (
      /(?=.*[*.!@$%^&(){}[]:;<>,.?~_+-=|\])$/i.test(registerInfo.Password)
    ) {
      setErrorPassword(
        'Password neees to contain at least one special character.',
      );
    } else {
      setErrorPassword('');
    }

    if (!registerInfo.PhoneNumber) {
      setErrorPhoneNumber('Phone number is required.');
    } else if (!/^\d+$/.test(registerInfo.PhoneNumber)) {
      setErrorPhoneNumber('Only numbers allowed.');
    } else {
      setErrorPhoneNumber('');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <BodyText
        style={{marginBottom: 20, color: status === 200 ? 'green' : 'red'}}>
        {registerMessage}
      </BodyText>
      <View style={{flexDirection: 'row'}}>
        <Input
          placeholder="First Name"
          leftIcon={{type: 'font-awesome', name: 'user'}}
          inputStyle={{fontFamily: 'Poppins-Regular'}}
          containerStyle={{width: '50%'}}
          errorStyle={{color: 'red'}}
          errorMessage={errorName}
          onChangeText={value => {
            setRegisterInfo({...registerInfo, FirstName: value});
          }}
        />
        <Input
          placeholder="Last Name"
          inputStyle={{fontFamily: 'Poppins-Regular'}}
          containerStyle={{width: '50%'}}
          errorStyle={{color: 'red'}}
          errorMessage={errorLastName}
          onChangeText={value => {
            setRegisterInfo({...registerInfo, LastName: value});
          }}
        />
      </View>
      <Input
        placeholder="Phone Number"
        leftIcon={{type: 'font-awesome', name: 'phone'}}
        inputStyle={{fontFamily: 'Poppins-Regular'}}
        errorStyle={{color: 'red'}}
        errorMessage={errorPhoneNumber}
        onChangeText={value => {
          setRegisterInfo({...registerInfo, PhoneNumber: value});
        }}
        keyboardType="numeric"
      />
      <Input
        placeholder="email@address.com"
        leftIcon={{type: 'font-awesome', name: 'envelope'}}
        inputStyle={{fontFamily: 'Poppins-Regular'}}
        onChangeText={value => {
          setRegisterInfo({...registerInfo, Email: value});
        }}
        errorStyle={{color: 'red'}}
        errorMessage={errorEmail}
      />
      <Input
        placeholder="Password"
        style={{marginHorizontal: 10}}
        leftIcon={{type: 'font-awesome', name: 'lock'}}
        inputStyle={{fontFamily: 'Poppins-Regular'}}
        errorStyle={{color: 'red'}}
        errorMessage={errorPassword}
        onChangeText={value => {
          setRegisterInfo({...registerInfo, Password: value});
        }}
        secureTextEntry={true}
      />

      <Button
        title="create account"
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
    </KeyboardAvoidingView>
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
