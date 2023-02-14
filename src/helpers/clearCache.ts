import moment from "moment";
import { useSelector } from "react-redux";


export function ClearOrderCacheAfter30Minutes (callBackReset : any) {
    const {restaurant, sessionTime } = useSelector(
        (state: any) => state.restaurantInfoReducer,
      );
    console.log('sessionTime', sessionTime)
    console.log("working1", moment.unix(sessionTime).format('h:mm:ss A'));
    if (restaurant && sessionTime){
      const restaurantSessionTime: any = moment.unix(sessionTime);
      console.log("working2", restaurantSessionTime);
      const currentTime = moment();
      if (restaurantSessionTime.isValid()) {
        console.log("working3", restaurantSessionTime);
        const minutes = currentTime.diff(restaurantSessionTime, 'minutes');
        console.log(minutes, "minutes")
        if (minutes > 30) {
        callBackReset();
        }     
    }
  }
}

export function ClearCacheAuthenticate(callBackLogin : any) {
  const {authToken, sessionLoginTime } = useSelector(
    (state: any) => state.authReducer,
  );
    if (authToken && sessionLoginTime) {
      const LoginCreatedTime: any = moment.unix(sessionLoginTime);
      const currentTime = moment();
      if (LoginCreatedTime.isValid()) {
        const minutes = currentTime.diff(LoginCreatedTime, 'minutes');
        if (minutes > 0) {
          callBackLogin();
        }
      }
    }
  }