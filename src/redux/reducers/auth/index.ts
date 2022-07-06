import { authActionsTypes as Type } from '../../types/auth';
import { userTypes } from '../../types/user';

const INITIAL_STATE = {
  loading: false,
  authToken: null,
  error: {},
  iframeRedirect: false,
};

const authReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Type.GET_AUTHTOKEN_REQUEST:
      return { ...state, loading: true };
    case Type.GET_AUTHTOKEN_SUCCESS:
      return { ...state, loading: false, authToken: action.payload };
    case Type.GET_AUTHTOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        iframeRedirect: false,
      };
    case Type.ADD_AUTH_TOKEN_IFRAME_REDIRECT:
      return { ...state, iframeRedirect: true };
    case Type.REMOVE_AUTH_TOKEN_IFRAME_REDIRECT:
      return { ...state, iframeRedirect: false };
    case userTypes.USER_LOGOUT:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default authReducer;
