import { makeStyles } from "@mui/styles";
import {
  Grid,
  Box,
  Typography,
  Card,
  TextField,
  Button,
  Link
} from "@mui/material";
import { Fragment } from "react";
import axios from "axios";
// @ts-ignore
import OAuth2Login from "react-simple-oauth2-login";
import { useDispatch, useSelector } from 'react-redux';
import {getTokenRequest} from '../../redux/actions/token';
import { useEffect } from 'react';

declare var window: any;

interface OAuthResponse {
  code: string;
  jwt: string;
  client: string;
}

interface PunchhAuth {
  access_token: string;
  token_type: string;
  refresh_token: string;
  created_at: number;
}

const useStyle = makeStyles(() => ({
  root: {
    minHeight: "100vh",
    // backgroundImage: `url(https://www.pexels.com/photo/1640777/download/)`,
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "cover",
    justifyContent: "center"
  },
  signinBtn:{
    width: '200px',
    margin: '20px'
  },
  card: {
    marginTop: "40px",
    marginLeft: "40px"
  }
}));

const Login = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const authTrue = onAuthSuccess(dispatch);
  return (
    <Fragment>
      <Grid container component="main" className={classes.root}>
        <OAuth2Login
          className={classes.signinBtn}
          buttonText={"Punchh SSO Sign In"}
          authorizationUrl="https://sandbox.punchh.com/oauth/authorize"
          responseType="code"
          clientId={process.env.REACT_APP_PUNCHH_CLIENT_ID}
          redirectUri={window.location.href}
          onSuccess={authTrue}
          onFailure={onAuthFailure} />
      </Grid>
    </Fragment>
  );
};
const onAuthSuccess = (dispatch: any) => async (oAuthResponse: OAuthResponse) => {
  try {
    const token: PunchhAuth = await getAccessTokenByAuthCode(oAuthResponse.code, dispatch);
  
    console.log(token);
    const foundUser = await getUser(token);
  } catch (error: any) {
    alert("Auth Error!" + error.message().toString());
  }
};
const onAuthFailure = (args: any) => {
  console.error(args);
};
const getAccessTokenByAuthCode = async (code: string, dispatch:any): Promise<any> => {
  return () => {
    dispatch(getTokenRequest(code));
    }
  // return axios.post(
  //   `https://sandbox.punchh.com/oauth/token`,
  //   {
  //     grant_type: "authorization_code",
  //     code: code,
  //     client_id: process.env.REACT_APP_PUNCHH_CLIENT_ID,
  //     client_secret: process.env.REACT_APP_PUNCHH_CLIENT_SECRET,
  //     redirect_uri: window.location.origin + "/login"
  //   },
  //   {
  //     headers: {
  //       "accept": "application/json",
  //       "Content-Type": "application/json",
  //       "Origin": window.location.origin
  //     }
  //   }
  // );
};

const getUser = async (authResult: PunchhAuth): Promise<any> => {
  const url = `https://sandbox.punchh.com/api/auth/users?client=${process.env.REACT_APP_PUNCHH_CLIENT_ID}&access_token=${authResult.access_token}`;
  return axios.get(url, { });
};


export default Login;
