import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import productReducer from './productReducer';

const store = createStore(productReducer, applyMiddleware(logger));

export default store;