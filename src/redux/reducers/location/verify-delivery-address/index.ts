import { deliveryAddressTypes as Type } from '../../../types/location/delivery-address';

const initialState = {
  loading: false,
  data: null,
  error: {},
};

const verifyDeliveryAddressReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Type.VERIFY_DELIVERY_ADDRESS_REQUEST:
      return { ...state, data: null, loading: true, error: {} };

    case Type.VERIFY_DELIVERY_ADDRESS_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: {},
      };
    case Type.VERIFY_DELIVERY_ADDRESS_REQUEST_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default verifyDeliveryAddressReducer;
