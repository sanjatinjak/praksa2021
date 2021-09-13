import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';

import * as AuthActions from '../redux-store/actions/auth';
import {BodyText} from '../components/CustomText';
import {styles as defaultStyles} from '../constants/styles';

export default ResetPasswordScreen = props => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const message = useSelector(state => state.auth.message);
  const responseStatus = useSelector(state => state.auth.status);
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

  const handleSubmit = () => {
    if (mail.length <= 0) {
      Alert.alert('Failed', 'Please input valid data.', [{text: 'OK'}]);
    } else {
      if (validateEmail()) {
        setError(false);
        dispatch(AuthActions.loginHandler());
        dispatch(AuthActions.resetPasswd(mail));
      } else {
        setError(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <BodyText
        style={{
          fontSize: 16,
          color: responseStatus === 200 ? 'green' : 'red',
          marginBottom: 20,
        }}>
        {message}
      </BodyText>

      <Input
        placeholder="email@adress.com"
        leftIcon={{type: 'font-awesome', name: 'envelope'}}
        inputStyle={{fontFamily: 'Poppins-Regular'}}
        onChangeText={value => setMail(value)}
        errorStyle={{color: 'red'}}
        errorMessage={error ? 'Enter a valid email here.' : ''}
      />
      <Button
        title="Confirm"
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
