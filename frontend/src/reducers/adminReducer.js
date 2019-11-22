import { GET_DINARY , GET_USERS, DELETE_USER} from '../actions/types';
import isEmpty from '../validation/is-empty';


const initialState = {
    isAuthenticated: false,
    dinaries: [],
    users :[]
}

export default function(state = initialState, action ){
  switch(action.type) {
    case GET_DINARY :
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        dinaries: action.payload
      }

    case GET_USERS :
              return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                users: action.payload
              }
    case DELETE_USER:
                return {
                  ...state,
                  users: state.users.filter(user => user._id !== action.payload)
                };
    default:
        return state;

      }
  }
