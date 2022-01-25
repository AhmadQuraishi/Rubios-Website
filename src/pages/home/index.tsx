import { Typography } from '@mui/material';
const Home = () => {
  return (
    <Typography
      component="div"
      color="primary.main"
      sx={{
        textAlign: 'center',
        padding: '50px 20px',
        boxSizing: 'border-box',
        fontWeight: "bold",
        fontSize: {
          md: '22px',
          xs: '16px',
        },
      }}
    >
      RUBIOS ORDER SECTION - REACTIFIED
    </Typography>
  );
};

export default Home;
