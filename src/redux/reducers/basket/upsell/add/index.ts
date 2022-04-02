import { basketActionsTypes } from '../../../../types/basket';

const INITIAL_STATE = {
  loading: false,
  basket: null,
  error: {},
};

const addUpsellReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case basketActionsTypes.ADD_UPSELLS_REQUEST:
      return { ...state, loading: true, basket: null, error: {} };
    case basketActionsTypes.ADD_UPSELLS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: action.payload,
        error: {},
      };
    case basketActionsTypes.ADD_UPSELLS_REQUEST_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default addUpsellReducer;
