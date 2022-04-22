// import { makeStyles } from "@mui/styles";
// import { useEffect, useState } from 'react';
// import { Grid } from "@mui/material";
// import { Fragment } from "react";
// // @ts-ignore
// import OAuth2Login from "react-simple-oauth2-login";
// import { useDispatch, useSelector } from "react-redux";
// import { getTokenRequest } from "../../redux/actions/token";
// import { getProviderRequest } from "../../redux/actions/provider";
// import { getAuthRequest } from '../../redux/actions/auth';
// import {OAuthResponse, PunchhAuth} from '../../types/punchh-api'
//
//
// declare var window: any;
//
//
// const useStyle = makeStyles(() => ({
//   root: {
//     minHeight: '100vh',
//     // backgroundImage: `url(https://www.pexels.com/photo/1640777/download/)`,
//     // backgroundRepeat: "no-repeat",
//     // backgroundSize: "cover",
//     justifyContent: 'center',
//   },
//   signinBtn: {
//     width: '200px',
//     margin: '20px',
//   },
//   card: {
//     marginTop: '40px',
//     marginLeft: '40px',
//   },
// }));
//
// const Login = () => {
//   const { accessToken } = useSelector(
//     (state: any) => state.tokenReducer,
//   )
//   const { providerToken, loading } = useSelector(
//     (state: any) => state.providerReducer,
//   )
//   const dispatch = useDispatch();
//   const onAuthSuccess =
//   (dispatch: any) => async (oAuthResponse: OAuthResponse) => {
//     try {
//       const token: PunchhAuth = await getAccessTokenByAuthCode(
//         oAuthResponse.code,
//         dispatch,
//       );
//
//     } catch (error: any) {
//       alert('Auth Error!' + error.message().toString());
//     }
//   };
//   useEffect(() => {
//     console.log(accessToken)
//     if(accessToken){
//       dispatch(getProviderRequest());
//     }
//   },[accessToken])
//   useEffect(() => {
//     if(providerToken){
//       dispatch(getAuthRequest());
//     }
//   },[providerToken])
//
//   const classes = useStyle();
//   const authTrue = onAuthSuccess(dispatch);
//   //dispatch(getTokenRequest("code"));
//   //getAccessTokenByAuthCode("abc",dispatch)
//   return (
//     <Fragment>
//       <Grid container component="main" className={classes.root}>
//         <div className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with"
//              data-layout="default" data-auto-logout-link="false" data-use-continue-as="false"></div>
//         <OAuth2Login
//           className={classes.signinBtn}
//           buttonText={'Punchh SSO Sign In'}
//           authorizationUrl={process.env.REACT_APP_PUNCHH_FACEBOOK_LOGIN_URL}
//           responseType="code"
//           clientId={process.env.REACT_APP_PUNCHH_CLIENT_ID}
//           redirectUri={window.location.href}
//           onSuccess={authTrue}
//           onFailure={onAuthFailure}
//         />
//       </Grid>
//
//     </Fragment>
//   );
// };
//
// const onAuthFailure = (args: any) => {
//   console.error(args);
// };
// const getAccessTokenByAuthCode = async (
//   code: string,
//   dispatch: any,
// ): Promise<any> => {
//   const token = dispatch(getTokenRequest(code));
//   return token;
// };
//
// const getUser = async ( dispatch: any): Promise<any> => {
//   const provider = dispatch(getProviderRequest());
//   return provider
// };
// const linkingUserToOLO = async ( dispatch: any): Promise<any> => {
//   const auth =  dispatch(getAuthRequest());
//   return auth;
// };
//
// export default Login;

import React, { useState } from 'react';
// import FacebookLogin from 'react-facebook-login';
// import './App.css';

const Login = () => {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState<any>({});
  // const [picture, setPicture] = useState('');

  const responseFacebook = (response: any) => {
    console.log(response);
    setData(response);
    // setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  
return (
    <div className="container">
      {/*{!login && (*/}
      {/*  <FacebookLogin*/}
      {/*    // appId="3126327474351480"*/}
      {/*    appId="380212609388497"*/}
      {/*    // autoLoad={true}*/}
      {/*    fields="name,email,picture"*/}
      {/*    scope="public_profile"*/}
      {/*    callback={responseFacebook}*/}
      {/*    icon="fa-facebook"*/}
      {/*  />*/}
      {/*)}*/}
      {/*{ login &&*/}
      {/*  <Image src={picture} roundedCircle />*/}
      {/*}*/}
      {login && (
        <div>
          <div>{data.name}</div>
          <div>{data.email}</div>
        </div>
      )}
    </div>
  );
}

export default Login;
