import { MenuActionsTypes as Type } from '../../types/menu';

export function getMenuRequest(id: number) {
  return {
    type: Type.GET_MENU_ITMES_REQUEST,
    storeID: id,
  };
}

export function getMenuRequestSuccess(data: any) {
  return {
    type: Type.GET_MENU_ITMES_SUCCESS,
    payload: data,
  };
}

export function getMenuRequestFailure(error: any) {
  return {
    type: Type.GET_MENU_ITMES_FAILURE,
    error: error,
  };
}
