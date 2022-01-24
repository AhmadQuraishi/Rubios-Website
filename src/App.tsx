import './App.css';
import { makeStyles } from '@mui/styles';
import { Routes, Route } from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';

import Home from './pages/home';

const useStyles = makeStyles({
  wapper: {
    maxWidth: 1355,
    minWidth: 375,
    margin: 'auto',
    fontFamily: '',
  },
});

function App(props: any) {
  const classes = useStyles();
  return (
    <div className={classes.wapper}>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/order" element={<Home />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;
