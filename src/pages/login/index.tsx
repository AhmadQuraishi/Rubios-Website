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
const PUNCHH_CLIENT_ID = "c7f0b80300f53da0f25b52b06c8b9b89afcb47397e8e2c1f3fe9b58200171a41";
const PUNCHH_CLIENT_SECRET = "a2e83d96525d4d6d3db3823ec86cbd0d935f223f9d7e8df6167187cb95e7fbca";

const Login = () => {
  const classes = useStyle();

  return (
    <Fragment>
      <Grid container component="main" className={classes.root}>
        <OAuth2Login
          className={classes.signinBtn}
          buttonText={"Punchh SSO Sign In"}
          authorizationUrl="https://sandbox.punchh.com/oauth/authorize"
          responseType="code"
          clientId={PUNCHH_CLIENT_ID}
          redirectUri={window.location.href}
          onSuccess={onAuthSuccess}
          onFailure={onAuthFailure} />
      </Grid>
    </Fragment>
  );
};

const onAuthSuccess = async (oAuthResponse: OAuthResponse) => {
  try {
    const token: PunchhAuth = await getAccessTokenByAuthCode(oAuthResponse.code);
    debugger;
    console.log(token);
    const foundUser = await getUser(token);
    debugger;
    console.log(foundUser);
  } catch (error: any) {
    alert("Auth Error!" + error.message().toString());
  }
};
const onAuthFailure = (args: any) => {
  console.error(args);
};
const getAccessTokenByAuthCode = async (code: string): Promise<any> => {
  return axios.post(
    `https://sandbox.punchh.com/oauth/token`,
    {
      grant_type: "authorization_code",
      code: code,
      client_id: PUNCHH_CLIENT_ID,
      client_secret: PUNCHH_CLIENT_SECRET,
      redirect_uri: window.location.origin + "/login"
    },
    {
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        "Origin": window.location.origin
      }
    }
  );
};

const getUser = async (authResult: PunchhAuth): Promise<any> => {
  const url = `https://sandbox.punchh.com/api/auth/users?client=${PUNCHH_CLIENT_ID}&access_token=${authResult.access_token}`;
  const body = {};
  const payload = url + body;
  const signature = CryptoJS.HmacSHA1(
    payload,
    PUNCHH_CLIENT_SECRET
  ).toString();
  return axios.get(url, {
    headers: {
      "x-pch-digest": signature
    }
  });
};


export default Login;
