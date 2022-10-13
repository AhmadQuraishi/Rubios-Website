import { accountHistoryTypes as Type } from '../../types/account-hostory';

export function getAccountHistory(event_filter: string = '') {
  return {
    type: Type.GET_ACCOUNT_HISTORY,
    event_filter,
  };
}

export function getAccountHistorySuccess(data: any) {
  return {
    type: Type.GET_ACCOUNT_HISTORY_SUCCESS,
    payload: data,
  };
 
}

export function getAccountHistoryFailure(error: any) {
  return {
    type: Type.GET_ACCOUNT_HISTORY_FAILURE,
    error: error,
  };
}


