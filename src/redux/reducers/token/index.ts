import { tokenActionsTypes as Type } from '../../types/token';
import {userTypes } from '../../types/user';

const INITIAL_STATE = {
  loading: false,
  accessToken:null,
  error: {},
};

const tokenReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {    
    case Type.GET_TOKEN_REQUEST:
      return { ...state, loading: true };
    case Type.GET_TOKEN_SUCCESS:
      return { ...state, loading: false, accessToken: action.payload };
    case Type.GET_TOKEN_FAILURE:
      return { ...state, loading: false, error: action.error };
    case userTypes.USER_LOGOUT: 
      return {
        ...INITIAL_STATE
      }  
    default:
      return state;
  }
};

export default tokenReducer;
