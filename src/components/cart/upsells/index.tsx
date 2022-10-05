import { Grid, Typography, Theme, Box, Button, useTheme, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import crossIcon from '../../../assets/imgs/close.png';
import { displayToast } from '../../../helpers/toast';
import { addUpsellsRequestReset } from '../../../redux/actions/basket/upsell/Add';
import Salsa from './salsa';
import UpsellsOthers from './others';
import { UPSELLS_TYPES } from '../../../helpers/upsells';
import './upsells.css';
import { capitalizeFirstLetter } from '../../../helpers/common';

const useStyles = makeStyles((theme: Theme) => ({
  dimPanel: {
    position: 'fixed',
    background: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    right: 400,
    width: '100%',
    height: '100vh',
    zIndex: 1101,
    [theme.breakpoints.down('xl')]: {
      display: 'block !important',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  cartBox: {
    border: '1px solid #666',
    borderTop: '0',
    borderRight: '0',
    position: 'fixed',
    background: '#fff',
    top: 0,
    right: 400,
    width: '100%',
    height: '100%',
    zIndex: 9999,
    [theme.breakpoints.up('md')]: {
      maxWidth: '700px',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '700px',
    },
    [theme.breakpoints.up('xs')]: {
      maxWidth: 'auto !important',
    },
  },
  cartRoot: {
    position: 'relative',
    padding: '35px 5px 10px 30px',
  },
  cartTitle: {
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    fontSize: '25px !important',
    fontWeight: '700',
    fontFamily: 'Poppins-Bold !important',
    padding: '10px 0px 18px 0px',
  },
  crossIcon: {
    position: 'absolute',
    top: '15px !important',
    right: '10px !important',
    display: 'flex !important',

    justifyContent: 'right !important',
    '& img': {
      cursor: 'pointer',
    },
  },
  smallLink: {
    color: '#0075BF !important',
    fontSize: '11px !important',
    fontFamily: "'Poppins-Bold' !important",
    textDecoration: 'underline',
    display: 'inline',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  disabledLink: {
    color: '#ccc !important',
    fontSize: '11px !important',
    fontFamily: 'Poppins-Bold !important',
    display: 'inline',
    cursor: 'default',
    textDecoration: 'underline',
    textTransform: 'uppercase',
  },
  btnsList: {
    width: '100%',
    display: 'flex',
    listStyle: 'none',
    textDecoration: 'underline',
    height: '40px',
  },
  btn: {
    paddingLeft: '0px  !important',
    letterSpacing: 'normal !important',
  },
  emptyCart: {
    fontFamily: 'Poppins-Regular, sans-serif !Important',
    fontSize: '16px !important',
    color: '#525252',
    fontWeight: 'bold',
  },
}));

const Upsells = ({ showCart, upsellsType }: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const basketObj = useSelector((state: any) => state.basketReducer);
  const addUpsellsObj = useSelector((state: any) => state.addUpsellReducer);
  const addProductObj = useSelector((state: any) => state.addProductReducer);

  useEffect(() => {
    if (
      addUpsellsObj &&
      addUpsellsObj.action &&
      addUpsellsObj.action === 'COMPLETED'
    ) {
      displayToast('SUCCESS', 'Cart updated');
      dispatch(addUpsellsRequestReset());
      showCart();
    }

    // if (
    //   addProductObj &&
    //   addProductObj.action &&
    //   addProductObj.action === 'COMPLETED'
    // ) {
    //   // if(upsellsType !== ''){
    //   displayToast('SUCCESS', 'Cart updated');
    //   dispatch(addUpsellsRequestReset());
    //   showCart();
    //   // }
    // }
  }, [addUpsellsObj, addProductObj]);

  useEffect(() => {
    // const focusableElements =
    //   'button, [href], input, ul , li ,  select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('#cart-box-upsells'); // select the modal by it's id
    if (modal) {
      const focusableContent = modal.querySelectorAll('[tabindex="0"]');
      const firstFocusableElement = focusableContent[0]; // get first element to be focused inside modal

      const lastFocusableElement =
        focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

      document.addEventListener('keydown', function (e) {
        let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (!isTabPressed) {
          return;
        }

        if (e.shiftKey) {
          // if shift key pressed for shift + tab combination
          if (document.activeElement === firstFocusableElement) {
            // add focus for the last focusable element
            lastFocusableElement &&
              (lastFocusableElement as HTMLElement)?.focus();
            e.preventDefault();
          }
        } else {
          // if tab key is pressed
          if (document.activeElement === lastFocusableElement) {
            // if focused has reached to last focusable element then focus first focusable element after pressing tab
            firstFocusableElement &&
              (firstFocusableElement as HTMLElement)?.focus(); // add focus for the first focusable element
            e.preventDefault();
          }
        }
      });

      firstFocusableElement && (firstFocusableElement as HTMLElement)?.focus();
    }
  }, []);

  return (
    <>
      <div className={classes.dimPanel} onClick={showCart}></div>

      <Box
        className={classes.cartBox}
        id="cart-box-upsells"
        aria-label="view your cart"
        role="dialog"
        aria-modal="true"
      >
        <Grid
          container
          spacing={0}
          className={classes.cartRoot}
          aria-label="view your cart"
          role="dialog"
          aria-modal="true"
        >
          <Grid item xs={12}>
            <Button
              className={classes.crossIcon}
              sx={{ position: 'absolute', minWidth: 'fit-content', marginRight:'15px'}}
              aria-label="Close Cart"
              onClick={showCart}
            >
              <img
                src={crossIcon}
                title="Close Cart"
                height="20px"
                onClick={showCart}
                width="20px"
                alt="Close Cart"
              />
            </Button>
          </Grid>

          {basketObj &&
            basketObj.basket &&
            basketObj.basket.products.length > 0 && (
              <Grid item xs={12} >
                <Typography
                  variant="h6"
                  component="h6"
                  className={classes.cartTitle}
                  title="Your Order"
                >
                  {upsellsType === UPSELLS_TYPES.SALSA
                    ? `Select Your `
                    : `Add A `}
                  {capitalizeFirstLetter(upsellsType)}
                </Typography>
              </Grid>
            )}

          {upsellsType !== UPSELLS_TYPES.DRINK ? (
            <Salsa upsellsType={upsellsType} />
          ) : (
            <UpsellsOthers upsellsType={upsellsType} />
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Upsells;
