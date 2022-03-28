import { Grid, Typography } from '@mui/material';
import moment from 'moment';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountHistory } from '../../redux/actions/account-history';
import HistorySkeletonUI from '../history-grid-skeleton-ui';

const HistoryGrid = () => {
  const dispatch = useDispatch();
  const { accountHistory, loading } = useSelector(
    (state: any) => state.accountHistoryReducer,
  );
  useEffect(() => {
    dispatch(getAccountHistory());
  }, []);

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        {loading && <HistorySkeletonUI />}
        {!loading && accountHistory.length == 0 && (
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
            }}
          >
            You don't have any Account History
          </Typography>
        )}
        {!loading && accountHistory && accountHistory.length > 0 && (
          <Grid container spacing={0}>
            <Grid
              item
              xs={0}
              sm={3}
              sx={{
                fontFamily: 'Poppins-Bold',
                textTransform: 'uppercase',
                borderBottom: '1px solid #CCC',
                borderTop: '1px solid #CCC',
                padding: '10px 0',
                fontSize: '14px',
                color: 'secondary.main',
                display: { xs: 'none', sm: 'grid' },
              }}
            >
              Date
            </Grid>

            <Grid
              item
              xs={4}
              sm={3}
              sx={{
                fontFamily: 'Poppins-Bold',
                textTransform: 'uppercase',
                borderBottom: '1px solid #CCC',
                borderTop: '1px solid #CCC',
                padding: '10px 0',
                fontSize: '14px',
                color: 'secondary.main',
              }}
            >
              Category
            </Grid>

            <Grid
              item
              xs={8}
              sm={6}
              sx={{
                fontFamily: 'Poppins-Bold',
                textTransform: 'uppercase',
                borderBottom: '1px solid #CCC',
                borderTop: '1px solid #CCC',
                padding: '10px 0',
                fontSize: '14px',
                color: 'secondary.main',
              }}
            >
              Activity
            </Grid>
            {accountHistory.map((item: any, index: number) => (
              <Fragment key={Math.random() + index}>
                <Grid
                  item
                  xs={0}
                  sm={3}
                  sx={{
                    fontFamily: 'Poppins-Medium',
                    fontWeight: '500',
                    borderBottom: '1px solid #CCC',
                    padding: '10px 0',
                    fontSize: '10px',
                    color: 'secondary.main',
                    display: { xs: 'none', sm: 'grid' },
                  }}
                >
                  {moment(item.date).format('MM/DD/YYYY')}
                </Grid>
                <Grid
                  item
                  key={index + '-col2'}
                  xs={4}
                  sm={3}
                  sx={{
                    fontFamily: 'Poppins-Medium',
                    fontWeight: '500',
                    borderBottom: '1px solid #CCC',
                    padding: '10px 0',
                    fontSize: '10px',
                    color: 'secondary.main',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ display: { xs: 'block', sm: 'none' } }}
                  >
                    {moment(item.date).format('MM/DD/YYYY')}
                  </Typography>
                  {item.event_title}
                </Grid>
                <Grid
                  item
                  key={index + '-col3'}
                  xs={8}
                  sm={6}
                  sx={{
                    fontFamily: 'Poppins-Medium',
                    fontWeight: '500',
                    borderBottom: '1px solid #CCC',
                    padding: '10px 0',
                    fontSize: '10px',
                    color: 'secondary.main',
                  }}
                >
                  {item.description}
                </Grid>
              </Fragment>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default HistoryGrid;
