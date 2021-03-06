import axios from 'axios';
import {
    SET_ALL_PRODUCTS,
    FETCH_ALL_PRODUCTS,
    FETCH_PRODUCTS_ERROR,
    CLEAR_ALL_PRODUCTS,
    SET_ACTIVE_PRODUCT_ID
} from './productTypes';

export const fetchAllProducts = (dispatch, cb) => {
    axios.get('https://fakestoreapi.com/products')
        .then(res => {
            dispatch(setAllProducts(res.data));
            cb();
        })
        .catch(err => dispatch(fetchProductsFailure(err)))
    return fetchingProducts();
}

export const clearProducts = () => ({
    type: CLEAR_ALL_PRODUCTS
})

const fetchingProducts = () => ({
    type: FETCH_ALL_PRODUCTS,
})

const setAllProducts = products => ({
    type: SET_ALL_PRODUCTS,
    payload: products,
})

const fetchProductsFailure = error => ({
    type: FETCH_PRODUCTS_ERROR,
    payload: error,
})

export const setActiveProductId = (id) => ({
    type: SET_ACTIVE_PRODUCT_ID,
    payload: id,
})