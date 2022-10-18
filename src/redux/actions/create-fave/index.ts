import { displayToast } from '../../../helpers/toast';
// import { ResponseUserFaves } from '../../../types/olo-api';
import { createFaveTypes as Type } from '../../types/create-fave';

export function createFave(body: any) {
  return {
    type: Type.CREATE_FAVE,
    payload: body,
  };
}

export function createFaveSuccess() {
  displayToast('SUCCESS', 'Order saved as favorite');
  return {
    type: Type.CREATE_FAVE_SUCCESS,
  };
}

export function createFaveFailure(error: any) {
  console.log('error', error.response);
  displayToast(
    'ERROR',
    error?.response?.data?.errors?.base[0] ||
      error?.response?.data?.message ||
      'ERROR! Please Try again later',
  );
  return {
    type: Type.CREATE_FAVE_FAILURE,
    error: error,
  };
}
