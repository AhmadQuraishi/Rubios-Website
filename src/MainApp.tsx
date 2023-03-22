import './one-trust.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import { Fragment, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import AppRoutes from './routes';
import { Grid } from '@mui/material';
import LeftMenuBar from './components/left-menu-bar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setPageStateRequest } from './redux/actions/page-state';
import { useDispatch, useSelector } from 'react-redux';
import NavigateApp from './components/navigate-app';
import { generateDeviceId } from './helpers/common';
import { updateDeviceUniqueId } from './redux/actions/auth';
import { ResponseRestaurant } from './types/olo-api';
import { ResponseBasket } from './types/olo-api';
import moment from 'moment';
// import {testingRedemption, testingRewards} from "./services/reward";
// import {generateCCSFToken} from "./services/basket";
import TagManager from 'react-gtm-module';
import {resetRestaurantRequest,updateSessionNull,updateSessionRequest} from './redux/actions/restaurant';
import {resetBasketRequest} from './redux/actions/basket'
import {isLoginUser} from './helpers/auth'
import { CacheDialog } from './components/cache-dialog';
import LoginAuthDialog from './components/login-authentication-dialog';

function App(props: any) {
  const location = useLocation();
  const [isAccountSection, setIsAccountSection] = useState(false);
  const [hideLoginPanel, setHideLoginPanel] = useState(true);
  const [hideLoginedPanel, setHideLoginedPanel] = useState(false);
  // const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { deviceId } = useSelector((state: any) => state.authReducer);
  const { basket} = useSelector(
    (state: any) => state.basketReducer,
  );
  const { restaurant, orderType, sessionTime  } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const { authToken,sessionLoginTime } = useSelector((state: any) => state.authReducer);
  const productCount = useMemo(() => basket?.products?.length || 0, [basket]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('isLoginUser', isLoginUser())
  }, [])

  const updateDeviceId = () => {
    const newDeviceId = generateDeviceId();
    if (newDeviceId) {
      dispatch(updateDeviceUniqueId(newDeviceId));
    }
  };

  useEffect(() => {
    if (!deviceId) {
      updateDeviceId();
    } else {
      const splitArray = deviceId.split('_');
      if (splitArray.length === 2) {
        const deviceIdTime: any = moment.unix(splitArray[1]);
        const currentTime = moment();
        if (deviceIdTime.isValid()) {
          const days = currentTime.diff(deviceIdTime, 'days');
          if (days > 7) {
            updateDeviceId();
          }
        } else {
          updateDeviceId();
        }
      } else {
        updateDeviceId();
      }
    }
  }, []);
  
  useEffect(() => {
    if (productCount > 0) {
      dispatch(updateSessionNull(sessionTime));
      dispatch(updateSessionRequest(sessionTime));
    }
  }, [productCount]);

  let intervalId: any;
 
  useEffect (() => {
    if (restaurant && !sessionTime){
        const currentTime = moment();
        dispatch(updateSessionRequest(currentTime));
            }
  }, [])

  useEffect (() => {
    if (authToken && !sessionLoginTime){
        const currentTime = moment();
        dispatch(updateSessionRequest(currentTime));
            }
  }, [])
  
  const clearOrderCacheAfter30Minutes = () => {
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
        if (minutes > 0) {
          dispatch(resetRestaurantRequest());
          dispatch(resetBasketRequest());
          sessionStorage.removeItem('hasDisplayedDialog');
          // setOpen(true);
          navigate('/location');
          dispatch(updateSessionNull(sessionTime));
        }     
    }
  }
}
useEffect(() => {
  intervalId = setInterval(function() {
    clearOrderCacheAfter30Minutes()
  },  30 * 1000) 
  return () => clearInterval(intervalId);

}, [window.location.href]) 



//   useEffect(() => {
//     setInterval(() => {
//       clearOrderCacheAfter30Minutes();
//       console.log("working");
//     }, 5000)
    
