import { Grid, Typography, Tabs, Box, Tab, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { getAccountHistory } from '../../redux/actions/account-history';
import Page from '../page-title';
import CheckInGrid from './filter-grid/checkin/index';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
  // padding: '0px 20px 40px 20px',
    maxWidth: '1260px',
    boxSizing: 'border-box',
    margin: 'auto',
  },
  heading: {
    paddingBottom: '5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '25px !important',
    },
  },
  tabspanel: {
    fontFamily: 'Poppins-Medium !important',
    fontSize: '14px !important',
    color: theme.palette.secondary.main + ' !important',
    paddingLeft: '0px !important',
    paddingRight: '0px !important',
    marginRight: '40px !important',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
 
  const { children, value, index, ...other } = props;

  return (
    <Page title={'Account History'} className="">
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ padding: '20px 0' }}>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    </Page>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const HistoryGrid = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const [ event_filter,setEventFilter] = useState("checkins");
  useEffect(() => {
    dispatch(getAccountHistory(event_filter));
  }, [event_filter]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log('newValue', newValue)
    if(newValue===0){
        setEventFilter("checkins")
    }
    if(newValue===1){
        setEventFilter("rewards")
    }
    if(newValue===2){
        setEventFilter("reward_credits")
    }
    if(newValue===3){
      setEventFilter("redemptions")
  }
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Box>
            <Tabs
            variant="scrollable"
              value={value}
              allowScrollButtonsMobile
              onChange={handleChange}
              scrollButtons
            //   aria-label="Account History Tabs"
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#79C043',
                  bottom: '0px',
                },
              }}
            >
              <Tab
                label="Checkins"
                className={classes.tabspanel}
                title="Checkins"
                sx={{
                  fontFamily: 'Poppins-Medium !important',
                  //padding: '10px 0px',
                }}
                {...a11yProps(0)}
                tabIndex={0}
                aria-label="Checkins"
              />
              <Tab
                className={classes.tabspanel}
                sx={{
                  amily: 'Poppins-Medium !important',
                  //padding: '10px 0px',

                }}
                label="Rewards"
                title="Rewards"
                tabIndex={1}
                {...a11yProps(1)}
                aria-label="Rewards"
              />
              <Tab
                label="Reward Credit"
                sx={{
                  fontFamily: 'Poppins-Medium !important',
                  //padding: '10px 0px',

                }}
                className={classes.tabspanel}
                title="Reward Credit"
                tabIndex={2}
                {...a11yProps(2)}
                aria-label="Reward Credit"
              />
              <Tab
                className={classes.tabspanel}
                sx={{
                  fontFamily: 'Poppins-Medium !important',
                  //padding: '10px 0px',
                }}
                label="Redemption"
                title="Redemption"
                {...a11yProps(3)}
                tabIndex={3}
                aria-label="Redemption"
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <CheckInGrid />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CheckInGrid />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CheckInGrid />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <CheckInGrid />
          </TabPanel>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default HistoryGrid;
