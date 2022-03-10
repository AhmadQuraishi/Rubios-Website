import { makeStyles } from '@mui/styles';
import {
  Grid,
  Typography,
} from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import './login2.css';
import {  Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../../components/login-form';


const useStyle = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    justifyContent: 'center',
  },
  caption: {},
}));

const Login2 = () => {
  const navigate = useNavigate();
  const classes = useStyle();

  const { providerToken } = useSelector((state: any) => state.providerReducer);

  useEffect(() => {
    if(providerToken){
      navigate('/welcome')
    }
  }, [providerToken])

  return (
    <Fragment>
      <Grid container component="main" columns={16} className={classes.root}>
        <Grid item xs={13} className="login-wrapper">
          <Grid container columns={16} className="login-content">
            <Grid item xs={16} sm={16} md={14} lg={9} className="left-col">
              <Typography variant="caption" className="label" title="Login">
                LOGIN
              </Typography>
              <Typography
                variant="h4"
                title={
                  providerToken &&
                  providerToken.first_name &&
                  providerToken.first_name
                }
              >
                SIGN IN RUBIO'S REWARDS{' '}
                {providerToken &&
                  providerToken.first_name &&
                  providerToken.first_name}
                !
              </Typography>
              <LoginForm />
            </Grid>
            <Grid item xs={16} sm={16} md={14} lg={5.5} className="right-col">

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Login2;
