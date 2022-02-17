import { authActionsTypes as Type } from '../../types/auth';

const INITIAL_STATE = {
  loading: false,
  authToken:null,
  error: {},
};

const authReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Type.GET_AUTHTOKEN_REQUEST:
      return { ...state, loading: true };
    case Type.GET_AUTHTOKEN_SUCCESS:
      return { ...state, loading: false, authToken: action.payload };
    case Type.GET_AUTHTOKEN_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default authReducer;
