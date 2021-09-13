/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import CommerceNavigator from './navigation/CommerceNavigator';
import categoriesReducer from './redux-store/reducers/category';
import productsReducer from './redux-store/reducers/products';
import cartReducer from './redux-store/reducers/cart';
import authReducer from './redux-store/reducers/auth';
import checkoutReducer from './redux-store/reducers/checkout';

const rootReducer = combineReducers({
  category: categoriesReducer,
  products: productsReducer,
  cartItems: cartReducer,
  auth: authReducer,
  checkout: checkoutReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <CommerceNavigator />
    </Provider>
  );
};

export default App;
