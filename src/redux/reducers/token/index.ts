import { tokenActionsTypes as Type } from '../../types/token';

const INITIAL_STATE = {
  loading: false,
  data:{},
  error: {},
};

const tokenReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {    
    case Type.GET_TOKEN_REQUEST:
      return { ...state, loading: true };
    case Type.GET_TOKEN_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case Type.GET_TOKEN_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return { ...state };
  }
};

export default tokenReducer;
