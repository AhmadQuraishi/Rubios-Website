import { Typography, useTheme } from '@mui/material';
import StoreInfoBar from '../../components/store-info-bar/';
const Home = () => {
  const theme = useTheme();
  return (
    <>
      <StoreInfoBar />
      <Typography
        variant="h4"
        color={theme.palette.primary.main}
        textAlign="center"
        padding="40px"
      >
        Rubio's Website - Ordering Page
      </Typography>
    </>
  );
};

export default Home;
