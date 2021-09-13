import Payment from '../../models/payment';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const FETCH_HISTORY = 'FETCH_HISTORY';
export const INVITE_FRIEND = 'INVITE_FRIEND';
export const DISMISS_INVITE = 'DISMISS_INVITE';
export const SEND_INVITE = 'SEND_INVITE';
export const INVITE_HANDLER = 'INVITE_HANDLER';
export const LOGIN_HANDLER = 'LOGIN_HANDLER';

export function login(email, password) {
  const data = {
    Email: email,
    Password: password,
  };

  return async dispatch => {
    const response = await fetch(
      'https://www.api.customer.app.fit.ba/account/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    const responseData = await response.json();
    let message, user;
    if (response.ok) {
      message = 'User logged in!';
      user = email;
    } else {
      user = null;
      message = 'You entered wrong email or password.';
    }

    dispatch({
      type: LOGIN,
      user: user,
      token: responseData.token,
      loginMessage: message,
    });
  };
}

export const register = registerInfo => {
  return async dispatch => {
    const response = await fetch(
      `https://www.api.customer.app.fit.ba/account/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerInfo),
      },
    );

    let responseData = await response.json();
    let message, code;
    if (!response.ok) {
      responseData = responseData.errors;

      for (let i in responseData) {
        code = responseData[i].code;
        message = responseData[i].description;
      }
    } else {
      message = responseData.message;
      code = 200;
    }

    dispatch({
      type: REGISTER,
      messageRegister: message,
      status: code,
    });
  };
};

export const resetPasswd = mail => {
  const data = {email: mail};
  return async dispatch => {
    const response = await fetch(
      `https://www.api.customer.app.fit.ba/account/ForgetPassword?email=${mail}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    let responseData;
    if (response.ok) {
      responseData =
        'Reset password URL has been sent to the email successfully! Check you email.';
    } else {
      responseData = 'No user with that email. Try again.';
    }

    dispatch({
      type: RESET_PASSWORD,
      message: responseData,
      status: response.status,
    });
  };
};

export const logout = () => {
  return {type: LOGOUT};
};

export const inviteFriend = () => {
  return {type: INVITE_FRIEND};
};

export const loginHandler = () => {
  return {type: LOGIN_HANDLER};
};

export const inviteHandler = () => {
  return {type: INVITE_HANDLER};
};

export const dismiss = () => {
  return {type: DISMISS_INVITE};
};

export const sendInvite = (id, mail) => {
  const data = {
    UserID: id,
    FriendEmail: mail,
  };
  return async dispatch => {
    const response = await fetch(
      `https://www.api.customer.app.fit.ba/account/InviteFriend?UserID=${id}&FriendEmail=${mail}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    let inviteFriend;
    if (response.ok) {
      inviteFriend = 'Invite sent successfully!';
    } else {
      inviteFriend = ' There was a problem. Please try again.';
    }

    dispatch({
      type: SEND_INVITE,
      inviteFriendMessage: inviteFriend,
    });
  };
};

export const fetchHistory = id => {
  return async dispatch => {
    const response = await fetch(
      `https://www.api.customer.app.fit.ba/HistoryOfPayments?CustomerID=${id}`,
    );

    const responseData = await response.json();
    const history = [];
    for (let key in responseData) {
      history.push(
        new Payment(responseData[key].date, responseData[key].totalPrice),
      );
    }

    dispatch({
      type: FETCH_HISTORY,
      historyOfPayments: history,
    });
  };
};
