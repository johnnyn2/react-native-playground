import { SET_ALL_PRODUCTS, FETCH_ALL_PRODUCTS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR } from './productTypes';

export const fetchAllProducts = () => ({
    type: FETCH_ALL_PRODUCTS,
})

export const setAllProducts = products => ({
    type: SET_ALL_PRODUCTS,
    payload: products,
})

export const fetchProductsFailure = error => ({
    type: FETCH_PRODUCTS_ERROR,
    payload: error,
})