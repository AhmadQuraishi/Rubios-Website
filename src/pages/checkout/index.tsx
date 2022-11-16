import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Grid, Typography, useMediaQuery, useTheme, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import OrderDetails from '../../components/order-details';
import Tip from '../../components/tip';
import Rewards from '../../components/rewards';
import OrderTime from '../../components/order-time';
import PaymentInfo from '../../components/payment-info';
import StoreInfoBar from '../../components/restaurant-info-bar';
import './checkout.css';
import { ResponseBasket, ResponseBasketValidation } from '../../types/olo-api';
import { DeliveryModeEnum } from '../../types/olo-api/olo-api.enums';
import moment from 'moment';
import {
  getBasketAllowedCardsRequest,
  getSingleRestaurantCalendar,
  removeBasketOrderSubmit,
  submitBasketSinglePaymentFailure,
  submitBasketSinglePaymentSuccess,
  updateBasketBillingSchemes,
  validateBasket,
} from '../../redux/actions/basket/checkout';
import { displayToast } from '../../helpers/toast';
import {

  formatCustomFields,
  // formatDeliveryAddress,
  generateSubmitBasketPayload,
  getUniqueId,
  updatePaymentCardsAmount,
} from '../../helpers/checkout';
import {
  getAllBillingAccounts,
  // getUserDeliveryAddresses,
} from '../../redux/actions/user';
import PickupForm from '../../components/pickup-form/index';
import DeliveryForm from '../../components/delivery-form/index';
import { getRewardsForCheckoutRequest } from '../../redux/actions/reward/checkout';
import Page from '../../components/page-title';
import { CreditCardCCSF } from '../../helpers/creditCard';
import { generateCCSFToken } from '../../services/basket';
import { updateGuestUserInfo } from '../../redux/actions/order';
import { navigateAppAction } from '../../redux/actions/navigate-app';
import { getRewardsNew } from '../../redux/actions/reward';
import TagManager from 'react-gtm-module';
import { facebookSendEvent } from '../../redux/actions/facebook-conversion';
import { facebookConversionTypes } from '../../redux/types/facebook-conversion';
import SignUpGuest from '../../components/sign-up-guest';
import { userRegister } from '../../redux/actions/user';
import CheckoutSkeletonUI from '../../components/checkout-skeleton-ui';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const pickupFormRef = React.useRef<any>(null);
  const deliveryFormRef = React.useRef<any>(null);
  const paymentInfoRef = React.useRef<any>();
  const signupFormRef = React.useRef<any>(null);

  const [runOnce, setRunOnce] = React.useState<boolean>(true);
  const [showIframeOnce, setShowIframeOnce] = React.useState<boolean>(true);
  const [removeCreditCardOnce, setRemoveCreditCardOnce] =
    React.useState<boolean>(true);
  const [birthDay, setBirthDay] = useState<Date | undefined>();
  const [showSignUpGuest, setShowSignUpGuest] = React.useState<boolean>(false);
  const [defaultCard, setDefaultCard] = React.useState<boolean>(true);
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [tipPercentage, setTipPercentage] = React.useState<any>(null);
  const [basketAccessToken, setBasketAccessToken] = React.useState<any>('');
  const [basket, setBasket] = React.useState<ResponseBasket>();
  const [billingSchemes, setBillingSchemes] = React.useState<any>([]);
  const [rewards, setRewards] = React.useState<any>([]);
  const [locationId, setLocationId] = useState(null);
  const [validate, setValidate] =
    React.useState<ResponseBasketValidation | null>(null);
  // const [defaultDeliveryAddress, setDefaultDeliveryAddress] =
  //   React.useState<any>(null);
  const [ccsfObj, setccsfObj] = React.useState<any>();

  const basketObj = useSelector((state: any) => state.basketReducer);
  const { authToken } = useSelector((state: any) => state.authReducer);
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const { guestUser } = useSelector((state: any) => state.guestReducer);
  const { rewards: qualifyingRewards, loading: loadingRewards } = useSelector(
    (state: any) => state.getRewardForCheckoutReducer,
  );
  const { data: rewardsRedemptionsData, loading: loadingRedemptions } =
    useSelector((state: any) => state.rewardReducerNew);
  const { restaurant, orderType } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  // const { userDeliveryAddresses } = useSelector(
  //   (state: any) => state.userReducer,
  // );
  const { userBillingAccounts, loading: billingAccountsLoading } = useSelector(
    (state: any) => state.userReducer,
  );
  const { singleLocation } = useSelector((state: any) => state.locationReducer);

  useEffect(() => {
    const LoadExternalScript = () => {
      const externalScript = document.createElement('script');
      // externalScript.onerror = loadError;
      // externalScript.id = 'external';
      // externalScript.async = true;
      // externalScript.type = 'text/javascript';
      // externalScript.setAttribute('crossorigin', 'anonymous');
      document.body.appendChild(externalScript);
      externalScript.src =
        process.env.REACT_APP_NODE_ENV === 'production'
          ? `https://static.olocdn.net/web-client/checkout-web-client/2.5.0/checkout.js`
          : 'https://olocdnsandbox.s3.amazonaws.com/web-client/checkout-web-client/2.5.0/checkout.js';
    };
    LoadExternalScript();
  }, []);

  useEffect(() => {
    if (singleLocation?.data?.length) {
      setLocationId(singleLocation.data[0].location_id);
    }
  }, [singleLocation]);

  useEffect(() => {
    if (qualifyingRewards && qualifyingRewards.length) {
      if (
        rewardsRedemptionsData &&
        Object.keys(rewardsRedemptionsData).length
      ) {
        let finalRewards: any = [];
        let qualifyingIds: any = {};
        qualifyingRewards.forEach((reward: any) => {
          qualifyingIds[reward.reference] = reward;
        });

        console.log('qualifyingIds', qualifyingIds);

        if (
          rewardsRedemptionsData &&
          rewardsRedemptionsData.rewards &&
          rewardsRedemptionsData.rewards.length
        ) {
          rewardsRedemptionsData.rewards.forEach((rew: any) => {
            if (rew.type === 'reward') {
              if (rew.redeemable_id && qualifyingIds[rew.redeemable_id]) {
                finalRewards.push({
                  ...rew,
                  localType: rew.type === 'reward',
                  label: qualifyingIds[rew.redeemable_id].label,
                  membershipid: qualifyingIds[rew.redeemable_id].membershipid,
                  imageurl: qualifyingIds[rew.redeemable_id].imageurl,
                });
                delete qualifyingIds[rew.redeemable_id];
              }
            }
          });
        }
        console.log('finalRewards 1', finalRewards);
        if (
          rewardsRedemptionsData &&
          rewardsRedemptionsData.redeemables &&
          rewardsRedemptionsData.redeemables.length
        ) {
          console.log('im working');
          rewardsRedemptionsData.redeemables.forEach((rew: any) => {
            if (rew.redeemable_id && qualifyingIds[rew.redeemable_id]) {
              finalRewards.push({
                ...rew,
                localType: 'redemption',
                membershipid: qualifyingIds[rew.redeemable_id].membershipid,
                label: qualifyingIds[rew.redeemable_id].label,
                imageurl: qualifyingIds[rew.redeemable_id].imageurl,
              });
              delete qualifyingIds[rew.redeemable_id];
            }
          });
        }
        console.log('finalRewards 2', finalRewards);
        setRewards(finalRewards);
      }
    }
  }, [qualifyingRewards, rewardsRedemptionsData]);

  useEffect(() => {
    const getBasketAccessToken = async () => {
      const body = {
        authtoken:
          authToken && authToken.authtoken && authToken.authtoken !== ''
            ? authToken.authtoken
            : '',
      };
      const baskId =
        basketObj && basketObj.basket && basketObj.basket.id
          ? basketObj.basket.id
          : '';
      const response = await generateCCSFToken(baskId, body);
      if (response && response.accesstoken) {
        setBasketAccessToken(response.accesstoken);
      }
    };
    getBasketAccessToken();
  }, []);

  React.useEffect(() => {
    if (
      basketObj &&
      basketObj.payment.billingSchemes &&
      basketObj.payment.billingSchemes.length &&
      removeCreditCardOnce
    ) {
      let billingArray = basketObj.payment.billingSchemes.filter(
        (account: any) => {
          if (
            account.billingmethod === 'creditcard' &&
            !account.billingaccountid
          ) {
            return false;
          } else {
            return true;
          }
        },
      );
      billingArray = updatePaymentCardsAmount(billingArray, basket);
      dispatch(updateBasketBillingSchemes(billingArray));
      setRemoveCreditCardOnce(false);
    }
  }, []);

  React.useEffect(() => {
    if (basket && runOnce) {
      let selectedTime = moment().format('YYYYMMDD');
      if (basket.timewanted) {
        selectedTime = moment(basket.timewanted, 'YYYYMMDD HH:mm').format(
          'YYYYMMDD',
        );
      }
      dispatch(
        getSingleRestaurantCalendar(
          basket.vendorid,
          selectedTime,
          selectedTime,
        ),
      );
      dispatch(validateBasket(basket.id, null, null, [], null, null));
      dispatch(getBasketAllowedCardsRequest(basket.id));
      dispatch(getAllBillingAccounts());
      dispatch(removeBasketOrderSubmit());
      setRunOnce(false);
    }
  }, [basket]);

  React.useEffect(() => {
    setBillingSchemes(basketObj.payment.billingSchemes);
  }, [basketObj.payment.billingSchemes]);

  React.useEffect(() => {
    if (
      defaultCard &&
      !basketObj?.loading &&
      // validate &&
      basket &&
      basketObj.payment.allowedCards.data &&
      basketObj.payment.allowedCards.data.billingschemes &&
      basketObj.payment.allowedCards.data.billingschemes.length &&
      basketObj.payment &&
      basketObj.payment.billingSchemes &&
      basketObj.payment.billingSchemes.length === 0 &&
      !billingAccountsLoading
    ) {
      const creditCardIndex =
        basketObj.payment.allowedCards.data.billingschemes.findIndex(
          (schemes: any) => schemes.type === 'creditcard',
        );
      const giftCardIndex =
        basketObj.payment.allowedCards.data.billingschemes.findIndex(
          (schemes: any) => schemes.type === 'giftcard',
        );
      let billingArray: any = [];
      if (creditCardIndex !== -1 && userBillingAccounts) {
        if (
          userBillingAccounts.billingaccounts &&
          userBillingAccounts.billingaccounts.length
        ) {
          // const defaultCardIndex =
          //   userBillingAccounts.billingaccounts.findIndex(
          //     (card: any) => card.isdefault,
          //   );
          // if (defaultCardIndex !== -1) {
          //   const defaultCard =
          //     userBillingAccounts.billingaccounts[defaultCardIndex];

          userBillingAccounts.billingaccounts.forEach((card: any) => {
            if (card?.accounttype === 'creditcard') {
              let cardObj: any = {
                localId: getUniqueId(),
                selected: card.isdefault,
                savedCard: true,
                billingmethod: 'creditcard',
                amount: 0,
                tipportion: 0.0,
                cardtype: card.cardtype,
                cardlastfour: card.cardsuffix,
                billingaccountid: card.accountidstring,
                billingschemeid:
                  basketObj.payment.allowedCards.data.billingschemes[
                    creditCardIndex
                  ].id,
              };
              billingArray.push(cardObj);
            }
          });

          // }
        }
      }
      if (giftCardIndex !== -1) {
        if (
          basketObj.payment.allowedCards.data.billingschemes[giftCardIndex]
            .accounts &&
          basketObj.payment.allowedCards.data.billingschemes[giftCardIndex]
            .accounts.length
        ) {
          let defaultGiftCards =
            basketObj.payment.allowedCards.data.billingschemes[giftCardIndex]
              .accounts;

          defaultGiftCards = defaultGiftCards
            .map((card: any, index: any) => {
              return {
                ...card,
                balance: (card.balance && card.balance.balance) || 0,
              };
            })
            .filter((card: any) => card.balance > 0)
            .sort((a: any, b: any) =>
              a.balance > b.balance ? 1 : b.balance > a.balance ? -1 : 0,
            );
          console.log('defaultGiftCards', defaultGiftCards);
          let giftCardArray: any = createDefaultGiftCards(defaultGiftCards);
          console.log('giftCardArray', giftCardArray);

          Array.prototype.push.apply(billingArray, giftCardArray);
        }
      }
      if (billingArray.length) {
        billingArray = updatePaymentCardsAmount(billingArray, basket);
        console.log('billingArray', billingArray);
        dispatch(updateBasketBillingSchemes(billingArray));
      }
      setDefaultCard(false);
    }
  }, [basketObj.payment.allowedCards, validate, userBillingAccounts]);

  React.useEffect(() => {
    if (authToken?.authtoken && authToken.authtoken !== '') {
      // dispatch(getUserDeliveryAddresses());
      if (restaurant && restaurant.id) {
        dispatch(
          getRewardsForCheckoutRequest(restaurant.id, authToken.authtoken),
        );
        dispatch(getRewardsNew());
      }
    }
  }, []);

  // React.useEffect(() => {
  //   if (
  //     userDeliveryAddresses &&
  //     userDeliveryAddresses.deliveryaddresses &&
  //     userDeliveryAddresses.deliveryaddresses.length
  //   ) {
  //     let defaultAddress = userDeliveryAddresses.deliveryaddresses.filter(
  //       (address: any) => {
  //         return address.isdefault === true;
  //       },
  //     );
  //     defaultAddress = defaultAddress.length ? defaultAddress[0] : null;
  //     setDefaultDeliveryAddress(defaultAddress);
  //   }
  // }, [userDeliveryAddresses]);

  React.useEffect(() => {
    if (basketObj.basket) {
      setBasket(basketObj.basket);
      if (
        billingSchemes &&
        billingSchemes.length &&
        !basketObj?.orderSubmit &&
        !basketObj.error
      ) {
        const updatedBillingScheme = updatePaymentCardsAmount(
          billingSchemes,
          basketObj.basket,
        );
        dispatch(updateBasketBillingSchemes(updatedBillingScheme));
      }
    } else {
      navigate('/location');
    }
  }, [basketObj.basket, basketObj.calendar]);

  React.useEffect(() => {
    if (basketObj.validate) {
      setValidate(basketObj.validate);
    }
  }, [basketObj.validate]);

  const createDefaultGiftCards = (defaultGiftCards: any) => {
    let array = [];
    for (let i = 0; i < defaultGiftCards.length; i++) {
      // if (i === 4) {
      //   break;
      // }
      let gitfCardObj: any = {
        localId: getUniqueId(),
        savedCard: true,
        selected: true,
        billingmethod: 'storedvalue',
        amount: 0,
        balance: defaultGiftCards[i].balance,
        tipportion: 0.0,
        cardlastfour: defaultGiftCards[i].cardsuffix,
        billingaccountid: defaultGiftCards[i].accountidstring,
        billingschemeid: defaultGiftCards[i].id,
      };
      array.push(gitfCardObj);
    }

    console.log('mubashir', array);
    return array;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 300,
      behavior: 'smooth',
    });
  };

  const validatePickupForm = (): any => {
    let data = {
      isValidForm: false,
      formData: null,
    };
    console.log('pickupFormRef.current', pickupFormRef.current);
    if (!pickupFormRef.current) {
    } else if (!pickupFormRef.current.dirty) {
      pickupFormRef.current.submitForm();
    } else if (Object.keys(pickupFormRef.current.errors).length > 0) {
    } else {
      data.isValidForm = true;
      data.formData = pickupFormRef.current.values;
    }

    return data;
  };

  const validateGuestSignUpForm = (): any => {
    let data = {
      isValidForm: false,
      formData: null,
    };
    console.log('signupFormRef.current', signupFormRef.current);
    if (!signupFormRef.current) {
    } else if (!signupFormRef.current.dirty) {
      signupFormRef.current.submitForm();
    } else if (Object.keys(signupFormRef.current.errors).length > 0) {
    } else {
      data.isValidForm = true;
      data.formData = signupFormRef.current.values;
    }

    return data;
  };

  const validateDeliveryForm = (): any => {
    let data = {
      isValidForm: false,
      formData: null,
    };

    if (!deliveryFormRef.current) {
    } else if (!deliveryFormRef.current.dirty) {
      deliveryFormRef.current.submitForm();
    } else if (Object.keys(deliveryFormRef.current.errors).length > 0) {
    } else {
      data.isValidForm = true;
      data.formData = deliveryFormRef.current.values;
    }

    return data;
  };

  // const validatePaymentForm = async () => {
  //   let data: any = {
  //     isValidCard: false,
  //     cardDetails: null,
  //     errors: {},
  //   };
  //
  //   const cardDetails = await paymentInfoRef.current.getCardDetails();
  //
  //   if (cardDetails.error) {
  //     data.errors = cardDetails.error;
  //   } else if (cardDetails.paymentMethod) {
  //     if (
  //       cardDetails.paymentMethod &&
  //       cardDetails.paymentMethod.billing_details &&
  //       cardDetails.paymentMethod.billing_details.address.postal_code &&
  //       cardDetails.paymentMethod.billing_details.address.postal_code !== ''
  //     ) {
  //       data.cardDetails = cardDetails.paymentMethod;
  //       data.isValidCard = true;
  //     } else {
  //       data.isValidCard = false;
  //       data.errors.message = 'Zip Code is required';
  //     }
  //   }
  //
  //   return data;
  // };

  // const getGiftCardAmount = () => {
  //   const giftCardIndex = billingSchemes.findIndex(
  //     (account: any) =>
  //       account.billingmethod === 'storedvalue' && account.selected,
  //   );
  //   if (giftCardIndex !== -1) {
  //     return billingSchemes[giftCardIndex].amount || 0;
  //   } else {
  //     return 0;
  //   }
  // };

  const formatOrderType = (orderType: string) => {
    let updatedString =
      orderType && orderType !== ''
        ? orderType[0].toUpperCase() + orderType.slice(1)
        : '';
    if (updatedString === 'Dinein') {
      updatedString = 'Dine In';
    }
    return updatedString;
  };

  const placeOrder = async () => {
    setButtonDisabled(true);
    let customFields = [];
    // let deliveryAddress = null;
    let deliverymode = {
      deliverymode: (basket && basket.deliverymode) || '',
    };
    let formDataValue;
    if (
      basket &&
      (basket.deliverymode === '' ||
        basket.deliverymode === DeliveryModeEnum.pickup ||
        basket.deliverymode === DeliveryModeEnum.curbside ||
        basket.deliverymode === DeliveryModeEnum.dinein)
    ) {
      const { isValidForm, formData } = validatePickupForm();
      if (!isValidForm) {
        displayToast(
          'ERROR',
          `${formatOrderType(basket.deliverymode)} fields are required.`,
        );
        scrollToTop();
        setButtonDisabled(false);
        return;
      }
      formDataValue = formData;
    }

    // if (
    //   basket &&
    //   basket.deliverymode === DeliveryModeEnum.dispatch &&
    //   (basket.deliverymode === '' ||
    //     basket.deliverymode === DeliveryModeEnum.pickup ||
    //     basket.deliverymode === DeliveryModeEnum.curbside ||
    //     basket.deliverymode === DeliveryModeEnum.dinein)
    // ) {
    //   const { isValidForm, formData } = validateGuestSignUpForm();
    //   if (!isValidForm) {
    //     displayToast('ERROR', `Sign Up fields are required.`);
    //     scrollToTop();
    //     setButtonDisabled(false);
    //     return;
    //   }
    //   formDataValue = formData;
    // }

    if (basket && basket.deliverymode === DeliveryModeEnum.dispatch) {
      const { isValidForm, formData } = validateDeliveryForm();
      if (!isValidForm) {
        displayToast('ERROR', 'Delivery fields are required.');
        scrollToTop();
        setButtonDisabled(false);
        return;
      }
      formDataValue = formData;
    }

    if (billingSchemes && billingSchemes.length === 0) {
      displayToast('ERROR', 'Payment method is required');
      setButtonDisabled(false);
      return;
    }

    // if (basket && billingSchemes && billingSchemes.length) {
    //   const giftCardAmount = getGiftCardAmount();
    //   if (giftCardAmount > basket.subtotal) {
    //     displayToast(
    //       'ERROR',
    //       'Gift Card amount must be less than order subtotal.',
    //     );
    //     setButtonDisabled(false);
    //     return;
    //   }
    // }

    // if (billingSchemes.length) {
    //   const tip = (basket && basket.tip) || 0;
    //   const creditCardTotal = billingSchemes.reduce(
    //     (sum: any, account: any) => {
    //       if (account.billingmethod === 'creditcardtoken' && account.selected) {
    //         sum = sum + account.amount;
    //       }
    //       return sum;
    //     },
    //     0,
    //   );
    //
    //   if (creditCardTotal < tip) {
    //     displayToast(
    //       'ERROR',
    //       'Credit Card amount must be greater than Tip amount.',
    //     );
    //     setButtonDisabled(false);
    //     return;
    //   }
    // }

    console.log('formDataValue', formDataValue);

    if (formDataValue.phone) {
      formDataValue.phone = formDataValue.phone.replace(/\D/g, '');
    }

    const basketPayload = generateSubmitBasketPayload(
      formDataValue,
      billingSchemes,
      basket?.deliverymode,
      authToken?.authtoken,
      basket,
      basketAccessToken,
    );

    if (
      basket &&
      (basket.deliverymode === DeliveryModeEnum.curbside ||
        basket.deliverymode === DeliveryModeEnum.dinein)
    ) {
      customFields = formatCustomFields(restaurant.customfields, formDataValue);
    }

    // if (basket && basket.deliverymode === DeliveryModeEnum.dispatch) {
    //   deliveryAddress = formatDeliveryAddress(
    //     formDataValue,
    //     defaultDeliveryAddress,
    //   );
    //   console.log('deliveryAddress', deliveryAddress);
    // }

    if (basket) {
      setButtonDisabled(false);
      let user: any = null;
      if (authToken?.authtoken && authToken.authtoken !== '') {
        user = {
          email: providerToken.email,
          first_name: providerToken?.first_name,
          last_name: providerToken?.last_name,
          favourite_locations: locationId || '',
          marketing_email_subscription: formDataValue.emailNotification,
          phone: formDataValue.phone,
        };
      }
      console.log('basketPayload', basketPayload);

      if (basketPayload.receivinguser) {
        const userInfo = {
          ...basketPayload.receivinguser,
          marketing_email_subscription: formDataValue.emailNotification,
        };
        console.log('userInfo', userInfo);
        dispatch(updateGuestUserInfo(userInfo));
      }

      ccsfObj.registerError((errors: any) => {
        console.log('ccsf error 3', errors);
        errors.forEach((error: any) => {
          displayToast('ERROR', error.description);
        });
        setButtonDisabled(false);
        dispatch(submitBasketSinglePaymentFailure(errors));
      });

      dispatch(
        validateBasket(
          basket?.id,
          basketPayload,
          user,
          customFields,
          deliverymode,
          ccsfObj,
        ),
      );
    }
  };

  const totalPaymentCardAmount = () => {
    if (billingSchemes && basket) {
      let totalAmount = billingSchemes.reduce((sum: any, account: any) => {
        if (account.selected) {
          sum = sum + account.amount;
        }
        return sum;
      }, 0);
      totalAmount = totalAmount.toFixed(2);
      totalAmount = parseFloat(totalAmount);
      return totalAmount !== basket.total;
    } else {
      return true;
    }
  };

  const fireEventAfterPlacingOrder = (order: any) => {
    let userObj: any = null;
    let products = [];
    let totalTax = 0;

    if (order && order.products && order.products.length) {
      products = order.products.map((prod: any) => {
        return {
          ...prod,
          sku: '',
        };
      });
    }

    if (order.taxes && order.taxes.length) {
      totalTax = order.taxes.reduce((sum: any, tax: any) => {
        // if (tax.label === 'Estimated Tax') {
        sum = sum + tax.tax;
        // }
        return sum;
      }, 0);
    }

    const tagManagerArgs: any = {
      dataLayer: {
        event: 'trackTrans',
        transactionRevenue: order.total,
        transactionProducts: products,
        transactionId: order.id,
        transactionTax: totalTax,
        transactionAffiliation: order.deliverymode,
        transactionStoreReference: order.vendorextref,
      },
    };

    TagManager.dataLayer(tagManagerArgs);
    if (providerToken) {
      userObj = {
        first_name: providerToken.first_name || '',
        last_name: providerToken.last_name || '',
        email: providerToken.email || '',
        phone: providerToken.phone || '',
      };
    } else {
      if (guestUser) {
        userObj = {
          first_name: guestUser.firstname || '',
          last_name: guestUser.lastname || '',
          email: guestUser.emailaddress || '',
          phone: guestUser.contactnumber || '',
        };
      }
    }
    dispatch(
      facebookSendEvent(
        facebookConversionTypes.FACEBOOK_PURCHASE_EVENT,
        userObj,
        {
          value: order.total,
          currency: 'USD',
        },
      ),
    );
  };

  React.useEffect(() => {
    // @ts-ignore
    // console.log('openAddCreditCard', openAddCreditCard);
    // if (openAddCreditCard) {
    // console.log('openAddCreditCard working');
    // document.addEventListener('readystatechange', (event: any) => {
    //   // When HTML/DOM elements are ready:
    //   if (event.target.readyState === 'interactive') {
    //     //does same as:  ..addEventListener("DOMContentLoaded"..
    //     alert('hi 1');
    //   }
    //   // When window loaded ( external resources are loaded too- `css`,`src`, etc...)
    //   if (event.target.readyState === 'complete') {
    //     alert('hi 2');
    setTimeout(() => {
      // @ts-ignore
      if (Olo && Olo.CheckoutFrame && showIframeOnce) {
        console.log('ccsf working');
        const ccsfObj = new CreditCardCCSF();
        setccsfObj(ccsfObj);
        ccsfObj.initialize(
          basketObj && basketObj.basket && basketObj.basket.id
            ? basketObj.basket.id
            : '',
          process.env.REACT_APP_BRAND_ACCESS_ID,
        );
        ccsfObj.registerError((error: any) => {
          console.log('ccsf error 1', error);
          setButtonDisabled(false);
          dispatch(submitBasketSinglePaymentFailure(error));
        });
        ccsfObj.registerSuccess((order: any) => {
          console.log('ccsf Success', order);

          fireEventAfterPlacingOrder(order);

          // let userInfo: any = {};
          //
          // if (guestUser) {
          //   userInfo = {
          //     ...guestUser,
          //   };
          // }
          //
          // userInfo['id'] = order.id;
          // console.log('userInfo', userInfo)
          // dispatch(updateGuestUserInfo(userInfo));
          const basketId =
            basketObj && basketObj.basket && basketObj.basket.id
              ? basketObj.basket.id
              : '';
          if (basketId !== '') {
            dispatch(submitBasketSinglePaymentSuccess(order, basketId));
          }
          dispatch(navigateAppAction(`/order-confirmation/${order.id}`));
        });
        ccsfObj.registerFocus((evt: any) => {
          console.log('ccsf focus', evt);
        });

        ccsfObj.registerComplete((evt: any) => {
          console.log('ccsf complete', evt);
        });

        ccsfObj.registerReady((evt: any) => {
          console.log('ccsf ready', evt);
        });
        setShowIframeOnce(false);
      }
    }, 3000);
    // @ts-ignore
    //   }
    // });
    // }
  }, []);

  const guestSignupCheckout = () => {
    let formDataValue;
    if (
      basket?.deliverymode === '' ||
      basket?.deliverymode === DeliveryModeEnum.pickup ||
      basket?.deliverymode === DeliveryModeEnum.curbside ||
      basket?.deliverymode === DeliveryModeEnum.dinein
    ) {
      const { isValidForm, formData } = validatePickupForm();
      if (!isValidForm) {
        displayToast(
          'ERROR',
          `${formatOrderType(basket.deliverymode)} fields are required.`,
        );
        scrollToTop();
        setButtonDisabled(false);
        return;
      }
      formDataValue = formData;
    }
    if (basket?.deliverymode === DeliveryModeEnum.dispatch) {
      const { isValidForm, formData } = validateDeliveryForm();
      if (!isValidForm) {
        displayToast('ERROR', 'Delivery fields are required.');
        scrollToTop();
        setButtonDisabled(false);
        return;
      }
      formDataValue = formData;
    }
    const { isValidForm: isValidFormSignup, formData: formDataSignup } =
      validateGuestSignUpForm();
    if (!isValidFormSignup) {
      displayToast('ERROR', ` Signup fields are required.`);
      return;
    }
    const signUpObj: any = {
      first_name: formDataValue?.firstName,
      last_name: formDataValue?.lastName,
      email: formDataValue?.email,
      phone: formDataValue?.phone?.replace(/\D/g, '') || '',
      password: formDataSignup?.password,
      password_confirmation: formDataSignup?.password_confirmation,
      fav_location_id: '345077',
      // fav_location_id: restaurant?.id.toString(),
      terms_and_conditions: formDataSignup?.termsAndConditions,
      marketing_email_subscription: formDataSignup?.emailNotification,
    };
    console.log('birthDay', birthDay);
    if (birthDay) {
      console.log('birthdayssss',birthDay);
      signUpObj.birthday = moment(birthDay).format('YYYY-MM-DD');
      console.log('birthdaysschgtvdy',signUpObj.birthday);
    }
    console.log('signUpObj', signUpObj);
    console.log('bithDay', birthDay);

    dispatch(userRegister(signUpObj, 'REGISTER_CHECKOUT', basket?.id));
  };

  return (
    <Page title={'Checkout'} className="">
      <Typography variant="h1" className="sr-only">
        Checkout
      </Typography>
      <StoreInfoBar />
      <Box
        className={`checkout-wrapper ${buttonDisabled || basketObj?.orderSubmit ? 'disable-pointer' : ''
          }`}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card className="order">
              <Grid container>
                <Grid container>
                  <Grid
                    style={{ border: 'none' }}
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className="left-col"
                  >
                    <Grid container>
                      {basket &&
                        (basket.deliverymode === '' ||
                          basket.deliverymode === DeliveryModeEnum.pickup) ? (
                        <>
                          <Grid item xs={12}>
                            <Typography
                              variant="h3"
                              className="label"
                              title="WHO'S IS PICKING UP?"
                            >
                              WHO'S PICKING UP?
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="h1"
                              style={{ marginBottom: '0px' }}
                              title="PICK UP INFO"
                            >
                              PICK UP INFO
                            </Typography>
                          </Grid>
                        </>
                      ) : basket &&
                        basket.deliverymode === DeliveryModeEnum.curbside ? (
                        <>
                          <Grid item xs={12}>
                            <Typography
                              variant="h3"
                              className="label"
                              title="WHO'S IS PICKING UP?"
                            >
                              WHO'S PICKING UP?
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="h1"
                              style={{ marginBottom: '0px' }}
                              title="CURBSIDE PICK INFO"
                            >
                              CURBSIDE PICK UP
                            </Typography>
                          </Grid>
                        </>
                      ) : basket &&
                        basket.deliverymode === DeliveryModeEnum.dispatch ? (
                        <>
                          <Grid item xs={12}>
                            <Typography
                              variant="caption"
                              className="label"
                              title="WHO'S IS PICKING UP?"
                            >
                              WHERE TO DELIVER
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="h1"
                              style={{ marginBottom: '0px' }}
                              title="DELIVERY INFO"
                            >
                              DELIVERY INFO
                            </Typography>
                          </Grid>
                        </>
                      ) : basket &&
                        basket.deliverymode === DeliveryModeEnum.dinein ? (
                        <>
                          <Grid item xs={12}>
                            <Typography
                              variant="caption"
                              className="label"
                              title="WHO'S IS PICKING UP?"
                            >
                              WHO's ORDERING?
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="h1"
                              style={{ marginBottom: '0px' }}
                              title="DELIVERY INFO"
                            >
                              DINE IN INFO
                            </Typography>
                          </Grid>
                        </>
                      ) : null}
                      {basket &&
                        (basket.deliverymode === '' ||
                          basket.deliverymode === DeliveryModeEnum.pickup ||
                          basket.deliverymode === DeliveryModeEnum.curbside ||
                          basket.deliverymode === DeliveryModeEnum.dinein) ? (
                        <PickupForm
                          setShowSignUpGuest={setShowSignUpGuest}
                          showSignUpGuest={!showSignUpGuest}
                          basket={basket}
                          pickupFormRef={pickupFormRef}
                          orderType={basket.deliverymode}
                        />
                      ) : null}
                      {basket &&
                        basket.deliverymode === DeliveryModeEnum.dispatch ? (
                        <DeliveryForm
                          basket={basket}
                          // defaultAddress={defaultDeliveryAddress}
                          deliveryFormRef={deliveryFormRef}
                        />
                      ) : null}
                    </Grid>
                  </Grid>
                  {isDesktop &&
                    <OrderTime
                      orderType={(basket && basket.deliverymode) || ''}
                    />
                  }
                </Grid>
              </Grid>
              {!providerToken && showSignUpGuest && (
                <>
                  <br />
                  <br />
                  <Divider />
                  <br />
                  <br />
                  <br />
                  <SignUpGuest
                    birthDay={birthDay}
                    setBirthDay={setBirthDay}
                    guestSignupCheckout={guestSignupCheckout}
                    signupFormRef={signupFormRef}
                  />
                </>
              )}
              <Grid sx={{
                display: {
                  xs: 'block',
                  sm: 'none',
                  md: 'none',
                  lg: 'none',
                }
              }}>
                <br />
                <br />
              </Grid>
              <Grid
                sx={{
                  display: {
                    xs: 'block',
                    sm: 'none',
                    md: 'none',
                    lg: 'none',
                  },
                }}
              >
                <Divider />
                <br />
                <br />
                <br />
                <OrderTime orderType={(basket && basket.deliverymode) || ''} />
              </Grid>
              {console.log(rewards, "rewards")}
              {console.log(null,)}
              {(!loadingRewards && rewards?.length === 0) && (null)}


              {providerToken &&
                authToken &&
                authToken.authtoken &&
                authToken.authtoken !== '' &&
                providerToken.first_name &&
                rewards &&
                (
                  <>
                    <br />
                    <br />
                    <Divider />
                    <br />
                    <br />
                    <br />

                    <Rewards rewardsList={rewards} />
                  </>
                )}

              <br />
              <Divider />
              <br />
              <br />
              <br />

              <Tip
                basket={basket}
                loading={basketObj?.loading}
                updateOrderDetailTipPercent={setTipPercentage}
              />
              <br />
              <br />
              <br />
              <Divider />
              <br />
              <br />
              <br />
              {/*second section*/}
              <OrderDetails
                basket={basket}
                tipPercentage={tipPercentage}
                page="checkout"
              />
              <br />
              <br />
              <br />
              <Divider />
              <br />
              <br />
              <br />
              <PaymentInfo
                ref={paymentInfoRef}
                ccsfObj={ccsfObj}
                basketAccessToken={basketAccessToken}
              />

              <Divider />
              <br />
              <br />
              <br />

              {/*second section ends here*/}
              <Grid container className="add-order">
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Button
                    disabled={
                      (buttonDisabled ||
                        basketObj?.loading ||
                        basketObj?.orderSubmit ||
                        totalPaymentCardAmount()) &&
                      ccsfObj
                    }
                    onClick={placeOrder}
                    id={'place-order-button'}
                    variant="contained"
                    title="PLACE ORDER"
                  >
                    PLACE ORDER
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
};

export default Checkout;
