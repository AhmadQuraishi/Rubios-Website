import { redemptionTypes as Type } from "../../types/reward/redemption";
import { userTypes } from "../../types/user";


const initialState = {
  
  redemption: null,
  loading1: true,
  error: null,
  
};

const redemptionReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case Type.GET_CODE:
      return { ...state, loading1: true };
    case Type.GET_CODE_SUCCESS:
        return {
          ...state,
          redemption: action.payload,
          loading1: false
        };
    case Type.GET_CODE_FAILURE:
      return { ...state, error: action.error  , loading1 :  false};
    case userTypes.USER_LOGOUT: 
      return {
        ...initialState
      }     

    default:
      return state;
  }
};

export default redemptionReducer;
