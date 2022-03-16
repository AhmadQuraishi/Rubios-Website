import { redemptionTypes as Type } from "../../../types/reward/redemption";

export function getRedemptionCode(barcode: string) {
  return {
    type: Type.GET_CODE,
    payload: barcode
  };
}

export function getRedemptionCodeSuccess(data: any) {
  return {
    type: Type.GET_CODE_SUCCESS,
    payload: data,
  };
 
}

export function getRedemptionCodeFailure(error: any) {
 
  return {
    type: Type.GET_CODE_FAILURE,
    error: error,
  };
}


