import { Grid, Box, Button, TextField, Typography, Theme } from '@mui/material';
import receipt from '../../assets/imgs/receipt.png';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './check-in.css';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { createCheckIn } from '../../redux/actions/check-in';
import { IMaskInput } from 'react-imask';
import { forwardRef } from 'react';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 15px',
    maxWidth: '990px',
    boxSizing: 'border-box',
  },
  heading: {
    paddingBottom: '0px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '25px !important',
    },
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
  return (
    <div className={classes.root}>
      <Typography className={classes.heading} variant="h4" title="CHECK-IN">
        CHECK-IN
      </Typography>
      <Grid container>
        <Grid item md={10}>
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
                  <Grid item xs={12} md={5}>
                    <Grid container>
                      <Typography
                        variant="body2"
                        className="body-text"
                        title="To check-in for your visit , Enter the Rubio's Rewards barcode
              number located at the bottom of your receipt."
                      >
                        To check-in for your visit , Enter the Rubio's Rewards
                        barcode number located at the bottom of your receipt.
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
                    <Grid item xs={12}>
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
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        className="body-text"
                        title="Please enter the 12 or 13 digits numeric barcode at the bottom of
              your receipt."
                      >
                        Please enter the 12 or 13 digit numeric barcode at the
                        bottom of your receipt.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        className="body-text"
                        title="Please ensure that you enter any leading zeros that may appear in
              the barcode e.g 0600101234124."
                      >
                        Please ensure that you enter any leading zeros that may
                        appear in the barcode e.g 0600101234124.
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8} md={10} lg={10}>
                      <Button
                        aria-label="SUBMIT"
                        title="SUBMIT"
                        type="submit"
                        variant="contained"
                        sx={{ width: '100%' }}
                      >
                        SUBMIT
                      </Button>
                    </Grid>
                  </Grid>

                  {/*column for space*/}
                  <Grid item xs={0} md={2} />

                  <Grid
                    item
                    xs={12}
                    md={5}
                    sx={{ display: { xs: 'none', md: 'flex' } }}
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
