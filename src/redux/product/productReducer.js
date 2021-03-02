import {
    FETCH_ALL_PRODUCTS,
    SET_ALL_PRODUCTS,
    FETCH_PRODUCTS_ERROR,
    CLEAR_ALL_PRODUCTS,
    SET_ACTIVE_PRODUCT_ID
} from './productTypes';

const initState = {
    loading: true,
    data: [],
    error: {},
    activeProductId: null
}

const productReducer = (state = initState, action) => {
    const {payload} = action;
    switch(action.type) {
        case FETCH_ALL_PRODUCTS: return {
            ...state,
            loading: true,
        }
        case SET_ALL_PRODUCTS: return {
            ...state,
            loading: false,
            data: payload,
        }
        case FETCH_PRODUCTS_ERROR: return {
            ...state,
            loading: false,
            error: payload,
        }
        case CLEAR_ALL_PRODUCTS: return {
            ...state,
            loading: true,
            data: [],
            error: {}
        }
        case SET_ACTIVE_PRODUCT_ID: return {
            ...state,
            activeProductId: payload
        }
        default: return state;
    }
}

export default productReducer;