import { Grid, Box, Button, TextField, Typography, Theme } from '@mui/material';
import receipt from '../../assets/imgs/receipt_rewards.png';
import qrCode from '../../assets/imgs/qr_code_rewards.png';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './check-in.css';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckIn } from '../../redux/actions/check-in';
import { IMaskInput } from 'react-imask';
import { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 20px 0px 20px',
    maxWidth: '1260px',
    boxSizing: 'border-box',
    margin: 'auto',
  },
  heading: {
    paddingBottom: '0px',
    fontSize: '25px !important',
    [theme.breakpoints.down('sm')]: {
      fontSize: '22px !important',
    },
  },
  input: {
    paddingTop: 12,
    paddingBottom: 12,
  },
}));

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormatCustom = forwardRef<HTMLElement, CustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="00-000-000-0000-0"
        definitions={{
          '#': /[1-9]/,
        }}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  },
);

const CheckIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { providerToken } = useSelector((state: any) => state.providerReducer);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography className={classes.heading} variant="h1" title="CHECK-IN" sx={{ fontFamily: "'grit_sansbold' !important",}}>
            CHECK IN
          </Typography>
          <Typography
            variant="body2"
            sx={{  fontFamily: "'Libre Franklin' !important",color: "#414141", paddingTop: "8px"}}
            title="To check in at the restaurant, scan the QR code below at the register."
          >
            To check in at the restaurant, scan the QR code below at the
            register.
          </Typography>
          <Typography
            variant="body2"
            sx={{  fontFamily: "'Libre Franklin' !important",color: "#414141", paddingTop: "8px"}}
            title="If you order online, you are automatically checked in."
          >
            If you order online, you are automatically checked in.
          </Typography>
          <div style={{ textAlign: 'center', paddingTop: 25, paddingBottom: 50 }}>
            {/*<Box*/}
            {/*  component="img"*/}
            {/*  alt="QR Code"*/}
            {/*  style={{ paddingTop: 25, paddingBottom: 50 }}*/}
            {/*  aria-label="QR Code"*/}
            {/*  src={qrCode}*/}
            {/*/>*/}
            <QRCodeSVG size={200} value={providerToken.user_as_qrcode || ''} />
          </div>
        </Grid>
        <Grid item md={12}>
          <Typography className={classes.heading} variant="h1" title="CHECK-IN" sx={{ fontFamily: "'grit_sansbold' !important",}}>
            FORGOT TO CHECK IN?
          </Typography>
          <Formik
            initialValues={{
              barcode: '',
            }}
            validationSchema={Yup.object({
              barcode: Yup.string()
                .min(15, 'Must be at least 12 digits')
                .required('required'),
            })}
            onSubmit={async (values) => {
              dispatch(createCheckIn(values.barcode.replace(/\D/g, '')));
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              isValid,
              dirty,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container className="check-in-section">
                  <Grid item xs={12} md={6}>
                    <Grid container>
                      <Typography
                        variant="body2"
                        sx={{  fontFamily: "'Libre Franklin' !important",color: "#414141", paddingTop: "8px"}}
                        title="If you did not check in at the restaurant, you may enter the Rubio’s Rewards barcode number located at the bottom of your receipt."
                      >
                        If you did not check in at the restaurant, you may enter
                        the Rubio’s Rewards barcode number located at the bottom
                        of your receipt.
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{  fontFamily: "'Libre Franklin' !important",color: "#414141", paddingTop: "8px"}}
                        title="Receipt codes must be scanned or manually entered within 48 hours of purchase."
                      >
                        Receipt codes must be scanned or manually entered within
                        48 hours of purchase.
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ display: { xs: 'flex', md: 'none' } }}
                      className="receipt-image-box"
                    >
                      <Box
                        component="img"
                        alt="Receipt Image"
                        aria-label="Receipt Image"
                        src={receipt}
                        title="Receipt Image"
                      />
                    </Grid>
                    <Grid
                      style={{ paddingTop: 30, paddingBottom: 10 }}
                      item
                      xs={12}
                    >
                      <TextField
                        aria-label="Rubio's rewards barcode number"
                        name="barcode"
                        placeholder="xx-xxx-xxx-xxxx-x"
                        aria-required="true"
                        title="Rubio's rewards barcode number"
                        value={values.barcode}
                        onChange={handleChange('barcode')}
                        onBlur={handleBlur('barcode')}
                        error={Boolean(touched.barcode && errors.barcode)}
                        helperText={touched.barcode && errors.barcode}
                        InputProps={{
                          inputComponent: NumberFormatCustom as any,
                        }}
                        sx={{ width: '100%' }}
                        className="checkin-field"
                      />
                    </Grid>
                    {/*<Grid item xs={12}>*/}
                    {/*<Typography*/}
                    {/*variant="body2"*/}
                    {/*className="body-text"*/}
                    {/*title="Please enter the 12 or 13 digits numeric barcode at the bottom of*/}
                    {/*your receipt."*/}
                    {/*>*/}
                    {/*Please enter the 12 or 13 digit numeric barcode at the*/}
                    {/*bottom of your receipt.*/}
                    {/*</Typography>*/}
                    {/*</Grid>*/}
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        sx={{  fontFamily: "'Libre Franklin' !important",color: "#414141", paddingTop: "8px"}}
                        title="Please enter the 12 or 13 digit numeric barcode at the bottom of your receipt."
                      >
                        Please enter the 12 or 13 digit numeric barcode at the
                        bottom of your receipt.
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{  fontFamily: "'Libre Franklin' !important",color: "#414141", paddingTop: "8px"}}
                        title="Please ensure that you enter any leading zeroes that may appear in the barcode. e.g. 0600101234124"
                      >
                        Please ensure that you enter any leading zeroes that may
                        appear in the barcode. e.g. 0600101234124
                      </Typography>
                    </Grid>
                    <Grid
                      sx={{ paddingBottom: { xs: '25px', md: 0 } }}
                      item
                      xs={12}
                      sm={8}
                      md={10}
                      lg={10}
                    >
                      <Button
                        aria-label="SUBMIT"
                        title="SUBMIT"
                        type="submit"
                        variant="contained"
                        style={{ marginTop: 20 }}
                        sx={{ width: '100%' }}
                      >
                        SUBMIT
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={5}
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      paddingLeft: '80px',
                    }}
                  >
                    <Box
                      component="img"
                      alt="Receipt Image"
                      aria-label="Receipt Image"
                      src={receipt}
                      title="Receipt Image"
                    />
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </div>
  );
};

export default CheckIn;
