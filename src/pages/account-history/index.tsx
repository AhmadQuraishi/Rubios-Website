import { Grid, Typography, Tabs, Box, Tab, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { Fragment } from 'react';

import HistoryGrid from '../../components/history-grid';
import Page from '../../components/page-title';
import TransactionHistory from '../../components/transaction-history';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 20px 40px 20px',
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

const AccountHistory = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography
            variant="h1"
            className={classes.heading}
            title="Account History"
          >
            ACCOUNT HISTORY
          </Typography>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Account History Tabs"
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#79C043',
                  bottom: '5px',
                },
              }}
            >
              <Tab
                label="Rewards History"
                className={classes.tabspanel}
                title="Rewards Historyy"
                {...a11yProps(0)}
              />
              <Tab
                className={classes.tabspanel}
                label="Transaction History"
                title="Transaction History"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <HistoryGrid />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TransactionHistory />
          </TabPanel>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AccountHistory;
