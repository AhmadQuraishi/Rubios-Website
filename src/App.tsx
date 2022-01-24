import './App.css';

import { Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/home';

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
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </Box>
    </Container>
  );
}
export default App;
