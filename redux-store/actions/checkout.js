import Category from '../../models/category';

export const GET_PAYMENT_METHOD = 'GET_PAYMENT_METHOD';
export const CONFIRM_CHECKOUT = 'CONFIRM_CHECKOUT';
export const HANDLE_CHECKOUT = 'HANDLE_CHECKOUT';

export function fetchPaymentMethods() {
  return async dispatch => {
    const response = await fetch(
      `https://www.api.customer.app.fit.ba/PaymentMethod`,
    );
    const responseData = await response.json();
    const paymentMethods = [];

    for (let key in responseData) {
      paymentMethods.push(
        new Category(responseData[key].id, responseData[key].name),
      );
    }

    dispatch({
      type: GET_PAYMENT_METHOD,
      payment: paymentMethods,
    });
  };
}

export const checkoutHandler = () => {
  return {type: HANDLE_CHECKOUT};
};

export function confirmCheckout(data) {
  console.log(data);
  return async dispatch => {
    const response = await fetch(
      `https://www.api.customer.app.fit.ba/ShoppingCart`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    ).catch(err => console.log(err));
    const status = response.status;
console.log(response);
    dispatch({
      type: CONFIRM_CHECKOUT,
      response: status,
    });
  };
}
