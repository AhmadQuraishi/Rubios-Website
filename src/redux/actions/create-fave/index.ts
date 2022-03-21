import { displayToast } from '../../../helpers/toast';
import { ResponseUserFaves } from '../../../types/olo-api';
import { createFaveTypes as Type } from '../../types/create-fave';

export function createFave(body : RequestNewFave ) {
  return {
    type: Type.CREATE_FAVE,
   payload : body
  };
}

export function createFaveSuccess(data: ResponseUserFaves) {
  displayToast("SUCCESS", "Order saved as favorite");
  return {
    type: Type.CREATE_FAVE_SUCCESS,
    payload: data,
  };
 
}

export function createFaveFailure(error: any) {
  displayToast("ERROR", error?.response?.data?.errors?.base[0]? error.response.data.errors.base[0] : "Error");
  return {
    type: Type.CREATE_FAVE_FAILURE,
    error: error,
  };
}


