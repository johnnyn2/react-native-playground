import axios from 'axios';
import { SET_ALL_PRODUCTS, FETCH_ALL_PRODUCTS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR } from './productTypes';

export const fetchAllProducts = () => {
    return (dispatch) => {
        dispatch(fetchingProducts);
        axios.get('https://fakestoreapi.com/products')
        .then(res => dispatch(setAllProducts(res.data)))
        .catch(err => dispatch(fetchProductsFailure(err)))
    }
}

const fetchingProducts = () => ({
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