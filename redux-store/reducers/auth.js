import {
  LOGIN,
  LOGOUT,
  RESET_PASSWORD,
  FETCH_HISTORY,
  INVITE_FRIEND,
  INVITE_HANDLER,
  LOGIN_HANDLER,
  DISMISS_INVITE,
  SEND_INVITE,
  REGISTER,
} from '../actions/auth';

const initialState = {
  user: null,
  token: null,
  historyPayments: [],
  message: '',
  loginMessage: '',
  status: null,
  modal: false,
  inviteFriendMessage: '',
  loadingUser: false,
  registerMessage: '',
  status: 0,
  loadingInvite: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_HANDLER:
      return {...state, loadingUser: true};
    case LOGIN:
      return {
        user: action.user,
        token: action.token,
        loginMessage: action.loginMessage,
        loadingUser: false,
      };
    case REGISTER:
      return {
        ...state,
        registerMessage: action.messageRegister,
        status: action.status,
        loadingUser: false,
      };
    case LOGOUT:
      return initialState;
    case RESET_PASSWORD:
      return {
        ...state,
        message: action.message,
        status: action.status,
        loadingUser: false,
      };
    case FETCH_HISTORY:
      return {...state, historyPayments: action.historyOfPayments};
    case INVITE_HANDLER:
      return {...state, loadingInvite: true};
    case INVITE_FRIEND:
      return {...state, modal: true, inviteFriendMessage: ''};
    case DISMISS_INVITE:
      return {...state, modal: false, inviteFriendMessage: ''};
    case SEND_INVITE:
      return {
        ...state,
        inviteFriendMessage: action.inviteFriendMessage,
        loadingInvite: false,
      };
    default: {
      return state;
    }
  }
};
