import { basketActionsTypes } from '../../../../types/basket';

const INITIAL_STATE = {
  loading: false,
  basket: null,
  error: {},
};

const removeProductReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case basketActionsTypes.REMOVE_PRODUCT_REQUEST:
      return { ...state, loading: true, basket: null, error: {} };
    case basketActionsTypes.REMOVE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: action.payload,
        error: {},
      };
    case basketActionsTypes.REMOVE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default removeProductReducer;
