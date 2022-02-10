import { categoryActionsTypes } from '../../types/category';

export function getCategoriesRequest(id: number) {
  return {
    type: categoryActionsTypes.GET_CATEGORY_ITMES_REQUEST,
    storeID: id,
  };
}

export function getCategoriesRequestSuccess(data: any) {
  return {
    type: categoryActionsTypes.GET_CATEGORY_ITMES_SUCCESS,
    payload: data,
  };
}

export function getCategoriesRequestFailure(error: any) {
  return {
    type: categoryActionsTypes.GET_CATEGORY_ITMES_FAILURE,
    error: error,
  };
}
