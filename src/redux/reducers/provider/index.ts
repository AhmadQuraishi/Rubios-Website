import { providerActionsTypes as Type } from '../../types/provider';

const INITIAL_STATE = {
  loading: false,
  providerToken:null,
  error: {},
};

const providerReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {    
    case Type.GET_PROVIDER_REQUEST:
      return { ...state, loading: true };
    case Type.GET_PROVIDER_SUCCESS:
      return { ...state, loading: false, providerToken: action.payload };
    case Type.GET_PROVIDER_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default providerReducer;
