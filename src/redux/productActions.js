import { SET_ALL_PRODUCTS } from './productTypes';

export const setAllProducts = products => ({
    type: SET_ALL_PRODUCTS,
    payload: products,
})