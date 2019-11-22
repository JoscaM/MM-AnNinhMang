import axios from 'axios';
import { GET_DINARY , GET_USERS, DELETE_USER} from './types';
import {tokenConfig} from './authentication';
import { returnErrors } from './errorActions';

import jwt_decode from 'jwt-decode';

export const getDinary = (token) => dispatch => {
  axios
    .get('/api/dinaries/get',  tokenConfig(token))
    .then(res =>{
      dispatch({
        type: GET_DINARY,
        payload: res.data
      })
}
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getUserInfo = (token) => dispatch => {
  axios
    .get('/api/dinaries/getUser',  tokenConfig(token))
    .then(res =>{
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
}
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deleteUser = (id , token)  => (dispatch) => {
  console.log('here');
  axios
    .delete(`/api/dinaries/${id}`, tokenConfig(token))
    .then(res =>
      dispatch({
        type: DELETE_USER,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
