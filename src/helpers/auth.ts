import { store } from "../redux/store";

export function isLoginUser() {
  const providerToken = store?.getState()?.providerReducer?.providerToken?.access_token;
  const authToken = store?.getState()?.authReducer?.authToken?.authtoken;
  return providerToken && authToken ? true : false
}
