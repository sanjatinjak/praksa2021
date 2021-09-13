import {
  GET_PAYMENT_METHOD,
  CONFIRM_CHECKOUT,
  HANDLE_CHECKOUT,
} from '../actions/checkout';

const initialState = {
  paymentMethods: [],
  response: 0,
  modal: false,
  loadingResponse: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYMENT_METHOD:
      return {
        paymentMethods: action.payment,
        modal: false,
      };
    case HANDLE_CHECKOUT:
      return {...state, loadingResponse: true};
    case CONFIRM_CHECKOUT:
      const {response} = action;
      return {
        ...state,
        response: response,
        modal: response === 200 ? true : false,
        loadingResponse: false,
      };
    default: {
      return state;
    }
  }
};
