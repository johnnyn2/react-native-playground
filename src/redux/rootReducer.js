import { combineReducers } from 'redux';
import productReducer from './product/productReducer';

const rootReducer = combineReducers({
    products: productReducer
})

export default rootReducer;