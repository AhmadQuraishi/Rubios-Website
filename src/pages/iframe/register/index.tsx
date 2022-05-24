import { makeStyles } from '@mui/styles';
import { Grid, Card } from '@mui/material';
import RegisterForm from '../../../components/register-form';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../../assets/imgs/login-bg.png';
import './register.css';

const useStyle = makeStyles(() => ({
  root: {
    background: `url(${bgImage}) center center fixed`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    justifyContent: 'center',
  },
  signinBtn: {
    width: '200px',
    margin: '20px',
  },
}));

const RegisterIframe = () => {
  const classes = useStyle();
  const navigate = useNavigate();

  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const { authToken } = useSelector((state: any) => state.authReducer);
  const { pageURL } = useSelector((state: any) => state.pageStateReducer);

  useEffect(() => {
    if (providerToken && authToken) {
      // if (pageURL == undefined || pageURL == null) {
      //   navigate('/welcome');
      // } else {
      //   navigate(pageURL);
      // }
    }
  }, [providerToken]);

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={10} sm={8} md={7} lg={5}>
          <Card className="register-card" elevation={6}>
            <RegisterForm />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterIframe;
