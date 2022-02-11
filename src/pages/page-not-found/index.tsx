import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div style={{ padding: '40px 30px', height: '120px', textAlign: 'center' }}>
      <Typography variant="h4">Page Not Found</Typography>
      <br />
      <Typography variant="body1">
        Sorry, that doesn't seem to be a valid URL. Your best bet is to head
        &nbsp;
        <Link to="/" style={{ color: '#7AC142' }}>
          back to the home page!
        </Link>
      </Typography>
    </div>
  );
};
export default PageNotFound;
