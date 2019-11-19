import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authentication';
import { returnErrors } from './errorActions';
export const getItems = (token) => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items/items',  tokenConfig(token))
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })

    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = (item, token) => (dispatch) => {
  axios
    .post('/api/items/add', item, tokenConfig(token))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = (id , token)  => (dispatch) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(token))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
