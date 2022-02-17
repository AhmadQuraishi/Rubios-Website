import { productOptionActionsTypes } from '../../../types/product/option';

const INITIAL_STATE = {
  loading: false,
  options: null,
  error: {},
};

const productOptionsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case productOptionActionsTypes.GET_PRODUCT_OPTION_REQUEST:
      return { ...state, loading: true };
    case productOptionActionsTypes.GET_PRODUCT_OPTION_SUCCESS:
      return { ...state, loading: false, options: action.payload, error: {} };
    case productOptionActionsTypes.GET_PRODUCT_OPTION_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default productOptionsReducer;
