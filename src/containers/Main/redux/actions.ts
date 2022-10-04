import {
InPayment
} from 'src/services';
import {
  GET_REQUEST_PRODUCTS_START,
  GET_REQUEST_PRODUCTS_SUCCESS,
  INITIAL_REQUEST_MAIN_START,
  INITIAL_REQUEST_MAIN_SUCCESS,
  PATCH_REQUEST_PAYMENT_START,
  POST_REQUEST_LINK_START,
  REQUEST_MAIN_START,
  REQUEST_MAIN_SUCCESS
} from './constants';

export const initialRequestMainStart = () => ({type: INITIAL_REQUEST_MAIN_START});
export const initialRequestMainSuccess = (payload) => ({
  type: INITIAL_REQUEST_MAIN_SUCCESS,
  payload
});

export const getRequestProductsStart = (
  payload: PromiseAcc
) => ({
  type: GET_REQUEST_PRODUCTS_START,
  payload
});

export const claimLinkStart = (payload) => ({
  type: POST_REQUEST_LINK_START,
  payload
});

export const updatePaymentStatus = (payload) => ({
  type: PATCH_REQUEST_PAYMENT_START,
  payload
});

export const getRequestProductsSuccess = (payload: InPayment[]) => ({
  type: GET_REQUEST_PRODUCTS_SUCCESS,
  payload
});

export const requestMainStart = (payload) => ({
  type: REQUEST_MAIN_START,
  payload
});
export const requestMainSuccess = (payload) => ({
  type: REQUEST_MAIN_SUCCESS,
  payload
});
