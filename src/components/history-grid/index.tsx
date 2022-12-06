import { Grid, Typography, Tabs, Box, Tab, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { getAccountHistory } from '../../redux/actions/account-history';
import Page from '../page-title';
import './index.css'
import RewardsGrid from './rewards-redemptions/index';

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
          <Box sx={{ padding: '0px 0' }}>
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
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            <RewardsGrid />
          </TabPanel>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default HistoryGrid;
