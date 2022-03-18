import { redemptionTypes as Type } from "../../types/reward/redemption";
import { userTypes } from "../../types/user";


const initialState = {
  
  redemption: null,
  loading: true,
  error: null,
  
};

const redemptionReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case Type.GET_CODE:
      return { ...state, loading: true };
    case Type.GET_CODE_SUCCESS:
        return {
          ...state,
          redemption: action.payload,
          loading: false
        };
    case Type.GET_CODE_FAILURE:
      return { ...state, error: action.error  , loading :  false};
    case userTypes.USER_LOGOUT: 
      return {
        ...initialState
      }     

    default:
      return state;
  }
};

export default redemptionReducer;
