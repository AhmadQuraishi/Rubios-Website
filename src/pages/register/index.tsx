import { makeStyles } from "@mui/styles";
import {
  Grid, Card
} from '@mui/material';
import RegisterForm from '../../components/register-form';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const useStyle = makeStyles(() => ({
    root: {
      minHeight: '100vh',
      backgroundImage: `url(https://www.pexels.com/photo/1640777/download/)`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      justifyContent: 'center'
    },
    signinBtn: {
      width: '200px',
      margin: '20px',
    },
    card: {
      margin: '50px auto',
      borderRadius: '20px !important',
      padding: 30

    },
  }));


const Register = () =>{

  const classes = useStyle();
  const navigate = useNavigate();

  const { providerToken } = useSelector((state: any) => state.providerReducer);

  useEffect(() => {
    if(providerToken){
      navigate('/welcome')
    }
  }, [providerToken]);

  return (
      <>
      <Grid container component="main" className={classes.root}>
           <Grid item xs={10} md={8} lg={6}>
               <Card className={classes.card} elevation={6}>
                 <RegisterForm />
               </Card>
           </Grid>

          </Grid>
      </>
  )

}

export default Register