import { navigateAppTypes as Type } from '../../types/navigate-app';

export function navigateAppAction(url: string) {
  return {
    type: Type.UPDATE_NAVIGATE_APP,
    payload: url,
  };
}

export function navigateAppActionRemove() {
  return {
    type: Type.REMOVE_NAVIGATE_APP,
  };
}
