import { makeStyles } from "@mui/styles";
import {
  Grid, Card
} from '@mui/material';
import RegisterForm from '../../components/register-form';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from '../../assets/imgs/login-bg.png';
import './register.css';



const useStyle = makeStyles(() => ({
    root: {
      minHeight: '100vh',
      backgroundImage: `url(${bgImage})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      justifyContent: 'center'
    },
    signinBtn: {
      width: '200px',
      margin: '20px',
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
           <Grid item xs={10} sm={8} md={7} lg={5}>
               <Card className="register-card" elevation={6}>
                 <RegisterForm />
               </Card>
           </Grid>

          </Grid>
      </>
  )

}

export default Register