// }, []);
  
  // useEffect(() => {
  //   if (sessionTime && basket) {
  //     const basketCreatedTime: any = moment.unix(sessionTime);
  //     const currentTime = moment();
  //     if (basketCreatedTime.isValid()) {
  //       const minutes = currentTime.diff(basketCreatedTime, 'minutes');
  //       if (minutes > 30) {
  //         dispatch(resetBasketRequest());
  //       }
  //     }
  //   }
  // }, [basket]);


  useEffect(() => {
    const tagManagerArgs: any = {
      gtmId: process.env.REACT_APP_GTM_ID,
    };

    TagManager.initialize(tagManagerArgs);
  }, []);

  useEffect(() => {
    // const body = {
    //   authtoken: 'ynUJ4SAOgaB6SxFMKHuqbCvlOdhQ3HLK'
    // }
    // generateCCSFToken('b3a3c5aa-85a8-464c-b787-96fc42a7c4bf', body)
    // testingRewards()
    // testingRedemption('777097', 400);
  }, []);

  useEffect(() => {
    if (window.location.href.toLocaleLowerCase().indexOf('/account') != -1) {
      if (!isLoginUser()) {
        navigate('/login');
      }
    }
    if (
      window.location.href.toLocaleLowerCase().indexOf('/menu') !== -1 ||
      window.location.href.toLocaleLowerCase().indexOf('/location') !== -1 ||
      window.location.href.toLocaleLowerCase().indexOf('/checkout') !== -1 ||
      window.location.href.toLocaleLowerCase().indexOf('/category') !== -1 ||
      window.location.href.toLocaleLowerCase().indexOf('/product') !== -1
    ) {
      setHideLoginPanel(false);
    } else {
      setHideLoginPanel(true);
    }
    if (
      // window.location.href.toLocaleLowerCase().indexOf('/welcome') != -1 ||
      window.location.href.toLocaleLowerCase().indexOf('/account') !== -1
    ) {
      setHideLoginedPanel(true);
    } else {
      setHideLoginedPanel(false);
    }
  }, [window.location.href]);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.href.toLocaleLowerCase().indexOf('/account') != -1) {
      setIsAccountSection(true);
      if (!isLoginUser()) {
        navigate('/login');
      }
    } else {
      setIsAccountSection(false);
    }
    if (
      window.location.href.toLocaleLowerCase().indexOf('/menu') != -1 ||
      window.location.href.toLocaleLowerCase().indexOf('/checkout') != -1
    ) {
      setHideLoginPanel(false);
    } else {
      setHideLoginPanel(true);
    }
    if (
      // window.location.href.toLocaleLowerCase().indexOf('/welcome') != -1 ||
      window.location.href.toLocaleLowerCase().indexOf('/account') != -1
    ) {
      setHideLoginedPanel(true);
    } else {
      setHideLoginedPanel(false);
    }
    if (
      window.location.href.toLocaleLowerCase().indexOf('/login') != -1 ||
      window.location.href.toLocaleLowerCase().indexOf('/register') != -1
    ) {
      //dispatch(setPageStateRequest(undefined));
    } else {
      dispatch(
        setPageStateRequest(window.location.href.replace(/.*\/\/[^\/]*/, '')),
      );
    }
  }, [location.pathname]);

  useEffect(() => {
    if (window.location.pathname === '/') {
      if (basket) {
      } else if (
        isLoginUser()
      ) {
        navigate('/welcome');
      }
    }
  }, []);

  // useEffect(() => {
  //   const LoadExternalScript = () => {
  //     const externalScript = document.createElement('script');
  //     externalScript.type = 'text/javascript';
  //     document.head.appendChild(externalScript);
  //     externalScript.src =
  //       'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js';
  //     externalScript.setAttribute(
  //       'data-domain-script',
  //       '97489c06-197d-4529-90c6-812b5a73ca53-test',
  //     );
  //     externalScript.setAttribute('charset', 'UTF-8');
  //   };
  //   LoadExternalScript();
  // }, []);

  return (
    <div>
      {/* {
        open && (
            <CacheDialog open={open} setOpen={setOpen} />
        )
      } */}
    
    <div id="wapper">
      {/*<div*/}
      {/*  id="onetrust-consent-sdk"*/}
      {/*  style={{ fontFamily: 'Poppins-Regular' }}*/}
      {/*></div>*/}
      <NavigateApp />
      <a href="#main" className="skip-link">Skip to Main Content</a>
      <Header
        style={{ margin: '0 !important', padding: '0 !important' }}
        removeCartForLocation={
          window.location.href.toLocaleLowerCase().indexOf('/location') != -1
        }
        hideLoginPanel={hideLoginPanel}
        hideLoginedPanel={hideLoginedPanel}
        showUserName={isAccountSection}
        removeCart={
          isAccountSection ||
          window.location.href.toLocaleLowerCase().indexOf('/checkout') !==
            -1 ||
          window.location.href.toLocaleLowerCase().indexOf('/welcome') !== -1 ||
          window.location.href
            .toLocaleLowerCase()
            .indexOf('/order-confirmation') !== -1
        }
      />
      <main id={'main'} >
        <ToastContainer hideProgressBar />
        {isAccountSection ? (
          <Fragment>
            <Grid container spacing={0}>
              <Grid
                item
                xs={0}
                sm={3.5}
                lg={2.5}
                sx={{ display: { xs: 'none', sm: 'grid' } }}
              >
                <LeftMenuBar />
              </Grid>
              <Grid
                item
                xs={12}
                sm={8.5}
                lg={9}
                sx={{ padding: { xs: '30px 20px 10px', sm: '30px 40px' } }}
              >
                <AppRoutes />
              </Grid>
            </Grid>
          </Fragment>
        ) : (
          <AppRoutes />
        )}
      </main>
      <Footer />
    </div>
    </div>
  );
}
export default App;
