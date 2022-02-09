import { MenuActionsTypes as Type } from '../../types/menu';

const INITIAL_STATE = {
  loading: false,
  menu: [],
  id: 0,
  error: {},
};

const menuReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Type.GET_MENU_ITMES_REQUEST:
      return { ...state, loading: true, id: action.storeID };
    case Type.GET_MENU_ITMES_SUCCESS:
      return { ...state, loading: false, menu: action.payload };
    case Type.GET_MENU_ITMES_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return { state };
  }
};

export default menuReducer;
