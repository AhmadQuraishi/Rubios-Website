import { Grid, Typography, Theme, Box, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import crossIcon from '../../assets/imgs/cross-icon.svg';

const useStyles = makeStyles((theme: Theme) => ({
  dimPanel: {
    position: 'fixed',
    background: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    right: 0,
    width: '100%',
    height: '100vh',
    zIndex: 10000,
  },
  cartBox: {
    border: '1px solid #666',
    borderTop: '0',
    borderRight: '0',
    maxHeight: '100vh',
    position: 'absolute',
    background: '#fff',
    top: 0,
    right: 0,
    width: '100%',
    maxWidth: '375px',
    minHeight: '300px',
    zIndex: 10001,
  },
  cartRoot: {
    padding: '20px',
  },
  cartTitle: {
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    fontSize: '25px !important',
    fontWeight: '700',
    fontFamily: 'Poppins-Bold !important',
    padding: '10px',
  },
  crossIcon: {
    display: 'flex',
    justifyContent: 'right',
    '& img': {
      cursor: 'pointer',
    },
  },
  smallLink: {
    color: '#0075BF',
    fontSize: '11px !important',
    fontFamily: 'Poppins-Medium !important',
    fomtWeight: '600',
    textDecoration: 'underline',
  },
}));
const Cart = (props: any) => {
  const { showCart } = props;
  const classes = useStyles();
  return (
    <>
      <div className={classes.dimPanel} onClick={showCart}></div>
      <Box className={classes.cartBox}>
        <Grid container spacing={0} className={classes.cartRoot}>
          <Grid item xs={12}>
            <Typography
              variant="caption"
              component="div"
              className={classes.crossIcon}
            >
              <img
                src={crossIcon}
                height="20px"
                onClick={showCart}
                width="20px"
                alt="Close Cart"
              />
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ padding: '0 20px 0 0' }}>
            <Typography
              variant="h6"
              component="h6"
              className={classes.cartTitle}
            >
              Your Order
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ padding: '0 10px 0 10px' }}>
            <Grid container spacing={0}>
              <Grid item xs={9}>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '13px',
                    color: 'secondary.main',
                    fontFamily: 'Poppins-Medium !important',
                  }}
                >
                  Maxican Street Corn Taco Plate
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{ textAlign: 'right' }}>
                <Typography
                  variant="caption"
                  sx={{
                    textAlign: 'right',
                    fontSize: '14px',
                    fontWeight: '700',
                    fontFamily: 'Poppins-Bold !important',
                    color: 'secondary.main',
                  }}
                >
                  $12.05
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ padding: '5px 0 5px 0' }}>
                <Divider sx={{ borderColor: 'rgba(0, 0, 0, 1);' }} />
              </Grid>
              <Grid item xs={12} >
                <Typography variant="caption" fontSize={11}>
                  Grilled Chicken Mexican Oil Butter Mix Topping
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ padding: '0' }}>
                <Grid container spacing={0}>
                  <Grid item xs={3}>
                    <Typography
                      variant="caption"
                      component="a"
                      className={classes.smallLink}
                    >
                      Remove
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="caption"
                      component="a"
                      className={classes.smallLink}
                    >
                      Edit
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="caption"
                      component="a"
                      className={classes.smallLink}
                    >
                      Duplicate
                    </Typography>
                  </Grid>
                  <Grid item xs={3}></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ padding: '20px 10px 0 10px' }}>
            <Grid container spacing={0}>
              <Grid item xs={9}>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '13px',
                    color: 'secondary.main',
                    fontFamily: 'Poppins-Medium !important',
                  }}
                >
                  Regular Mango Tea
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{ textAlign: 'right' }}>
                <Typography
                  variant="caption"
                  sx={{
                    textAlign: 'right',
                    fontSize: '14px',
                    fontWeight: '700',
                    fontFamily: 'Poppins-Bold !important',
                    color: 'secondary.main',
                  }}
                >
                  $2.05
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ padding: '5px 0 5px 0' }}>
                <Divider sx={{ borderColor: 'rgba(0, 0, 0, 1);' }} />
              </Grid>
              <Grid item xs={12} >
                <Typography variant="caption" fontSize={11}>
                  Medium, Light Ice
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ padding: '0' }}>
                <Grid container spacing={0}>
                  <Grid item xs={3}>
                    <Typography
                      variant="caption"
                      component="a"
                      className={classes.smallLink}
                    >
                      Remove
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="caption"
                      component="a"
                      className={classes.smallLink}
                    >
                      Edit
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="caption"
                      component="a"
                      className={classes.smallLink}
                    >
                      Duplicate
                    </Typography>
                  </Grid>
                  <Grid item xs={3}></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Cart;
