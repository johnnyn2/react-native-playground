import { FETCH_ALL_PRODUCTS, SET_ALL_PRODUCTS, FETCH_PRODUCTS_ERROR, CLEAR_ALL_PRODUCTS } from './productTypes';

const initState = {
    loading: true,
    data: [],
    error: {}
}

const productReducer = (state = initState, action) => {
    switch(action.type) {
        case FETCH_ALL_PRODUCTS: return {
            ...state,
            loading: true,
        }
        case SET_ALL_PRODUCTS: return {
            ...state,
            loading: false,
            data: action.payload,
        }
        case FETCH_PRODUCTS_ERROR: return {
            ...state,
            loading: false,
            error: action.payload,
        }
        case CLEAR_ALL_PRODUCTS: return {
            ...state,
            loading: true,
            data: [],
            error: {}
        }
        default: return state;
    }
}

export default productReducer;