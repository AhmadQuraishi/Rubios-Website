import React from 'react';
import { Grid, Typography } from '@mui/material';

export const ItemsNotAvailableComponent = ({ items }: any) => {
  return (
    <Grid>
      <Grid
        xs={12}
        sm={12}
        md={12}
        lg={12}
        sx={{
          textAlign: 'center',
          // marginTop: { xs: '10%', lg: '5%', md: '5%', sm: '10%' },
          // marginBottom: '5%',
          // marginLeft: { xs: '5%', lg: '20%' },
          // marginRight: { xs: '5%', lg: '20%' },
        }}
      >
        <Grid xs={12} sm={12} md={12} lg={12}>
          <Typography
            sx={{
              lineHeight: '1.1 !important',
              textAlign: 'center',
              color: '#214F66',
              fontSize: {xs: "32px !important", lg: '27px !important', md: '27px !important', sm:'27px !important'},
              fontWeight: '900',
              fontFamily: 'Poppins-Bold, sans-serif !important',
            }}
          >
            SORRY, SOME ITEMS AREN'T AVAILABLE AT YOUR NEW LOCATION.
          </Typography>
          <br />
          <Typography
            sx={{
              textAlign: 'center',
              marginTop: "-3px",
              fontSize: {xs: "15px !important", lg: '14px !important', md: '14px !important', sm:'14px !important'},
              fontFamily: 'Poppins-Regular, sans-serif !important',
            }}
          >
            If you switch locations, the following items will be removed.
          </Typography>
          <br />
          {items?.map((productName: string, index: number) => {
            return (
              <>
                <Typography
                  key={index}
                  sx={{
                    textAlign: 'center',
                    color: '#214F66',
                    fontSize: '14px !important',
                    fontWeight: '600',
                    fontFamily: 'Poppins-Regular, sans-serif !important',
                  }}
                >
                  {productName}
                </Typography>
                <br />
              </>
            );
          })}
          <br />
        </Grid>
      </Grid>
    </Grid>
  );
};
