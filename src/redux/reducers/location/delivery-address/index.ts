import { deliveryAddressTypes as Type } from '../../../types/location/delivery-address';
import { userTypes } from '../../../types/user';

const initialState = {
  loading: false,
  address: null,
  error: {},
};

const deliveryAddressReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Type.SET_DELIVERY_ADDRESS:
      return { ...state, loading: true, error: {} };

    case Type.SET_DELIVERY_ADDRESS_SUCCESS:
      return {
        ...state,
        address: action.payload,
        loading: false,
        error: {},
      };
    case Type.SET_DELIVERY_ADDRESS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case userTypes.USER_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default deliveryAddressReducer;
