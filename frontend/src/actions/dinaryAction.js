import axios from 'axios';
import { GET_DINARY } from './types';
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
