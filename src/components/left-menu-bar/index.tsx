import { Box } from '@mui/material';
import AccountLinks from '../account-links';
const LeftMenuBar = () => {
  return (
    <Box
      sx={{
        boxShadow: 2,
        width: '100%',
        bgcolor: 'background.paper',
        height: '100%',
      }}
    >
      <AccountLinks />
    </Box>
  );
};

export default LeftMenuBar;
