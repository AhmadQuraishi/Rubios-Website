import './App.css';
import { useLocation } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import { Fragment, useLayoutEffect, useMemo, useState } from 'react';
import AppRoutes from './routes';
import { Grid } from '@mui/material';
import LeftMenuBar from './components/left-menu-bar';

function App(props: any) {
  const location = useLocation();
  const [isAccountSection, setIsAccountSection] = useState(true);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.href.toLocaleLowerCase().indexOf('/account') != -1) {
      setIsAccountSection(true);
    } else {
      setIsAccountSection(false);
    }
  }, [location.pathname]);

  const AppRoutesComponent = useMemo(() => <AppRoutes />, []);

  return (
    <div id="wapper">
      {process.env.APP_BASENAME}
      <Header removeCart={isAccountSection} />
      <main>
        {isAccountSection ? (
          <Fragment>
            <Grid container spacing={0}>
              <Grid
                item
                xs={0}
                sm={3}
                lg={2}
                sx={{ display: { xs: 'none', sm: 'grid' } }}
              >
                <LeftMenuBar />
              </Grid>
              <Grid
                item
                xs={12}
                sm={9}
                lg={10}
                sx={{ padding: { xs: '30px 10px', sm: '30px 40px' } }}
              >
                {AppRoutesComponent}
              </Grid>
            </Grid>
          </Fragment>
        ) : (
          { AppRoutesComponent }
        )}
      </main>
      <Footer />
    </div>
  );
}
export default App;
