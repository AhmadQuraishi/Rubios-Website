import { Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';

import Header from './components/header/';
import Footer from './components/footer/';
import CategoryList from './pages/category';
import Login from './pages/login/login';
import Welcome from './pages/welcomeScreen/welcome';
import Location from './pages/location';

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
          </Routes>
        </main>
        <Footer />
      </Box>
    </Container>
  );
}
export default App;
