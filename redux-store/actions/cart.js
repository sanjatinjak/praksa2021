import CartItem from '../../models/cartItem';

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const SUBTRACT_QUANTITY = 'SUBTRACT_QUANTITY';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const GET_DISCOUNT = 'GET_DISCOUNT';
export const HANDLE_DISCOUNT = 'HANDLE_DISCOUNT';

export const addToCart = (item, size) => {
  let data = [];
  data.push({
    id: item.itemId,
    size: size,
    quantity: 1,
    BranchID: 1,
  });
  return async dispatch => {
    const response = await fetch(
      `https://www.api.customer.app.fit.ba/item/getbyfilter`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    const responseData = await response.json();
    const cartItem = new CartItem(
      item.itemId,
      responseData[0].id,
      responseData[0].sentQuantity,
      responseData[0].quantity,
      responseData[0].name,
      responseData[0].price,
      0,
      responseData[0].image,
      responseData[0].size,
      responseData[0].serialNumber,
    );

    dispatch({type: ADD_TO_CART, cartItem: cartItem});
  };
};

export const addQuantity = (itemId, size) => {
  return {type: ADD_QUANTITY, pidAdd: itemId, pSize: size};
};

export const subtractQuantity = (itemId, size) => {
  return {type: SUBTRACT_QUANTITY, pidSub: itemId, pSizeSub: size};
};

export const removeItem = (itemId, size) => {
  return {type: REMOVE_ITEM, pidRemove: itemId, pSizeRemove: size};
};

export const discountHandler = () => {
  return {type: HANDLE_DISCOUNT};
};

export const getDiscount = code => {
  let disc;
  return async dispatch => {
    const response = await fetch(
      `https://www.api.customer.app.fit.ba/coupon?code=${code}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    )
      .then(response => response.json())
      .then(response => (disc = response))
      .catch(err => console.log(err));

    dispatch({
      type: GET_DISCOUNT,
      discount: disc,
    });
  };
};
