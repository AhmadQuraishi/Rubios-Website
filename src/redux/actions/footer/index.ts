import { footerActionsTypes as Type } from '../../types/footer';

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
  return {
    type: Type.GET_FOOTER_ITMES_FAILURE,
    error: error,
  };
}
