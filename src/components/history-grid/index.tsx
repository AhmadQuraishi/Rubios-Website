import { Grid, Typography, Tabs, Box, Tab, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { getAccountHistory } from '../../redux/actions/account-history';
import Page from '../page-title';
import './index.css'
import CheckInGrid from './rewards-redemptions/index';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
  // padding: '0px 20px 40px 20px',
    maxWidth: '1260px',
    boxSizing: 'border-box',
    //margin: 'auto',
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
  const [ event_filter,setEventFilter] = useState("rewards");
  useEffect(() => {
    dispatch(getAccountHistory(event_filter));
  }, [event_filter]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log('newValue', newValue)
    if(newValue===0){
        setEventFilter("rewards")
    }
    if(newValue===1){
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
                className={classes.tabspanel}
                sx={{
                  amily: 'Poppins-Medium !important',
                  //padding: '10px 0px',

                }}
                label="Rewards"
                title="Rewards"
                tabIndex={1}
                {...a11yProps(0)}
                aria-label="Rewards"
              />
              <Tab
                className={classes.tabspanel}
                sx={{
                  fontFamily: 'Poppins-Medium !important',
                  //padding: '10px 0px',
                }}
                label="Redemption"
                title="Redemption"
                {...a11yProps(1)}
                tabIndex={2}
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
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default HistoryGrid;
