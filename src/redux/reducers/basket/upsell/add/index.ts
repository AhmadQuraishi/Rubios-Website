import { basketActionsTypes } from '../../../../types/basket';
import {addUpsellsRequestReset} from "../../../../actions/basket/upsell/Add";

const INITIAL_STATE = {
  action: null,
  loading: false,
};

const addUpsellReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case basketActionsTypes.ADD_UPSELLS_REQUEST_RESET:
      return { ...state, action: null };
    case basketActionsTypes.ADD_UPSELLS_REQUEST:
      return { ...state, action: null, loading: true };
    case basketActionsTypes.ADD_UPSELLS_REQUEST_SUCCESS:
      return {
        ...state,
        action: 'COMPLETED',
        loading: false,
      };
    case basketActionsTypes.ADD_UPSELLS_REQUEST_FAILURE:
      return { ...state, action: 'FAILURE', loading: false };
    default:
      return state;
  }
};

export default addUpsellReducer;
