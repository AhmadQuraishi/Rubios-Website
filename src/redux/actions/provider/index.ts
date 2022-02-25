import { providerActionsTypes as Type } from '../../types/provider';


export function getProviderRequest() {
  return {
    type: Type.GET_PROVIDER_REQUEST,
  };
}

export function getProviderRequestSuccess(data: any) {
  return {
    type: Type.GET_PROVIDER_SUCCESS,
    payload: data,
  };
}

export function getProviderRequestFailure(error: any) {
  return {
    type: Type.GET_PROVIDER_FAILURE,
    error: error,
  };
}
