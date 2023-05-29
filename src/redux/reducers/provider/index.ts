import { providerActionsTypes as Type } from '../../types/provider';
import { userTypes } from '../../types/user';

const INITIAL_STATE = {
  loading: false,
  providerToken: null,
  error: {},
};

const providerReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Type.GET_PROVIDER_REQUEST:
    case userTypes.USER_LOGIN_REQUEST:
    case userTypes.USER_REGISTER_REQUEST:
    case userTypes.USER_FACEBOOK_REQUEST:
      return { ...state, loading: true, error: {} };
    case Type.GET_PROVIDER_SUCCESS:
    case userTypes.USER_LOGIN_SUCCESS:
    case userTypes.USER_REGISTER_SUCCESS:
      return { ...state, loading: false, providerToken: action.payload };
      case userTypes.USER_AUTHENTICATION_REQUEST:
        return { ...state, authenticate: false }; 
    case Type.GET_PROVIDER_FAILURE:
    case userTypes.USER_LOGIN_FAILURE:
    case userTypes.USER_REGISTER_FAILURE:
      return { ...state, loading: false, error: action.error };
    case userTypes.USER_LOGOUT:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
export default providerReducer;
