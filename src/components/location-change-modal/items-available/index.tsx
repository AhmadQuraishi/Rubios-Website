import React from 'react';
import { Grid, Typography } from '@mui/material';

export const ItemsAvailableComponent = ({ restaurant }: any) => {
  return (
    <Grid>
      <Grid
        xs={12}
        sm={12}
        md={12}
        lg={12}
        sx={{
          textAlign: 'left',
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
              textAlign: 'left',
              color: '#214F66',
              fontSize: '32px',
              fontWeight: '900',
              textAlignLast:'center',
              fontFamily: 'Poppins-Bold, sans-serif !important',
            }}
          >
            LOCATION CHANGED TO
          </Typography>
          <br />
          <br />
          {/*<div*/}
          {/*  style={{*/}
          {/*    boxShadow: '0px 2px 3px 0px rgb(0 0 0 / 20%)',*/}
          {/*    margin: '10px 20px 10px 0px',*/}
          {/*    padding: '20px 12px 5px 20px',*/}
          {/*    border: '1px solid #CCC',*/}
          {/*    overflow: 'hidden',*/}
          {/*  }}*/}
          {/*>*/}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              fontSize: '18px',
              textAlignLast:'center',
              paddingBottom: '5px',
            }}
          >
            {restaurant?.name}
          </Typography>
          <Typography variant="body2" sx={{ textAlignLast:'center', }}>
            {restaurant?.streetaddress}, <br /> {restaurant?.city},{' '}
            {restaurant?.state}, {restaurant?.zip}
          </Typography>
          {restaurant?.distance > 0 && (
            <Typography variant="body2" sx={{ color: '#0069aa',textAlignLast:'center', }}>
              {restaurant.distance} Miles Away
            </Typography>
          )}
          <br />
          <br />
          <br />
        </Grid>
      </Grid>
    </Grid>
  );
};
