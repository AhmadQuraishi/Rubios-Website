import { Grid, Typography, Tabs, Box, Tab } from '@mui/material';
import { useState } from 'react';
import LeftMenuBar from '../../components/left-menu-bar';
import { Fragment } from 'react';

import HistoryGrid from '../../components/history-grid';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
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

  return (
    <Fragment>
      <Typography
        variant="h4"
        title="Account History"
        sx={{
          paddingBottom: '10px',
          color: 'secondary.main',
          fontWeight: 700,
          fontFamily: 'Poppins-Bold !important',
          textTransform: 'uppercase',
        }}
      >
        Account History
      </Typography>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Account History Tabs"
          indicatorColor="primary"
        >
          <Tab label="All History" title="All History" {...a11yProps(0)} />
          <Tab
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
        <HistoryGrid />
      </TabPanel>
    </Fragment>
  );
};

export default AccountHistory;
