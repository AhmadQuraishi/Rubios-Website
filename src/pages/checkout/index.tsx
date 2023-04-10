import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
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
  setBasketDeliveryAddressSuccess,
  submitBasketSinglePaymentFailure,
  submitBasketSinglePaymentSuccess,
  updateBasketBillingSchemes,
  updateDuplicateAddress,
  validateBasket,
} from '../../redux/actions/basket/checkout';
import { displayToast } from '../../helpers/toast';
import { isLoginUser } from '../../helpers/auth';
import {
  formatCustomFields,
  // formatDeliveryAddress,
  generateSubmitBasketPayload,
  getBillingSchemesStats,
  getCreditCardObj,
  getUniqueId,
  updatePaymentCardsAmount,
} from '../../helpers/checkout';
import {
  getAllBillingAccounts,
  getUserDeliveryAddresses,
  userLogin,
  userLogout,
  // getUserDeliveryAddresses,
} from '../../redux/actions/user';
import PickupForm from '../../components/pickup-form/index';
import DeliveryForm from '../../components/delivery-form/index';
import { getRewardsForCheckoutRequest } from '../../redux/actions/reward/checkout';
import Page from '../../components/page-title';
import { CreditCardCCSF } from '../../helpers/creditCard';
import {
  generateCCSFToken,
  setBasketDeliveryAddress,
  setBasketDeliveryMode,
} from '../../services/basket';
import { updateGuestUserInfo } from '../../redux/actions/order';
import { navigateAppAction } from '../../redux/actions/navigate-app';
import { getRewardsNew } from '../../redux/actions/reward';
import TagManager from 'react-gtm-module';
import { facebookSendEvent } from '../../redux/actions/facebook-conversion';
import { facebookConversionTypes } from '../../redux/types/facebook-conversion';
import SignUpGuest from '../../components/sign-up-guest';
import { userRegister } from '../../redux/actions/user';
import CheckoutSkeletonUI from '../../components/checkout-skeleton-ui';
import { getAuthRequest } from '../../redux/actions/auth';
import LoginAuthDialog from '../../components/login-authentication-dialog';
import { requestDelUserDelAddress } from '../../services/user';
import userReducer from '../../redux/reducers/user';

