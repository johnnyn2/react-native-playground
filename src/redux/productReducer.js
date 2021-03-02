import { FETCH_ALL_PRODUCTS, SET_ALL_PRODUCTS, FETCH_PRODUCTS_ERROR } from './productTypes';

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
        default: return state;
    }
}

export default productReducer;