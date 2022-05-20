import { deliveryAddressTypes as Type } from '../../../types/location/delivery-address';

const initialState = {
  loading: null,
  data: false,
  error: {},
};

const verifyDeliveryAddressReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Type.SET_DELIVERY_ADDRESS:
      return { ...state, loading: true, error: {} };

    case Type.SET_DELIVERY_ADDRESS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: {},
      };
    case Type.SET_DELIVERY_ADDRESS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default verifyDeliveryAddressReducer;
