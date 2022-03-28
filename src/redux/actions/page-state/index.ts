import { pageStateType as Type } from '../../types/page-state';
import { displayToast } from '../../../helpers/toast';

export function setPageStateRequest(pageURL?: string) {
  return {
    type: Type.SET_PAGE_STATE_REQUEST,
    pageURL,
  };
}

export function setPageStateRequestSuccess(pageURL: string) {
  return {
    type: Type.SET_PAGE_STATE_SUCCESS,
    payload: pageURL,
  };
}

export function setPageStateRequestFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: Type.SET_PAGE_STATE_FAILURE,
    error: error,
  };
}
