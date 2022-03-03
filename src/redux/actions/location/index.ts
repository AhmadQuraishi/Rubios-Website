import { locationTypes as Type } from '../../types/location';
import { displayToast } from '../../../helpers/toast';

export function getlocations() {
  return {
    type: Type.GET_LOCATIONS,
  };
}

export function getLocationsSuccess(data: any) {
  return {
    type: Type.GET_LOCATIONS_SUCCESS,
    payload: data,
  };
}

export function getLocationsFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try agin later',
  );
  return {
    type: Type.GET_LOCATIONS_FAILURE,
    error: error,
  };
}
