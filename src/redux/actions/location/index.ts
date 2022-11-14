import { locationTypes as Type } from '../../types/location';
import { displayToast } from '../../../helpers/toast';

export function getlocations() {
  return {
    type: Type.GET_LOCATIONS,
  };
}

export function getLocationsSuccess(data: any) {
  const filterApprovedLocations = data.filter(
    (loc: any) => loc.status === 'approved',
  );
  filterApprovedLocations.sort((a: any, b: any) =>
    a.name.localeCompare(b.name),
  );

  return {
    type: Type.GET_LOCATIONS_SUCCESS,
    payload: filterApprovedLocations,
  };
}

export function getLocationsFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: Type.GET_LOCATIONS_FAILURE,
    error: error,
  };
}

export function getSingleLocation(store_number: any) {
  return {
    type: Type.GET_SINGLE_LOCATION,
    payload: store_number,
  };
}

export function getSingleLocationSuccess(data: any) {
  return {
    type: Type.GET_SINGLE_LOCATION_SUCCESS,
    payload: data,
  };
}

export function getSingleLocationFailure(error: any) {
  return {
    type: Type.GET_SINGLE_LOCATION_FAILURE,
    error: error,
  };
}
