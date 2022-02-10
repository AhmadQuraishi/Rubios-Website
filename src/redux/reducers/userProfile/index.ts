import { userProfileTypes as Type } from '../../types/userProfile';

const INITIAL_STATE = {
  userProfile: {},
  loading: false,
  error: {},
};

const userProfileReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Type.GET_USER_PROFILE:
      return { ...state, loading: true };
    case Type.GET_USER_PROFILE_SUCCESS:
      return { ...state, loading: false, userProfile: action.payload };
    case Type.GET_USER_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return { state };
  }
};

export default userProfileReducer;
