import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Pressable, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from '../screens/LoginScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import * as AuthActions from '../redux-store/actions/auth';

import Colors from '../constants/Colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const fetchUser = () => {
  const user = useSelector(state => state.auth.user);
  if (user) {
    return true;
  }
  return false;
};

const Home = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({navigation}) => ({
        headerTitleStyle: {
          fontFamily: 'Poppins-Bold',
        },
        headerStyle: {
          height:50,
        
        },
        headerRight: () => {
          return (
            <Pressable
              onPress={() => navigation.navigate('Search')}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#ccc' : 'transparent',
                  borderRadius: pressed ? 80 : 0,
                  margin: 15,
                  width: 40,
                  height: 40,
                },
              ]}>
              <Icon
                name="search-outline"
                size={26}
                color="black"
                style={{alignSelf: 'center', margin: 5}}
              />
            </Pressable>
          );
        },
      })}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerTitle: 'Commerce', fontFamily: 'Poppins-Bold'}}
      />
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={({route}) => ({title: route.params.title})}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{headerTransparent: true, headerTitle: '', headerRight: ''}}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const Shop = () => {
  return (
    <Stack.Navigator
      initialRouteName="Shop"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTitleStyle: {
          fontFamily: 'Poppins-Bold',
          textTransform: 'uppercase',
        },
      }}>
      <Stack.Screen
        name="Shopping"
        component={ShoppingCartScreen}
        options={{
          headerTitle: 'my cart',
        }}
      />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Navigator>
  );
};

const Login = () => {
  const user = fetchUser();
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      initialRouteName={user ? 'Profile' : 'Login'}
      screenOptions={({navigation}) => ({
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTitleStyle: {
          fontFamily: 'Poppins-Bold',
          textTransform: 'uppercase',
        },
        headerRight: () => {
          if (user) {
            return (
              <View style={{flexDirection: 'row'}}>
                <Pressable
                  onPress={() => {
                    dispatch(AuthActions.inviteFriend());
                  }}
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed ? '#ccc' : 'transparent',
                      borderRadius: pressed ? 80 : 0,
                      marginRight: 5,
                      width: 40,
                      height: 40,
                    },
                  ]}>
                  <Icon
                    name="person-add-outline"
                    size={26}
                    color="black"
                    style={{alignSelf: 'center', marginTop: 5}}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    dispatch(AuthActions.logout());
                  }}
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed ? '#ccc' : 'transparent',
                      borderRadius: pressed ? 80 : 0,
                      marginRight: 5,
                      width: 40,
                      height: 40,
                    },
                  ]}>
                  <Icon
                    name="log-out-outline"
                    size={26}
                    color="black"
                    style={{alignSelf: 'center', marginTop: 5}}
                  />
                </Pressable>
              </View>
            );
          }
        },
      })}>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen
          name="Profile"
          component={UserDetailsScreen}
          options={{headerLeft: null}}
        />
      )}
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{headerTitle: 'reset password'}}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const TabNav = () => (
  <Tab.Navigator
    screenOptions={({navigation, route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'ios-home' : 'ios-home-outline';
        } else if (route.name === 'Shop') {
          iconName = focused ? 'ios-cart-sharp' : 'ios-cart-outline';
        } else if (route.name === 'Login' || route.name === 'Profile') {
          iconName = focused
            ? 'ios-person-circle-sharp'
            : 'ios-person-circle-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      keyboardHidesTabBar: true,
      activeTintColor: '#000',
      inactiveTintColor: 'gray',
      activeBackgroundColor: '#fff',
      inactiveBackgroundColor: '#fff',
      labelStyle: {
        textTransform: 'uppercase',
        fontFamily: 'poppins-bold',
        fontSize: 12,
      },
      style: {
        backgroundColor: Colors.primary,
        height: 50,
      },
    }}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name={fetchUser() ? 'Profile' : 'Login'} component={Login} />
    <Tab.Screen name="Shop" component={Shop} />
  </Tab.Navigator>
);

export default CommerceNavigator = () => {
  return (
    <NavigationContainer>
      <TabNav />
    </NavigationContainer>
  );
};
