import { Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';

import Header from './components/header/';
import Footer from './components/footer/';
import CategoryList from './pages/category';
import Login from './pages/login';
import Welcome from './pages/welcomeScreen';
import Location from './pages/location';
import RewardConfirmation from './pages/rewardConfirmation';
import OrderConfirmation from './pages/orderConfirmation';

function App(props: any) {
  return (
    <Container
      sx={{ padding: '0 !important', minWidth: '375px' }}
      maxWidth="xl"
    >
      <Box sx={{ height: '100vh' }}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<CategoryList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/location" element={<Location />} />
            <Route path="/confirmationReward" element={<RewardConfirmation />} />
            <Route path="/orderConfirmation" element={<OrderConfirmation />} />
          </Routes>
        </main>
        <Footer />
      </Box>
    </Container>
  );
}
export default App;
