import logo from '../../assets/imgs/logo.svg';
import menuicon from '../../assets/imgs/menu-icon.svg';
import cart from '../../assets/imgs/cart-icon.svg';

import { Grid, Typography, Link } from '@mui/material';

const Header = () => {
  return (
    <header>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Link
            href="#"
            sx={{
              padding: {
                lg: '18px 70px',
                md: '18px 0 14px 30px',
                xs: '18px 0 14px 20px',
              },
              display: 'flex',
              maxWidth: {
                md: '236px',
                xs: '186px',
              },
            }}
          >
            <img
              aria-label="Rubio's Cosatal Grill"
              src={logo}
              style={{ display: 'flex', width: '100%' }}
              alt="Rubio's Cosatal Grill"
            />
          </Link>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            href="#"
            sx={{
              textTransform: 'uppercase',
              display: { xs: 'none', md: 'flex' },
              padding: '30px 20px 0px 0px',
              color: 'primary.main',
              fontFamily: 'Poppins-Medium !important',
              textDecoration: 'none',
              fontSize: '14px',
              '&:hover': {
                color: 'success.main',
              },
            }}
          >
            Main Menu
          </Link>
          <Typography
            component="div"
            sx={{
              backgroundColor: 'primary.main',
              width: '140px',
              cursor: 'pointer',
              float: 'right',
              justifyContent: 'center',
              display: { xs: 'none', md: 'flex' },
              '&:hover': {
                backgroundColor: 'success.main',
              },
            }}
          >
            <img src={cart} style={{ width: '38px' }} alt="Cart Icon" />
          </Typography>
          <Typography component="div"></Typography>
        </Grid>
      </Grid>
    </header>
  );
};

export default Header;
