import { tokenActionsTypes as Type } from '../../types/token';

const INITIAL_STATE = {
  loading: false,
  accessToken:null,
  error: {},
};

const tokenReducer = (state = INITIAL_STATE, action: any) => {
  console.log("token hit reducer")
  switch (action.type) {    
    case Type.GET_TOKEN_REQUEST:
      return { ...state, loading: true };
    case Type.GET_TOKEN_SUCCESS:
      return { ...state, loading: false, accessToken: action.payload };
    case Type.GET_TOKEN_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default tokenReducer;
