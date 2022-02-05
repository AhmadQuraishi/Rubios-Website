import { makeStyles } from '@mui/styles';
import {
  Grid,
  Box,
  Typography,
  Card,
  TextField,
  Button,
  Link,
} from '@mui/material';
import { Fragment } from 'react';
import axios from "axios";
import { PUNCHH_CLIENT_SECRET, PUNCHH_CLIENT_ID } from "../../react-app-env";

declare var window: any;
declare var process: any;

interface PunchhAuth {
  access_token: string;
  token_type: string;
  refresh_token: string;
  created_at: number;
}

const useStyle = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(https://www.pexels.com/photo/1640777/download/)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    justifyContent: 'center',
  },
  card: {
    marginTop: '40px',
    marginLeft: '40px',
  },
}));

const Login = () => {
  const classes = useStyle();

  const state = {
    name: 'Rubios Auth Client',
    clientId:
      'c7f0b80300f53da0f25b52b06c8b9b89afcb47397e8e2c1f3fe9b58200171a41',
    clientSecret:
      'a2e83d96525d4d6d3db3823ec86cbd0d935f223f9d7e8df6167187cb95e7fbca',
    code: null,
    user: null,
    isAuthenticated: false,
    popUpWindowHandle: null,
    popUpID: 'RUBIOS_AUTH_MSG',
    punchhAuthResult: {} as PunchhAuth,
  };

  let login = () => {
    const windowHandle = window.open(
      `https://sandbox.punchh.com/oauth/authorize?client_id=${PUNCHH_CLIENT_ID}&force_logout=true&redirect_uri=http://rubioslivedev.wpengine.com/order&response_type=code&sso=true`,
      "Rubios Login",
      "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no," +
      `width=500, height=500, top=${
        window.top.outerHeight / 2 + window.top.screenY - 600 / 2
      }, ` +
      `left=${window.top.outerWidth / 2 + window.top.screenX - 600 / 2}`
    );
    registerRedirectCallback(windowHandle);
  };

  let registerRedirectCallback = (windowHandle: any) => {
    window.removeEventListener('message', receiveAuthMessage);
    state.popUpWindowHandle = windowHandle;
    window.addEventListener('message', (event: any) =>
      receiveAuthMessage({ event, id: state.popUpID })
    );
  }

  let receiveAuthMessage = (message: any) => {
    console.log('RECEIVED AUTH MESSAGE: ', message.event.data);
    if (
      message.event.isTrusted &&
      message.event.origin === window.location.origin &&
      message.id === state.popUpID
    ) {
      const getQueryString = (field: any, url: string) => {
        const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
        const str = reg.exec(url);
        return str ? str[1] : null;
      };
      if (
        message.event &&
        message.event.data &&
        message.event.data.url &&
        typeof message.event.data.url === 'string' &&
        message.event.data.url.match('code')
      ) {
        const code = getQueryString('code', message.event.data.url);
        if (code) {
          getAccessTokenByAuthCode(code, window.location.origin)
            .then((res: PunchhAuth) => (state.punchhAuthResult = res))
            .then(() => getUser(state.punchhAuthResult))
            .catch((error) => {
              alert('Auth Error!');
              console.error(error);
              // @ts-ignore
              state.popUpWindowHandle.close();
            });
        } else {
          // @ts-ignore
          state.popUpWindowHandle.close();
          alert('Auth Error!');
        }
      } else {
        // @ts-ignore
        state.popUpWindowHandle.close();
        alert('Auth Error!');
      }
    }
  }

  const getAccessTokenByAuthCode = (code: string, redirectUri: string): Promise<any> => {
    return axios.post(
      `https://sandbox.punchh.com/oauth/token?grant_type=authorization_code`,
      {
        code: code,
        client_id: PUNCHH_CLIENT_ID,
        client_secret: PUNCHH_CLIENT_SECRET,
        redirect_uri: redirectUri,
      }
    );
  }

  const getUser = (accessToken: PunchhAuth): void => {
    const url = `https://sandbox.punchh.com/api/auth/users?client=${PUNCHH_CLIENT_ID}&access_token=${state.punchhAuthResult.access_token}`;
    const body = {};
    const payload = url + body;
    const signature = CryptoJS.HmacSHA1(
      payload,
      process.env.PunchhClientSecret
    ).toString();
    // return axios.get(url, {
    //   headers: {
    //     "x-pch-digest": signature
    //   }
    // });
    axios
    .get(url, {
      headers: {
        'x-pch-digest': signature,
      },
    })
      .then((user) => console.log(user))
      .catch((e) => console.error(e));
  }

  return (
    <Fragment>
      <Grid container component="main" className={classes.root}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={10}
          style={{ marginTop: '20px', height: '60vh' }}
        >
          <Card>
            <Grid
              container
              style={{ justifyContent: 'center', marginTop: '20px' }}
            >
              <Grid item xs={8} sm={8} md={8} lg={5}>
                <Typography
                  variant="caption"
                  style={{ color: 'blue' }}
                  title="LOGIN"
                >
                  LOGIN
                </Typography>
                <Typography
                  variant="h4"
                  style={{ color: '' }}
                  title="SIGN IN TO RUBIO'S REWARDS"
                >
                  SIGN IN TO RUBIO'S REWARDS
                </Typography>
                <Box component="form" sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    // fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    aria-label="email address"
                    title="email address"
                  />
                  <br />
                  <TextField
                    margin="normal"
                    required
                    // fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    aria-label="password"
                    title="password"
                  />
                  <br />
                  <Link
                    href="#"
                    variant="body2"
                    title="Forgot password?"
                    aria-label="Forgot password?"
                  >
                    Forgot password?
                  </Link>{' '}
                  <br />
                  {/*<Link href="/order/account" aria-label="sign in">*/}
                    <Button
                      aria-label="sign in"
                      variant="contained"
                      style={{ marginLeft: '80px' }}
                      title="sign in"
                      onClick={login}
                    >
                      SIGN IN
                    </Button>
                  {/*</Link>*/}
                </Box>
              </Grid>
              <Grid
                item
                xs={8}
                sm={8}
                md={8}
                lg={5}
                style={{ textAlign: 'center' }}
              >
                <Typography
                  variant="caption"
                  title="MORE OPTIONS"
                  style={{ color: 'blue' }}
                >
                  MORE OPTIONS
                </Typography>
                <br />
                <Button title="SIGN IN WITH FACEBOOK">
                  SIGN IN WITH FACEBOOK
                </Button>
                <br />
                <Button title="SIGN IN WITH APPLE">SIGN IN WITH APPLE</Button>

                <br />
                <Button title="SIGN IN WITH GOOGLE">SIGN IN WITH GOOGLE</Button>
                <br />
                <Button title="CREATE ACCOUNT">CREATE ACCOUNT</Button>
                <br />
                <Typography
                  variant="caption"
                  style={{ color: 'blue', textAlign: 'center' }}
                  title="CONTINUE AS GEUST"
                >
                  CONTINUE AS GEUST
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Login;
