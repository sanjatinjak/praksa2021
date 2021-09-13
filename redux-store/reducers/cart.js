import {
  ADD_TO_CART,
  ADD_QUANTITY,
  SUBTRACT_QUANTITY,
  REMOVE_ITEM,
  GET_DISCOUNT,
  HANDLE_DISCOUNT,
} from '../actions/cart';
import {CONFIRM_CHECKOUT} from '../actions/checkout';
import {LOGOUT} from '../actions/auth';

import CartItem from '../../models/cartItem';

const initialState = {
  cartItems: [],
  sum: 0,
  discount: undefined,
  loadingDiscount: false,
  alert: null,
};

export default (state = initialState, action) => {
  let cart = state.cartItems;
  switch (action.type) {
    case ADD_TO_CART:
      const {
        id,
        inventoryId,
        sentQuantity,
        availableQuantity,
        productName,
        productPrice,
        sum,
        image,
        size,
        serialNumber,
      } = action.cartItem;

      let itemExist = cart.find(item => item.id === id && item.size === size);
      if (itemExist && itemExist.size === size) {
        itemExist.sentQuantity =
          itemExist.sentQuantity < itemExist.availableQuantity
            ? itemExist.sentQuantity + 1
            : itemExist.sentQuantity;
        itemExist.sum =
          state.discount * 10 > 0
            ? itemExist.sum +
              itemExist.productPrice -
              itemExist.productPrice * state.discount
            : itemExist.sum + itemExist.productPrice;

        return {
          ...state,
          sum:
            state.discount * 10 > 0
              ? state.sum +
                itemExist.productPrice -
                itemExist.productPrice * state.discount
              : state.sum + itemExist.productPrice,
        };
      }

      const newCartItem = new CartItem(
        id,
        inventoryId,
        sentQuantity,
        availableQuantity,
        productName,
        productPrice,
        state.discount * 10 > 0
          ? productPrice - productPrice * state.discount
          : productPrice,
        image,
        size,
        serialNumber,
      );
      return {
        ...state,
        cartItems: [...state.cartItems, newCartItem],
        sum:
          state.discount * 10 > 0
            ? state.sum + productPrice - productPrice * state.discount
            : state.sum + productPrice,
      };

    case ADD_QUANTITY:
      const {pidAdd, pSize} = action;
      let item = cart.find(product => {
        return product.id == pidAdd && product.size == pSize;
      });

      item.sum =
        state.discount * 10 > 0
          ? item.sum + item.productPrice - item.productPrice * state.discount
          : item.sum + item.productPrice;
      item.sentQuantity += 1;

      return {
        ...state,
        sum:
          state.discount * 10 > 0
            ? state.sum + item.productPrice - item.productPrice * state.discount
            : state.sum + item.productPrice,
      };
    case SUBTRACT_QUANTITY:
      const {pidSub, pSizeSub} = action;
      let itemSub = cart.find(product => {
        return product.id == pidSub && product.size == pSizeSub;
      });

      itemSub.sum =
        state.discount * 10 > 0
          ? itemSub.sum -
            (itemSub.productPrice - itemSub.productPrice * state.discount)
          : itemSub.sum - itemSub.productPrice;
      itemSub.sentQuantity -= 1;

      return {
        ...state,
        sum:
          state.discount * 10 > 0
            ? state.sum -
              (itemSub.productPrice - itemSub.productPrice * state.discount)
            : state.sum - itemSub.productPrice,
      };
    case REMOVE_ITEM:
      const {pidRemove, pSizeRemove} = action;
      let removeItem = cart.find(
        product => product.id === pidRemove && product.size == pSizeRemove,
      );
      const sumSubstract = removeItem.sum;
      const indexRemove = cart.indexOf(removeItem);
      cart.splice(indexRemove, 1);

      return {
        ...state,
        cartItems: cart,
        sum: state.sum - sumSubstract,
      };
    case CONFIRM_CHECKOUT:
      return initialState;
    case LOGOUT:
      return initialState;
    case HANDLE_DISCOUNT:
      return {...state, loadingDiscount: true};
    case GET_DISCOUNT:
      const {discount} = action;
      if (discount * 100 > 0) {
        cart.map(item => (item.sum -= item.sum * discount));
        const newTotal = state.sum - state.sum * discount;
        return {
          ...state,
          sum: newTotal,
          discount: discount,
          loadingDiscount: false,
        };
      }
      return {...state, loadingDiscount: false};
    default:
      return state;
  }
};
