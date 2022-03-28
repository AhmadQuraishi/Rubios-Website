import { footerActionsTypes as Type } from '../../types/footer';
import { displayToast } from '../../../helpers/toast';

export function getMenuRequest() {
  return {
    type: Type.GET_FOOTER_ITMES_REQUEST,
  };
}

export function getMenuRequestSuccess(data: any) {
  return {
    type: Type.GET_FOOTER_ITMES_SUCCESS,
    payload: data,
  };
}

export function getMenuRequestFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: Type.GET_FOOTER_ITMES_FAILURE,
    error: error,
  };
}
