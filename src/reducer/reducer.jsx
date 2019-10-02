import {combineReducers} from 'redux';
import storedState from '../store/storeState';

const reducer = combineReducers({
	storedState:storedState
})
export default reducer;