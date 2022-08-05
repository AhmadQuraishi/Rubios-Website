import { Card, Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import Page from '../../components/page-title';
import './index.css';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 20px 40px 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 0px 40px 0px',
    },
    maxWidth: '1260px',
    boxSizing: 'border-box',
    margin: 'auto',
  },
  heading: {
    paddingBottom: '5px',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      fontSize: '25px !important',
    },
  },
}));

const RewardPoints = () => {
  const classes = useStyles();
  return (
    <Page title={'Reward Points'} className="">
      <Grid container className={classes.root} id="reward-points-container">
        <Grid item xs={12}>
          <Typography
            variant="h1"
            className={classes.heading}
            title="My Rewards"
          >
            My Rewards
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card className="reward-point-panel">
            <p aria-label="you have got">You've Got</p>
            <p className="bold-title">400 Points</p>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h2"
            className="small-heading"
            title="Avialable Rewards"
          >
            Available Rewards{' '}
            <span aira-label="help Icon" className="help-icon">
              ?
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6} md={4} className="pp-oo">
              <Card className="reward-point-merge-panel">
                <Link to="/account/rewardpoints/detail">
                  <Grid container className="content-panel">
                    <Grid item xs={12} lg={5} className="img-panel">
                      <img
                        src={require('../../assets/imgs/temp-pic.png')}
                        alt=""
                      />
                    </Grid>
                    <Grid item xs={12} lg={7} className="content-panel-desc">
                      <Grid
                        container
                        sx={{ height: { xs: 'auto', lg: '100%' } }}
                      >
                        <Grid
                          item
                          xs={12}
                          sx={{
                            height: '60%',
                            paddingBottom: { xs: '0px', md: '5px' },
                          }}
                        >
                          <p
                            aria-label="Free Drink"
                            title="Free Drink Free Drink Free Drink Free Drink"
                            className="title-heading"
                          >
                            Free Drink
                          </p>
                          <p className="expire">Expires 8/8</p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{
                            height: '40%',
                            display: 'flex',
                            alignItems: 'end',
                          }}
                        >
                          <p className="button">REDEEM IN RESTURANT</p>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Link>
              </Card>
            </Grid>
            <Grid item xs={6} md={4} className="pp-oo">
              <Card className="reward-point-merge-panel">
                <Link to="/account/rewardpoints/detail">
                  <Grid container className="content-panel">
                    <Grid item xs={12} lg={5} className="img-panel">
                      <img
                        src={require('../../assets/imgs/temp-pic.png')}
                        alt=""
                      />
                    </Grid>
                    <Grid item xs={12} lg={7} className="content-panel-desc">
                      <Grid
                        container
                        sx={{ height: { xs: 'auto', lg: '100%' } }}
                      >
                        <Grid
                          item
                          xs={12}
                          sx={{
                            height: '60%',
                            paddingBottom: { xs: '0px', md: '5px' },
                          }}
                        >
                          <p
                            aria-label="Free Drink"
                            title="Free Drink Free Drink Free Drink Free Drink"
                            className="title-heading"
                          >
                            Free Drink 10% Off
                          </p>
                          <p className="expire">Expires 8/8</p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{
                            height: '40%',
                            display: 'flex',
                            alignItems: 'end',
                          }}
                        >
                          <p className="button">REDEEM IN RESTURANT</p>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Link>
              </Card>
            </Grid>
            <Grid item xs={6} md={4} className="pp-oo">
              <Card className="reward-point-merge-panel">
                <Link to="/account/rewardpoints/detail">
                  <Grid container className="content-panel">
                    <Grid item xs={12} lg={5} className="img-panel">
                      <img
                        src={require('../../assets/imgs/temp-pic.png')}
                        alt=""
                      />
                    </Grid>
                    <Grid item xs={12} lg={7} className="content-panel-desc">
                      <Grid
                        container
                        sx={{ height: { xs: 'auto', lg: '100%' } }}
                      >
                        <Grid item xs={12} style={{ height: '60%' }}>
                          <p
                            aria-label="Free Drink"
                            title="Free Drink Free Drink Free Drink Free Drink"
                            className="title-heading"
                          >
                            Free Drink
                          </p>
                          <p className="expire">Expires 8/8</p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{
                            height: '40%',
                            display: 'flex',
                            alignItems: 'end',
                          }}
                        >
                          <p className="button">REDEEM IN RESTURANT</p>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Link>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <hr />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: { xs: '30px', sm: '0px' } }}>
          <Typography
            variant="h2"
            className="small-heading"
            title="ARedeem Points"
          >
            Redeem Points{' '}
            <span aira-label="help Icon" className="help-icon">
              ?
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" className="bold-title dd" title="400 Points">
            400 Points
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: { xs: '25px', md: '20px' } }}>
          <Grid container>
            <Grid item xs={6} md={4} className="pp-oo">
              <Card className="reward-point-merge-panel">
                <Link to="/account/rewardpoints/detail">
                  <Grid container className="content-panel">
                    <Grid item xs={12} lg={5} className="img-panel">
                      <img
                        src={require('../../assets/imgs/temp-pic.png')}
                        alt=""
                      />
                    </Grid>
                    <Grid item xs={12} lg={7} className="content-panel-desc">
                      <Grid
                        container
                        sx={{ height: { xs: 'auto', lg: '100%' } }}
                      >
                        <Grid item xs={12} style={{ height: '60%' }}>
                          <p className="points">400 Points</p>
                          <p
                            aria-label="Free Drink"
                            title="Free Drink Free Drink Free Drink Free Drink"
                            className="title-heading"
                          >
                            Free Drink
                          </p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{
                            height: '40%',
                            display: 'flex',
                            alignItems: 'end',
                          }}
                        >
                          <p className="button">REDEEM IN RESTURANT</p>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Link>
              </Card>
            </Grid>
            <Grid item xs={6} md={4} className="pp-oo">
              <Card className="reward-point-merge-panel">
                <Link to="/account/rewardpoints/detail">
                  <Grid container className="content-panel">
                    <Grid item xs={12} lg={5} className="img-panel">
                      <img
                        src={require('../../assets/imgs/temp-pic.png')}
                        alt=""
                      />
                    </Grid>
                    <Grid item xs={12} lg={7} className="content-panel-desc">
                      <Grid
                        container
                        sx={{ height: { xs: 'auto', lg: '100%' } }}
                      >
                        <Grid item xs={12} style={{ height: '60%' }}>
                          <p className="points">400 Points</p>
                          <p
                            aria-label="Free Drink"
                            title="Free Drink Free Drink Free Drink Free Drink"
                            className="title-heading"
                          >
                            Free Drink
                          </p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{
                            height: '40%',
                            display: 'flex',
                            alignItems: 'end',
                          }}
                        >
                          <p className="button">REDEEM IN RESTURANT</p>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Link>
              </Card>
            </Grid>
            <Grid item xs={6} md={4} className="pp-oo">
              <Card className="reward-point-merge-panel">
                <Link to="/account/rewardpoints/detail">
                  <Grid container className="content-panel">
                    <Grid item xs={12} lg={5} className="img-panel">
                      <img
                        src={require('../../assets/imgs/temp-pic.png')}
                        alt=""
                      />
                    </Grid>
                    <Grid item xs={12} lg={7} className="content-panel-desc">
                      <Grid
                        container
                        sx={{ height: { xs: 'auto', lg: '100%' } }}
                      >
                        <Grid item xs={12} style={{ height: '60%' }}>
                          <p className="points">400 Points</p>
                          <p
                            aria-label="Free Drink"
                            title="Free Drink Free Drink Free Drink Free Drink"
                            className="title-heading"
                          >
                            Free Drink
                          </p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{
                            height: '40%',
                            display: 'flex',
                            alignItems: 'end',
                          }}
                        >
                          <p className="button">REDEEM IN RESTURANT</p>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Link>
              </Card>
            </Grid>
            <Grid item xs={6} md={4} className="pp-oo">
              <Card className="reward-point-merge-panel">
                <Link to="/account/rewardpoints/detail">
                  <Grid container className="content-panel">
                    <Grid item xs={12} lg={5} className="img-panel">
                      <img
                        src={require('../../assets/imgs/temp-pic.png')}
                        alt=""
                      />
                    </Grid>
                    <Grid item xs={12} lg={7} className="content-panel-desc">
                      <Grid
                        container
                        sx={{ height: { xs: 'auto', lg: '100%' } }}
                      >
                        <Grid item xs={12} style={{ height: '60%' }}>
                          <p className="points">400 Points</p>
                          <p
                            aria-label="Free Drink"
                            title="Free Drink Free Drink Free Drink Free Drink"
                            className="title-heading"
                          >
                            Free Drink
                          </p>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{
                            height: '40%',
                            display: 'flex',
                            alignItems: 'end',
                          }}
                        >
                          <p className="button">REDEEM IN RESTURANT</p>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Link>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <hr className="low" />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h3"
            className="bold-title dd disable"
            title="700 Points"
          >
            700 Points
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: { xs: '25px', md: '20px' } }}>
          <Grid container>
            <Grid item xs={6} md={4} className="pp-oo">
              <Card className="reward-point-merge-panel">
                <Grid container className="content-panel">
                  <Grid item xs={12} lg={5} className="img-panel">
                    <img
                      src={require('../../assets/imgs/temp-pic.png')}
                      alt=""
                    />
                  </Grid>
                  <Grid item xs={12} lg={7} className="content-panel-desc">
                    <Grid container sx={{ height: { xs: 'auto', lg: '100%' } }}>
                      <Grid item xs={12} style={{ height: '60%' }}>
                        <p className="points">700 Points</p>
                        <p
                          aria-label="Free Drink"
                          title="Free Drink Free Drink Free Drink Free Drink"
                          className="title-heading"
                        >
                          Free Drink
                        </p>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{
                          height: '40%',
                          display: 'flex',
                          alignItems: 'end',
                        }}
                      >
                        <p className="button disable">REDEEM IN RESTURANT</p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={6} md={4} className="pp-oo">
              <Card className="reward-point-merge-panel">
                <Grid container className="content-panel">
                  <Grid item xs={12} lg={5} className="img-panel">
                    <img
                      src={require('../../assets/imgs/temp-pic.png')}
                      alt=""
                    />
                  </Grid>
                  <Grid item xs={12} lg={7} className="content-panel-desc">
                    <Grid container sx={{ height: { xs: 'auto', lg: '100%' } }}>
                      <Grid item xs={12} style={{ height: '60%' }}>
                        <p className="points">700 Points</p>
                        <p
                          aria-label="Free Drink"
                          title="Free Drink Free Drink Free Drink Free Drink"
                          className="title-heading"
                        >
                          Free Drink
                        </p>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{
                          height: '40%',
                          display: 'flex',
                          alignItems: 'end',
                        }}
                      >
                        <p className="button disable">REDEEM IN RESTURANT</p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={7} className="message-panel">
          <h3>HOW TO REDEEM YOUR REWARDS</h3>
          <p className="low-head">In-RESTAURANT ORDERS</p>
          <p>
            Click "Redeem in Restaurant" above and then scan the QR code at the
            register.
          </p>
          <p className="low-head" style={{ marginTop: '20px' }}>
            Online/App Orders
          </p>
          <p>
            Select from your Available Rewards on the checkout screen to apply
            the reward.
          </p>
          <p style={{ paddingTop: '5px' }}>
            <strong>NOTE:</strong> Please be sure to add the free menu item to
            your order before applying the reward.
          </p>
          <p className="back-link" onClick={(e) => window.scrollTo(0, 0)}>
            RETURN TO TOP
          </p>
        </Grid>
      </Grid>
    </Page>
  );
};
export default RewardPoints;