let ccsfObj: any;
let ccsfObj2: any;
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const pickupFormRef = React.useRef<any>(null);
  const deliveryFormRef = React.useRef<any>(null);
  const paymentInfoRef = React.useRef<any>();
  const signupFormRef = React.useRef<any>(null);
  const [openAuthenticationModal, setOpenAuthenticationModal] =
    React.useState<any>(false);
  const [runOnce, setRunOnce] = React.useState<boolean>(true);
  const [specialInstruction, setSpecialInstruction] = useState('');
  const [callOnce, setCallOnce] = React.useState<boolean>(true);
  const [showIframeOnce, setShowIframeOnce] = React.useState<boolean>(true);
  const [removeCreditCardOnce, setRemoveCreditCardOnce] =
    React.useState<boolean>(true);
  const [isContactless, setIsContactless] = React.useState(false);
  const [birthDay, setBirthDay] = useState<Date | undefined>();
  //const [showSignUpGuest, setShowSignUpGuest] = React.useState<boolean>(true);
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
  const [editCreditCard, setEditCreditCard] = React.useState<boolean>(false);
  const [hideShow, setHideShow] = React.useState<boolean>(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [zipCode, setZipCode] = React.useState<any>();
  const [allowedCards, setAllowedCards] = React.useState<any>();
  const [cardExpiry, setCardExpiry] = React.useState<any>();
  // const [defaultDeliveryAddress, setDefaultDeliveryAddress] =
  //   React.useState<any>(null);
  // const [ccsfObj, setccsfObj] = React.useState<any>();

  const basketObj = useSelector((state: any) => state.basketReducer);
  const { duplicateAddress } = useSelector((state: any) => state.basketReducer);
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
  const { authToken, sessionLoginTime } = useSelector(
    (state: any) => state.authReducer,
  );
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  // const { userDeliveryAddresses } = useSelector(
  //   (state: any) => state.userReducer,
  // );
  const {
    userDeliveryAddresses,
    userBillingAccounts,
    loading: billingAccountsLoading,
  } = useSelector((state: any) => state.userReducer);
  const { singleLocation } = useSelector((state: any) => state.locationReducer);

  // useEffect(() => {
  //   const LoadExternalScript = () => {
  //     const externalScript = document.createElement('script');
  //     // externalScript.onerror = loadError;
  //     // externalScript.id = 'external';
  //     // externalScript.async = true;
  //     // externalScript.type = 'text/javascript';
  //     // externalScript.setAttribute('crossorigin', 'anonymous');
  //     document.body.appendChild(externalScript);
  //     externalScript.src =
  //       process.env.REACT_APP_NODE_ENV === 'production'
  //         ? `https://static.olocdn.net/web-client/checkout-web-client/2.5.0/checkout.js`
  //         : 'https://olocdnsandbox.s3.amazonaws.com/web-client/checkout-web-client/2.5.0/checkout.js';
  //   };
  //   LoadExternalScript();
  // }, []);

  useEffect(() => {
    if (singleLocation?.data?.length) {
      setLocationId(singleLocation?.data[0]?.location_id);
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

  const getBasketAccessToken = async () => {
    console.log('checkingg...');
    const body = {
      authtoken: authToken?.authtoken || '',
    };
    const baskId = basketObj?.basket?.id || '';
    const response = await generateCCSFToken(baskId, body);
    if (response && response.accesstoken) {
      setBasketAccessToken(response.accesstoken);
    }
  };

  useEffect(() => {
    getBasketAccessToken();
  }, [authToken]);

  React.useEffect(() => {
    if (basketObj?.payment?.billingSchemes?.length && removeCreditCardOnce) {
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
      if (
        basketObj.payment.billingSchemes.filter(
          (element: any) =>
            element.billingmethod === 'creditcard' && element.selected,
        ).length === 0
      ) {
        const findCard = billingArray.findIndex(
          (elem: any) => elem.billingmethod === 'creditcard',
        );
        if (findCard !== -1) {
          billingArray[findCard].selected = true;
        }
      }
      billingArray = updatePaymentCardsAmount(billingArray, basketObj?.basket);
      dispatch(updateBasketBillingSchemes(billingArray));
      setRemoveCreditCardOnce(false);
    }
  }, []);

  const removePreviousAddresses = (addressIds: any) => {
    const arrayLength = addressIds?.length;
    console.log(arrayLength, 'arrayLength');
    for (let i = 0; i < arrayLength - 1; i++) {
      requestDelUserDelAddress(addressIds[i]);
    }
    // debugger;
  };

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
      dispatch(validateBasket(basket.id, null, null, [], null, null, null));
      dispatch(getBasketAllowedCardsRequest(basket.id));
      dispatch(getAllBillingAccounts());
      dispatch(removeBasketOrderSubmit());
      setRunOnce(false);
    }
  }, [basket]);

  const handleCheckChange = (event: any) => {
    const checked = event.target.checked;
    setIsContactless(checked);
  };
  const AuthenticationHandler = () => {
    const LoginSessionTime: any = process.env.REACT_APP_LOGIN_SESSION_TIME;
    if (isLoginUser() && sessionLoginTime) {
      const LoginCreatedTime: any = moment.unix(sessionLoginTime);
      const currentTime = moment();
      if (LoginCreatedTime.isValid()) {
        const minutes = currentTime.diff(LoginCreatedTime, 'minutes');
        if (LoginSessionTime !== undefined && minutes > LoginSessionTime) {
          setOpenAuthenticationModal(true);
          return false;
        }
      }
    }
    return true;
  };

  React.useEffect(() => {
    setBillingSchemes(basketObj.payment.billingSchemes);
  }, [basketObj.payment.billingSchemes]);

  React.useEffect(() => {
    if (
      defaultCard &&
      !basketObj?.loading &&
      // validate &&
      basketObj?.payment?.allowedCards?.data?.billingschemes?.length &&
      basketObj?.payment?.billingSchemes?.length === 0 &&
      !billingAccountsLoading &&
      userBillingAccounts?.billingaccounts
    ) {
      const allowedCreditCard =
        basketObj.payment.allowedCards.data.billingschemes.find(
          (schemes: any) => schemes.type === 'creditcard',
        );
      const allowedGiftCardIndex =
        basketObj.payment.allowedCards.data.billingschemes.find(
          (schemes: any) => schemes.type === 'giftcard',
        );
      let billingArray: any = [];
      if (allowedCreditCard && userBillingAccounts?.billingaccounts?.length) {
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
              billingschemeid: allowedCreditCard.id,
              alwaysVisible: false,
            };
            billingArray.push(cardObj);
          }
        });

        // }
      }
      if (allowedGiftCardIndex?.accounts?.length) {
        let defaultGiftCards = allowedGiftCardIndex?.accounts;

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
        let giftCardArray: any = createDefaultGiftCards(defaultGiftCards);

        Array.prototype.push.apply(billingArray, giftCardArray);
      }

      if (billingArray?.length) {
        billingArray = updatePaymentCardsAmount(
          billingArray,
          basketObj?.basket,
        );
        dispatch(updateBasketBillingSchemes(billingArray));
      }
      setDefaultCard(false);
    }
  }, [basketObj, validate, userBillingAccounts, billingAccountsLoading]);

  React.useEffect(() => {
    if (isLoginUser()) {
      // dispatch(getUserDeliveryAddresses());
      if (restaurant && restaurant.id) {
        dispatch(
          getRewardsForCheckoutRequest(restaurant?.id, authToken?.authtoken),
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
        alwaysVisible: false,
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

  const validatePickupForm = (type: string): any => {
    let data = {
      isValidForm: false,
      formData: null,
    };
    console.log('pickupFormRef.current', pickupFormRef.current);
    if (!pickupFormRef.current) {
    } else if (!pickupFormRef.current.dirty) {
      pickupFormRef.current.submitForm();
    } else if (Object.keys(pickupFormRef.current.errors).length > 0) {
      console.log('pickupFormRef.current.errors', pickupFormRef.current.errors);
      if (
        type === 'GUEST_SIGNUP' &&
        (basket?.deliverymode === 'curbside' ||
          basket?.deliverymode === 'dinein')
      ) {
        let checkGuest = false;
        Object.keys(pickupFormRef.current.errors).forEach((field) => {
          const text =
            basket?.deliverymode === 'curbside' ? 'vehicle' : 'table';
          if (!field.startsWith(text)) {
            checkGuest = true;
          }
        });

        if (!checkGuest) {
          data.isValidForm = true;
          data.formData = pickupFormRef.current.values;
        }
      }
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
    let deliverymode = {
      deliverymode: (basket && basket.deliverymode) || '',
    };
    console.log(ccsfObj, 'ccsfObj registerError');
    let formDataValue;
    if (
      basket &&
      (basket.deliverymode === '' ||
        basket.deliverymode === DeliveryModeEnum.pickup ||
        basket.deliverymode === DeliveryModeEnum.curbside ||
        basket.deliverymode === DeliveryModeEnum.dinein)
    ) {
      const { isValidForm, formData } = validatePickupForm('PLACE_ORDER');
      if (!isValidForm) {
        displayToast(
          'ERROR',
          `${formatOrderType(basket?.deliverymode)} fields are required.`,
        );
        scrollToTop();
        setButtonDisabled(false);
        return;
      }
      formDataValue = formData;
    }
    // debugger;
    if (duplicateAddress?.length > 0) {
      let newFilteredDuplicateAddress;
      if (basket?.deliveryaddress?.id) {
        newFilteredDuplicateAddress = duplicateAddress.filter(
          (id: any) => id !== basket?.deliveryaddress?.id,
        );
      } else {
        newFilteredDuplicateAddress = duplicateAddress;
        console.log(newFilteredDuplicateAddress, 'newFilteredDuplicateAddress');
      }
      if (newFilteredDuplicateAddress?.length > 0) {
        console.log(
          newFilteredDuplicateAddress,
          'newFilteredDuplicateAddres423323232s',
        );
        removePreviousAddresses(newFilteredDuplicateAddress);
      }
    }
    console.log(ccsfObj, 'ccsfObj registerError');
    if (
      basket?.deliverymode === DeliveryModeEnum.dispatch &&
      basket?.deliveryaddress?.specialinstructions?.toLowerCase() !==
        specialInstruction?.toLowerCase()
    ) {
      try {
        let updatedAddress: any = {
          building: basket?.deliveryaddress?.building || '',
          streetaddress: basket?.deliveryaddress?.streetaddress || '',
          city: basket?.deliveryaddress?.city || '',
          zipcode: basket?.deliveryaddress?.zipcode || '',
          isdefault: basket?.deliveryaddress?.isdefault || false,
          specialinstructions:
            (isContactless &&
              specialInstruction !== '' &&
              'I want contactless delivery,' + specialInstruction) ||
            (specialInstruction !== '' && specialInstruction) ||
            (isContactless && 'I want contactless delivery') ||
            null,
        };
        const response: any = await setBasketDeliveryAddress(
          basket?.id,
          updatedAddress,
        );
        dispatch(setBasketDeliveryAddressSuccess(response));
      } catch (error: any) {
        displayToast(
          'ERROR',
          error?.response?.data?.message
            ? error.response.data.message
            : 'ERROR! Please Try again later',
        );
      }
    }
    console.log(ccsfObj, 'ccsfObj registerError');
    if (!defaultCard && billingSchemes && billingSchemes.length === 0) {
      if (!zipCode || zipCode === '') {
        displayToast('ERROR', 'Zip Code is required');
        setButtonDisabled(false);
        return;
      }

      if (!cardExpiry || cardExpiry === '') {
        displayToast('ERROR', 'Card Expiry is required');
        setButtonDisabled(false);
        return;
      } else if (cardExpiry.length !== 5) {
        displayToast('ERROR', 'Please enter valid date.');
        setButtonDisabled(false);
        return;
      } else {
        const currentDate: any = moment(new Date());
        const expiryDate: any = moment(cardExpiry, 'MM/YY');

        if (!expiryDate.isValid()) {
          displayToast('ERROR', 'Please enter valid date.');
          setButtonDisabled(false);
          return;
        }

        if (!expiryDate.isAfter(currentDate)) {
          displayToast('ERROR', 'Please enter future date.');
          setButtonDisabled(false);
          return;
        }
      }
      let billingSchemesNewArray = billingSchemes;
      const obj = {
        exp_year: moment(cardExpiry, 'MM/YYYY').year(),
        exp_month: moment(cardExpiry, 'MM/YYYY').month() + 1,
        postal_code: zipCode,
      };
      let cardObj: any = getCreditCardObj(obj, billingSchemes);

      Array.prototype.push.apply(billingSchemes, cardObj);

      billingSchemesNewArray = updatePaymentCardsAmount(billingSchemes, basket);

      dispatch(updateBasketBillingSchemes(billingSchemesNewArray));
      // if (!isMobile) {
      //   displayToast(
      //     'SUCCESS',
      //     `Credit Card ${editCreditCard ? 'Updated' : 'Added'}`,
      //   );
      // }
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

    // if (billingSchemes && billingSchemes.length === 0) {
    //   displayToast('ERROR', 'Payment method is required');
    //   setButtonDisabled(false);
    //   return;
    // }

    console.log('formDataValue', formDataValue);

    if (formDataValue.phone) {
      formDataValue.phone = formDataValue.phone.replace(/\D/g, '');
    }
    console.log(ccsfObj, 'ccsfObj registerError');
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
      (basket?.deliverymode === DeliveryModeEnum.curbside ||
        basket?.deliverymode === DeliveryModeEnum.dinein)
    ) {
      customFields = formatCustomFields(restaurant.customfields, formDataValue);
    }

    console.log(ccsfObj, 'ccsfObj registerError');
    if (basket) {
      setButtonDisabled(false);
      let user: any = null;
      if (isLoginUser()) {
        user = {
          email: providerToken.email,
          first_name: providerToken?.first_name,
          last_name: providerToken?.last_name,
          favourite_locations: providerToken?.favourite_locations,
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

      dispatch(
        validateBasket(
          basket?.id || '',
          basketPayload,
          user,
          customFields,
          deliverymode,
          ccsfObj,
          (value: any) => submitOrder(value),
        ),
      );
    }
  };

  const authenticationPlace = () => {
    let authenticationSuccessful = AuthenticationHandler();
    if (authenticationSuccessful) {
      placeOrder();
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

  const CCSFInitialization = (element: any) => {
    const localObj = new CreditCardCCSF(element);
    console.log('ccsf working', ccsfObj);
    // setccsfObj(ccsfObj);
    localObj.initialize(
      basketObj && basketObj.basket && basketObj.basket.id
        ? basketObj.basket.id
        : '',
      process.env.REACT_APP_BRAND_ACCESS_ID,
    );
    // localObj.registerError((error: any) => {
    //   console.log('ccsf error 1', error);
    //   setButtonDisabled(false);
    //   dispatch(submitBasketSinglePaymentFailure(error));
    // });
    // localObj.registerSuccess((order: any) => {
    //   console.log('ccsf Success', order);

    //   fireEventAfterPlacingOrder(order);

    //   // let userInfo: any = {};
    //   //
    //   // if (guestUser) {
    //   //   userInfo = {
    //   //     ...guestUser,
    //   //   };
    //   // }
    //   //
    //   // userInfo['id'] = order.id;
    //   // console.log('userInfo', userInfo)
    //   // dispatch(updateGuestUserInfo(userInfo));
    //   const basketId =
    //     basketObj && basketObj.basket && basketObj.basket.id
    //       ? basketObj.basket.id
    //       : '';
    //   if (basketId !== '') {
    //     dispatch(submitBasketSinglePaymentSuccess(order, basketId));
    //   }
    //   dispatch(navigateAppAction(`/order-confirmation/${order.id}`));
    // });
    // localObj.registerFocus((evt: any) => {
    //   console.log('ccsf focus', evt);
    // });
    //
    // localObj.registerComplete((evt: any) => {
    //   console.log('ccsf complete', evt);
    // });
    //
    // localObj.registerReady((evt: any) => {
    //   console.log('ccsf ready', evt);
    // });
    setShowIframeOnce(false);

    return localObj;
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
    setTimeout(async () => {
      // @ts-ignore
      if (Olo && Olo?.CheckoutFrame && showIframeOnce) {
        ccsfObj = await CCSFInitialization({
          cardElement: 'credit-card-info-div',
          cvvElement: 'cvv-info-div',
        });

        ccsfObj2 = CCSFInitialization({
          cardElement: 'credit-card-info-div-2',
          cvvElement: 'cvv-info-div-2',
        });
      }
    }, 1000);
    // @ts-ignore
    //   }
    // });
    // }
  }, []);

  const handleCCSFRegisterError = (errors: any[]) => {
    console.log('ccsf error 3', errors);
    errors.forEach((error: any) => {
      displayToast('ERROR', error.description);
    });
    setButtonDisabled(false);
    dispatch(submitBasketSinglePaymentFailure(errors));
  };

  const handleCCSFRegisterSuccess = (order: any) => {
    fireEventAfterPlacingOrder(order);
    const basketId =
      basketObj && basketObj.basket && basketObj.basket.id
        ? basketObj.basket.id
        : '';
    if (basketId !== '') {
      dispatch(submitBasketSinglePaymentSuccess(order, basketId));
    }
    dispatch(navigateAppAction(`/order-confirmation/${order.id}`));
  };

  const submitOrder = (payload: any) => {
    if (diplayOnScreenCreditCardForm()) {
      ccsfObj?.registerError(handleCCSFRegisterError);
      ccsfObj?.registerSuccess(handleCCSFRegisterSuccess);
      ccsfObj?.submit(payload);
    } else {
      ccsfObj2?.registerError(handleCCSFRegisterError);
      ccsfObj2?.registerSuccess(handleCCSFRegisterSuccess);
      ccsfObj2?.submit(payload);
    }
  };

  const diplayOnScreenCreditCardForm = () => {
    if (
      (!userBillingAccounts ||
        userBillingAccounts?.billingaccounts?.length === 0) &&
      billingSchemes?.length === 0
    ) {
      return true;
    } else if (
      billingSchemes?.length === 1 &&
      billingSchemes[0]?.billingmethod === 'creditcard' &&
      !billingSchemes[0]?.billingaccountid
    ) {
      return true;
    } else {
      return false;
    }
  };

  const guestSignupCheckout = () => {
    let formDataValue;
    if (
      basket?.deliverymode === '' ||
      basket?.deliverymode === DeliveryModeEnum.pickup ||
      basket?.deliverymode === DeliveryModeEnum.curbside ||
      basket?.deliverymode === DeliveryModeEnum.dinein
    ) {
      const { isValidForm, formData } = validatePickupForm('GUEST_SIGNUP');
      if (!isValidForm) {
        displayToast(
          'ERROR',
          `${formatOrderType(basket?.deliverymode)} fields are required.`,
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
      fav_location_id: locationId || '345077',
      terms_and_conditions: formDataSignup?.termsAndConditions,
      marketing_email_subscription: formDataSignup?.emailNotification,
    };
    console.log('birthDay', birthDay);
    if (birthDay) {
      console.log('birthdayssss', birthDay);
      signUpObj.birthday = moment(birthDay).format('YYYY-MM-DD');
      console.log('birthdaysschgtvdy', signUpObj.birthday);
    }
    console.log('signUpObj', signUpObj);

    dispatch(userRegister(signUpObj, 'REGISTER_CHECKOUT', basket?.id));
  };
  React.useEffect(() => {
    console.log(callOnce, 'callOnce');
    if (basketObj?.basket?.products?.length == 0 && callOnce) {
      navigate(restaurant ? '/menu/' + restaurant.slug : '/');
      // displayToast('SUCCESS', 'Please add new items in a bag to proceed');
      setCallOnce(!callOnce);
    }
  }, [basketObj.basket]);

  return (
    <div>
      {openAuthenticationModal && (
        <LoginAuthDialog
          placeOrder={placeOrder}
          openAuthenticationModal={openAuthenticationModal}
          setOpenAuthenticationModal={setOpenAuthenticationModal}
        />
      )}
      <Page title={'Checkout'} className="">
        <Typography variant="h1" className="sr-only">
          Checkout
        </Typography>
        <StoreInfoBar />
        <Box
          className={`checkout-wrapper ${
            buttonDisabled || basketObj?.orderSubmit ? 'disable-pointer' : ''
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
                                sx={{
                                  fontSize: '11pt!important',
                                  fontFamily: "'Sunborn-Sansone'!important",
                                  letterSpacing: '0.03562em',
                                }}
                                title="WHO'S IS PICKING UP?"
                              >
                                WHO'S PICKING UP?
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography
                                variant="h1"
                                sx={{
                                  fontSize: '29px !important',
                                  marginBottom: '0px',
                                  color: '#062C43',
                                  fontFamily: "'GritSans-Bold' !important",
                                  letterSpacing: '0.03562em',
                                }}
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
                                sx={{
                                  fontSize: '11pt!important',
                                  fontFamily: "'Sunborn-Sansone'!important",
                                  letterSpacing: '0.03562em',
                                }}
                              >
                                WHO'S PICKING UP?
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography
                                variant="h1"
                                sx={{
                                  fontSize: '29px !important',
                                  marginBottom: '0px',
                                  fontFamily: "'GritSans-Bold' !important",
                                  letterSpacing: '0.03562em',
                                }}
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
                                sx={{
                                  fontSize: '11pt !important',
                                  fontFamily: "'Sunborn-Sansone'!important",
                                  letterSpacing: '0.03562em',
                                }}
                                title="WHO'S IS PICKING UP?"
                              >
                                WHERE TO DELIVER
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography
                                variant="h1"
                                sx={{
                                  fontSize: '29px !important',
                                  marginBottom: '0px',
                                  fontFamily: "'GritSans-Bold' !important",
                                  color: '#062c43',
                                  letterSpacing: '0.03562em',
                                }}
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
                                sx={{
                                  fontSize: '11pt!important',
                                  fontFamily: "'Sunborn-Sansone'!important",
                                  letterSpacing: '0.03562em',
                                }}
                                title="WHO'S IS PICKING UP?"
                              >
                                WHO's ORDERING?
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography
                                variant="h1"
                                sx={{
                                  fontSize: '29px !important',
                                  marginBottom: '0px',
                                  fontFamily: "'GritSans-Bold' !important",
                                  letterSpacing: '0.03562em',
                                }}
                                title="DELIVERY INFO"
                                style={{
                                  fontSize: '11pt!important',
                                  fontFamily: "'Sunborn-Sansone'!important",
                                }}
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
                            // setShowSignUpGuest={setShowSignUpGuest}
                            // showSignUpGuest={!showSignUpGuest}
                            basket={basket}
                            pickupFormRef={pickupFormRef}
                            orderType={basket.deliverymode}
                          />
                        ) : null}
                        {basket &&
                        basket.deliverymode === DeliveryModeEnum.dispatch ? (
                          <DeliveryForm
                            basket={basket}
                            specialInstruction={specialInstruction}
                            setSpecialInstruction={setSpecialInstruction}
                            isContactless={isContactless}
                            setIsContactless={setIsContactless}
                            handleCheckChange={handleCheckChange}
                            deliveryFormRef={deliveryFormRef}
                          />
                        ) : null}
                      </Grid>
                    </Grid>
                    {isDesktop && (
                      <OrderTime orderType={basket?.deliverymode || ''} />
                    )}
                  </Grid>
                </Grid>
                {!isLoginUser() && (
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
                  <OrderTime orderType={basket?.deliverymode || ''} />
                </Grid>

                {isLoginUser() &&
                  rewards?.length === 0 &&
                  (loadingRewards || loadingRedemptions) && (
                    <CheckoutSkeletonUI />
                  )}

                {isLoginUser() && rewards.length > 0 && (
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
                  diplayOnScreenCreditCardForm={diplayOnScreenCreditCardForm}
                  zipCode={zipCode}
                  hideShow={hideShow}
                  setHideShow={setHideShow}
                  setZipCode={setZipCode}
                  cardExpiry={cardExpiry}
                  setCardExpiry={setCardExpiry}
                  ref={paymentInfoRef}
                  ccsfObj={ccsfObj}
                  basketAccessToken={basketAccessToken}
                />

                <Divider />
                <br />
                <br />
                <br />

                {/*second section ends here*/}
                {/* {billingSchemes.length < 1 ? (
                  <Grid container className="add-order">
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <Button
                        aria-label={
                          'Add Credit card'
                        }
                        type="submit"
                        className="link default last-focusable-element"
                        onClick={handleCreditCardSubmit}
                        variant="contained"
                        sx={{ fontFamily: "'Sunborn-Sansone'!important", fontSize: "11pt !important", }}
                      >
                        Add Credit card
                      </Button>
                    </Grid>
                  </Grid>) : ( */}
                <Grid container className="add-order">
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Button
                      disabled={
                        (buttonDisabled ||
                          basketObj?.loading ||
                          basketObj?.orderSubmit ||
                          (billingSchemes.length > 0 &&
                            totalPaymentCardAmount())) &&
                        (ccsfObj || ccsfObj2)
                      }
                      onClick={authenticationPlace}
                      id={'place-order-button'}
                      variant="contained"
                      title="PLACE ORDER"
                      sx={{
                        fontFamily: "'Sunborn-Sansone'!important",
                        fontSize: '11pt !important',
                      }}
                    >
                      PLACE ORDER
                    </Button>
                  </Grid>
                </Grid>
                {/* )} */}
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Page>
    </div>
  );
};

export default Checkout;
