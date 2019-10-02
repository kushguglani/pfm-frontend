import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";
import { logger } from "redux-logger";

import rootReducer from '../reducer/reducer'
const persisitConfig = {
	key: 'root',
	storage
}
const persistedReducer = persistReducer(persisitConfig, rootReducer);

const store = createStore(
	persistedReducer,
	applyMiddleware(thunk, logger)
)

export const persistor = persistStore(store);
export default store;