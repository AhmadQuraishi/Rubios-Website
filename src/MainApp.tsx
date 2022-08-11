import './App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import { Fragment, useEffect, useLayoutEffect, useState } from 'react';
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
import moment from 'moment';
// import {testingRedemption, testingRewards} from "./services/reward";
// import {generateCCSFToken} from "./services/basket";
// import TagManager from 'react-gtm-module';
//
// const tagManagerArgs = {
//   dataLayer: {
//     userId: '001',
//     userProject: 'project',
//     page: 'home',
//   },
//   dataLayerName: 'Category',
// };
// TagManager.dataLayer(tagManagerArgs);

function App(props: any) {
  const location = useLocation();
  const [isAccountSection, setIsAccountSection] = useState(false);
  const [hideLoginPanel, setHideLoginPanel] = useState(true);
  const [hideLoginedPanel, setHideLoginedPanel] = useState(false);
  const dispatch = useDispatch();
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const { authToken } = useSelector((state: any) => state.authReducer);
  const { deviceId } = useSelector((state: any) => state.authReducer);
  const { basket } = useSelector((state: any) => state.basketReducer);

  const navigate = useNavigate();

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
    // const body = {
    //   authtoken: 'ynUJ4SAOgaB6SxFMKHuqbCvlOdhQ3HLK'
    // }
    // generateCCSFToken('b3a3c5aa-85a8-464c-b787-96fc42a7c4bf', body)
    // testingRewards()
    // testingRedemption('777097', 400);
  }, []);

  useEffect(() => {
    if (window.location.href.toLocaleLowerCase().indexOf('/account') != -1) {
      if (providerToken == null || providerToken == undefined) {
        navigate('/login');
      }
    }
    if (
      window.location.href.toLocaleLowerCase().indexOf('/menu') !== -1 ||
      window.location.href.toLocaleLowerCase().indexOf('/checkout') !== -1
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
  }, []);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.href.toLocaleLowerCase().indexOf('/account') != -1) {
      setIsAccountSection(true);
      if (providerToken == null || providerToken == undefined) {
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
        providerToken &&
        authToken &&
        authToken.authtoken &&
        authToken.authtoken !== ''
      ) {
        navigate('/welcome');
      }
    }
  }, []);

  return (
    <div id="wapper">
      <NavigateApp />
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
      <main>
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
  );
}
export default App;
