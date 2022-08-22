import { rewardTypes as Type } from '../../types/reward';

export function getRewards() {
  return {
    type: Type.GET_REWARDS,
  };
}

export function getRewardsSuccess(data: any) {
  return {
    type: Type.GET_REWARDS_SUCCESS,
    payload: data && data.rewards && data.rewards,
  };
}

export function getRewardsFailure(error: any) {
  return {
    type: Type.GET_REWARDS_FAILURE,
    error: error,
  };
}

export function getRewardsNew() {
  return {
    type: Type.GET_REWARDS_NEW,
  };
}

export function getRewardsNewSuccess(data: any) {
  return {
    type: Type.GET_REWARDS_NEW_SUCCESS,
    payload: data,
  };
}

export function getRewardsNewFailure(error: any) {
  return {
    type: Type.GET_REWARDS_NEW_FAILURE,
    error: error,
  };
}

export function getRewardsLocked() {
  return {
    type: Type.GET_REWARDS_LOCKED,
  };
}

export function getRewardsLockedSuccess(data: any) {
  return {
    type: Type.GET_REWARDS_LOCKED_SUCCESS,
    payload: data,
  };
}

export function getRewardsLockedFailure(error: any) {
  return {
    type: Type.GET_REWARDS_LOCKED_FAILURE,
    error: error,
  };
}
