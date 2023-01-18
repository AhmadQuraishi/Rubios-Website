import { basketActionsTypes } from '../../../../types/basket';
import {userTypes} from "../../../../types/user";

const INITIAL_STATE = {
  loading: false,
  upsells: null,
  vendorId: null,
  error: {},
};

const getUpsellsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case basketActionsTypes.GET_UPSELLS_REQUEST:
      return { ...state, loading: true, upsells: null, error: {}, vendorId: null };
    case basketActionsTypes.GET_UPSELLS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        upsells: action.payload.data,
        vendorId: action.payload.vendorId,
        error: {},
      };
    case basketActionsTypes.GET_UPSELLS_REQUEST_FAILURE:
      return { ...state, loading: false, error: action.error, vendorId: null, upsells: null };
    case userTypes.USER_LOGOUT:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default getUpsellsReducer;
