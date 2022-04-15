import React, { useEffect, Fragment, useState } from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteBillingAccount,
  updateBillingAccount,
} from '../../redux/actions/user';
// import { BillingAccount, ResponseUserBillingAccounts } from '../../types/olo-api';
import LoadingBar from '../loading-bar';
import DialogBox from '../../components/dialog-box';

const CreditCards = () => {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<any>(null);
  const [billingAccounts, setBillingAccounts] = useState([]);
  const dispatch = useDispatch();
  const { userBillingAccounts, loading } = useSelector(
    (state: any) => state.userReducer,
  );
  useEffect(() => {
    if (userBillingAccounts) {
      setBillingAccounts(userBillingAccounts.billingaccounts);
    }
  }, [userBillingAccounts, loading]);

  const deleteBillingAccountHandler = (id: number) => {
    dispatch(deleteBillingAccount(id));
  };

  const makeBillingCardDefaultHandler = (isdefault: boolean, id: any) => {
    const obj = {
      isdefault: isdefault,
    };
    dispatch(updateBillingAccount(obj, id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (id: any) => {
    setDeleteId(id)
    setOpen(true);
  };

  const handleDeleteFunction = () => {
    deleteBillingAccountHandler(deleteId);
    setOpen(false);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <DialogBox
          open={open}
          handleClose={handleClose}
          message={'Do You Really Want To Delete This Credit Card?'}
          handleDeleteFunction={() => handleDeleteFunction()}
        />
        <Grid container spacing={3} className="credit-cards-panel">
          {loading && <LoadingBar />}
          {!loading && billingAccounts.length < 1 && (
            <h6>No Billing Account Found</h6>
          )}
          {!loading &&
            billingAccounts.length > 0 &&
            billingAccounts
              .filter((cardType: any) => cardType.accounttype === 'creditcard')
              .map((cardData: any, index) => (
                <Fragment key={index}>
                  <Grid item xs={12} md={6}>
                    <Card className="card-panel">
                      <Grid container>
                        <Grid item xs={2}>
                          <img
                            src={require('../../assets/imgs/cc-card-unselected.png')}
                            alt="Credit card icon"
                            title="Credit card icon"
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <CardContent className="panel">
                            <Typography
                              variant="h6"
                              title={cardData.accounttype}
                            >
                              {cardData.isdefault ? (
                                <Fragment>
                                  <b>DEFAULT</b> {cardData.accounttype}
                                </Fragment>
                              ) : (
                                `${cardData.accounttype}`
                              )}
                            </Typography>
                            <Typography
                              variant="h6"
                              title={cardData.description}
                            >
                              {cardData.description}
                            </Typography>
                            <Typography
                              variant="h6"
                              title={cardData.expiration}
                            >
                              {cardData.expiration}
                            </Typography>
                          </CardContent>
                        </Grid>
                        <Grid item xs={12} className="order-Link">
                          {/* <Link
                        title="Edit"
                        aria-label="Edit card"
                        to={`/account/updatepaymentcard/${cardData.accountid}`}
                      >
                        Edit
                      </Link> */}
                          {cardData.removable ? (
                            <Button title="Delete" onClick={() => handleClickOpen(cardData.accountidstring)}>
                              Delete
                            </Button>
                          ) : null}

                          {!cardData.isdefault && (
                            <Button
                              title="Make default"
                              className="default"
                              onClick={() =>
                                makeBillingCardDefaultHandler(
                                  true,
                                  cardData.accountidstring,
                                )
                              }
                            >
                              Make default
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Fragment>
              ))}
          <Grid item xs={12}></Grid>
          {/* <Grid item xs={12} md={6} sx={{ paddingTop: '0px !important' }}>
            <Link
              title="Add Card"
              aria-label="Add payment card"
              to="/account/updatepaymentcard"
              className="button-add-card"
            >
              ADD CARD
            </Link>
          </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreditCards;
