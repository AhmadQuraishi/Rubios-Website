import { productOptionActionsTypes } from '../../../types/product/option';
import { userTypes } from '../../../types/user';


const INITIAL_STATE = {
  loading: false,
  options: null,
  error: {},
};

const productOptionsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case productOptionActionsTypes.GET_PRODUCT_OPTION_REQUEST:
      return { ...state, loading: true, options: null, error: {} };
    case productOptionActionsTypes.GET_PRODUCT_OPTION_SUCCESS:
      return { ...state, loading: false, options: action.payload, error: {} };
    case productOptionActionsTypes.GET_PRODUCT_OPTION_FAILURE:
      return { ...state, loading: false, error: action.error };
    case userTypes.USER_LOGOUT: 
      return {
        ...INITIAL_STATE
      }   
    default:
      return state;
  }
};

export default productOptionsReducer;
