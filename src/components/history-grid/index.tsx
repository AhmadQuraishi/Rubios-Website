import { Grid } from '@mui/material';

const HistoryGrid = () => {
  const data = [
    {
      date: '12/07/2021',
      category: 'Item Gifted',
      activity: "Gifted from Rubio's website on 50% off",
    },
    {
      date: '13/07/2021',
      category: 'Refund',
      activity: 'Refund $123.0 on order #RW33456',
    },
    {
      date: '06/12/2021',
      category: 'Item Gifted',
      activity: "Gifted from Rubio's website on 50% off",
    },
    {
      date: '12/12/2021',
      category: 'Item Gifted',
      activity: "Gifted from Rubio's website on 50% off",
    },
  ];
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Grid container spacing={0}>
          <Grid
            item
            xs={0}
            sm={3}
            sx={{
              fontWeight: '700',
              textTransform: 'uppercase',
              borderBottom: '1px solid #CCC',
              borderTop: '1px solid #CCC',
              padding: '10px 0',
              fontSize: '14px',
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
              fontWeight: '700',
              textTransform: 'uppercase',
              borderBottom: '1px solid #CCC',
              borderTop: '1px solid #CCC',
              padding: '10px 0',
              fontSize: '14px',
            }}
          >
            Category
          </Grid>
          <Grid
            item
            xs={8}
            sm={6}
            sx={{
              fontWeight: '700',
              textTransform: 'uppercase',
              borderBottom: '1px solid #CCC',
              borderTop: '1px solid #CCC',
              padding: '10px 0',
              fontSize: '14px',
            }}
          >
            Activity
          </Grid>
          {data.map((item, index) => (
            <>
              <Grid
                item
                key={index}
                xs={0}
                sm={3}
                sx={{
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid #CCC',
                  padding: '10px 0',
                  fontSize: '12px',
                  color: 'secondary.main',
                  display: { xs: 'none', sm: 'grid' },
                }}
              >
                {item.date}
              </Grid>
              <Grid
                item
                xs={4}
                sm={3}
                sx={{
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid #CCC',
                  padding: '10px 0',
                  fontSize: '12px',
                  color: 'secondary.main',
                }}
              >
                {item.category}
              </Grid>
              <Grid
                item
                xs={8}
                sm={6}
                sx={{
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid #CCC',
                  padding: '10px 0',
                  fontSize: '12px',
                  color: 'secondary.main',
                }}
              >
                {item.activity}
              </Grid>
            </>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HistoryGrid;
