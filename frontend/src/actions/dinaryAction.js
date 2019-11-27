import axios from 'axios';
import { GET_DINARY , GET_USERS, DELETE_USER, GET_ERRORS} from './types';
import {setCurrentUser} from './authentication'
import {tokenConfig} from './authentication';
import { returnErrors } from './errorActions';


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
export const getUser = (token) => dispatch => {
  axios
    .get('/api/dinaries/getOneUser',  tokenConfig(token))
    .then(res =>{dispatch(setCurrentUser(res.data));
}
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const adminCreate = (user, token,history) => dispatch => {
    axios.post('/api/dinaries/createAccount', user , tokenConfig(token))
            .then(res => history.push('/admin'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}
export const adminUpdate = (user, token,history) => dispatch => {
    axios.post('/api/dinaries/updateAccount', user , tokenConfig(token))
            .then(res => history.push('/admin'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}
