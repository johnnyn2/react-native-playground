import { SET_ALL_PRODUCTS } from './productTypes';

const initState = {
    products: []
}

const productReducer = (state = initState, action) => {
    switch(action.type) {
        case SET_ALL_PRODUCTS: return {
            ...state,
            products: action.payload,
        }
        default: return state;
    }
}

export default productReducer;