import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import itemsReducer from './itemReducer';
import adminReducer from './adminReducer';
export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    item : itemsReducer,
    dinaries : adminReducer,
});
