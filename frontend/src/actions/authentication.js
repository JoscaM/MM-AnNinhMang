import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/users/register', user)
            .then(res => history.push('/login'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}
export const editUser = (user, token,history) => dispatch => {
    axios.post('/api/users/edit',user,tokenConfig(token))
            .then(res => dispatch(logoutUser(history)))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data

                });
            });
}

export const loginUser = (user) => dispatch => {
    axios.post('/api/users/signin', user)
            .then(res => {
                const { token } = res.data;
                let userrole = res.data.user.role;
                setAuthToken(token);
                let code = res.data.user.code;
                const name = res.data.user.name
                  const email = res.data.user.email;
                const decoded =  jwt_decode(token) ;
                let data = {decoded , userrole , code, name, token, email}
                console.log(data);
                dispatch(setCurrentUser(data));
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const setCurrentUser = data => {
    return {
        type: SET_CURRENT_USER,
        payload: data
    }
}

export const logoutUser = (history) => dispatch => {
  localStorage.clear();
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}
export const tokenConfig = token => {
  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
