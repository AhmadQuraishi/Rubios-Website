import { locationTypes as Type } from '../../types/location';

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
  return {
    type: Type.GET_LOCATIONS_FAILURE,
    error: error,
  };
}





