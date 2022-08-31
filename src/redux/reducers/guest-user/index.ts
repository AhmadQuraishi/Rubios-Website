import { orderActionTypes } from '../../types/order';

const INITIAL_STATE = {
  guestUser: null,
};

const guestReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case orderActionTypes.UPDATE_GUEST_USER_INFO:
      return {
        guestUser: action.payload,
      };
    default:
      return state;
  }
};

export default guestReducer;
