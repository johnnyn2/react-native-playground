import axios from 'axios';
import { SET_ALL_PRODUCTS, FETCH_ALL_PRODUCTS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR, CLEAR_ALL_PRODUCTS } from './productTypes';

export const fetchAllProducts = (dispatch) => {
    axios.get('https://fakestoreapi.com/products')
        .then(res => dispatch(setAllProducts(res.data)))
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