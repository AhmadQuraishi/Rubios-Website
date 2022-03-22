import './App.css';
import { useLocation } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import { useLayoutEffect, useState } from 'react';
import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setPageStateRequest } from './redux/actions/page-state';
import { useDispatch } from 'react-redux';

function App(props: any) {
  const location = useLocation();
  const [isAccountSection, setIsAccountSection] = useState(false);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.href.toLocaleLowerCase().indexOf('/account') != -1) {
      setIsAccountSection(true);
    } else {
      setIsAccountSection(false);
    }
    if (
      window.location.href.toLocaleLowerCase().indexOf('/login') != -1 ||
      window.location.href.toLocaleLowerCase().indexOf('/signup') != -1
    ) {
      //dispatch(setPageStateRequest(undefined));
    } else {
      dispatch(
        setPageStateRequest(window.location.href.replace(/.*\/\/[^\/]*/, '')),
      );
    }
  }, [location.pathname]);

  return (
    <div id="wapper">
      <Header
        removeCartForLocation={
          window.location.href.toLocaleLowerCase().indexOf('/location') != -1
        }
        showUserName={isAccountSection}
        removeCart={
          isAccountSection ||
          window.location.href.toLocaleLowerCase().indexOf('/checkout') != -1
        }
      />
      <main>
        <ToastContainer />
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
                sx={{ padding: { xs: '30px 20px', sm: '30px 40px' } }}
              >
                <AppRoutes />
              </Grid>
            </Grid>
          </Fragment>
        ) : (
          <AppRoutes />
        )}
      </main>
      <Footer />
    </div>
  );
}
export default App;
