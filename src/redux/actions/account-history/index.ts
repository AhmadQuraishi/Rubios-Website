import { accountHistoryTypes as Type } from '../../types/account-hostory';

export function getAccountHistory() {
  return {
    type: Type.GET_ACCOUNT_HISTORY,
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


