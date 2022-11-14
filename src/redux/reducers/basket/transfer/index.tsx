import { basketActionsTypes } from '../../../types/basket';
import { userTypes } from '../../../types/user';

const INITIAL_STATE = {
  loading: false,
  basket: null,
  error: null,
};

const basketTransferReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case basketActionsTypes.BASKET_TRANSFER_REQUEST:
      return { ...state, loading: true, basket: null, error: null };

    case basketActionsTypes.BASKET_TRANSFER_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: action.payload,
        error: null,
      };
    case basketActionsTypes.SET_BASKET_FAILURE:
      return { ...state, data: null, loading: false, error: action.error };
    case userTypes.USER_LOGOUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};

export default basketTransferReducer;
