import { FETCH_FAILED, FETCH_SUCCESS } from './actionTypes';

export const fetchFailed = () => ({ type: FETCH_FAILED });

export const fetchSuccess = () => ({ type: FETCH_SUCCESS });
