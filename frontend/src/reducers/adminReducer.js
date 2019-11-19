import { GET_DINARY } from '../actions/types';
import isEmpty from '../validation/is-empty';


const initialState = {
    isAuthenticated: false,
    dinaries: []
}

export default function(state = initialState, action ){
  switch(action.type) {
    case GET_DINARY :
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        dinaries: action.payload
      }
        default:
            return state;
      }
  }
