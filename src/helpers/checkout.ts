import {
  RequestBasketSubmit,
  ResponseRestaurantCalendars,
  RequestUpdateBasketTimeWanted,
  RequestDeliveryAddress,
} from '../types/olo-api';
import {
  BillingMethodEnum,
  UserTypeEnum,
  SaveOnFileEnum,
  CountryEnum,
  DeliveryModeEnum,
} from '../types/olo-api/olo-api.enums';
import { CalendarTypeEnum, HoursListing } from './hoursListing';
import moment from 'moment';
import { generateCCSFToken } from '../services/basket';
import { isLoginUser } from './auth';
import { requestDelUserDelAddress } from '../services/user';
import { store } from '../redux/store';
import { updateDuplicateAddress } from '../redux/actions/basket/checkout';

const cardTypes: any = {
  amex: 'Amex',
  visa: 'Visa',
  discover: 'Discover',
  mastercard: 'Mastercard',
};

export function removePreviousAddresses(
  basketAddresses: any,
  deliveryAddress: any,
  basket: any,
  removeAll = false,
) {
  if (basketAddresses?.duplicated?.length > 0) {
    let filterSavedAddress: number[] = [];

    if (!removeAll) {
      filterSavedAddress = basketAddresses?.duplicated?.filter(
        (addressId: any) =>
          // !basketAddresses.saved.includes(addressId) &&
          basket?.deliveryaddress?.id !== addressId &&
          deliveryAddress?.id !== addressId,
      );
    } else {
      filterSavedAddress = basketAddresses?.duplicated;
    }

    console.log('filterSavedAddress', filterSavedAddress);
    if (filterSavedAddress?.length > 0) {
      filterSavedAddress.forEach((id: any) => {
        requestDelUserDelAddress(id);
      });
      const remainingAddress = basketAddresses?.duplicated.filter(
        (addressId: any) => !filterSavedAddress.includes(addressId),
      );
      store.dispatch(updateDuplicateAddress(remainingAddress));
    }
  }
}
export function generateSubmitBasketPayload(
  formData: any,
  billingSchemes: any,
  deliverymode: string,
  authtoken: string,
  basket: any,
  basketAccessToken: any,
): RequestBasketSubmit {
  const billingSchemeStats = getBillingSchemesStats(billingSchemes);

  console.log('billingSchemeStats', billingSchemeStats);
  let paymentPayload: any = {};
  // if (
  //   billingSchemeStats.selectedCreditCard === 1 &&
  //   billingSchemeStats.selectedGiftCard === 0
  // ) {
  //   const cardIndex = billingSchemes.findIndex(
  //     (account: any) =>
  //       account.billingmethod === 'creditcardtoken' && account.selected,
  //   );
  //   const cardDetails = billingSchemes[cardIndex];
  //   paymentPayload = {
  //     token: cardDetails.token,
  //     billingmethod: BillingMethodEnum.creditcardtoken,
  //     cardtype: cardDetails.cardtype,
  //     expiryyear: cardDetails.expiryyear,
  //     expirymonth: cardDetails.expirymonth,
  //     cardlastfour: cardDetails.cardlastfour,
  //     zip: cardDetails.zip,
  //     saveonfile: SaveOnFileEnum.true,
  //   };
  //   if (cardDetails.billingaccountid) {
  //     paymentPayload.billingmethod = 'billingaccount';
  //     paymentPayload.billingaccountid = cardDetails.billingaccountid;
  //   }
  // } else
  if (
    billingSchemeStats.selectedCreditCard === 1 ||
    billingSchemeStats.selectedGiftCard > 0
  ) {
    let billingaccounts: any = [];
    let tip = (basket && basket.tip) || 0;
    console.log('tipppp', tip);
    billingSchemes.forEach((account: any) => {
      if (account.selected) {
        let obj = {
          ...account,
        };
        if (account.billingaccountid) {
          obj.billingmethod = 'billingaccount';
        }

        if (tip > 0) {
          if (obj.amount >= tip) {
            obj.tipportion = tip;
            tip = 0;
          } else {
            obj.tipportion = obj.amount;
            tip = +(tip - obj.amount).toFixed(2);
          }
        }
        delete obj.selected;
        delete obj.localId;
        delete obj.balance;
        delete obj.alwaysVisible;
        billingaccounts.push(obj);
      }
    });
    console.log('billingaccounts', billingaccounts);
    paymentPayload = {
      billingaccounts: billingaccounts,
    };
  }

  let payload: RequestBasketSubmit = {
    id: basket.id,
    accessToken: basketAccessToken,
    usertype: UserTypeEnum.guest,
    guestoptin: formData.emailNotification,
    ...paymentPayload,
  };

  if (
    deliverymode === DeliveryModeEnum.curbside ||
    deliverymode === DeliveryModeEnum.pickup ||
    deliverymode === DeliveryModeEnum.dinein ||
    deliverymode === DeliveryModeEnum.dispatch
  ) {
    payload = {
      ...payload,
      firstname: formData.firstName,
      lastname: formData.lastName,
      emailaddress: formData.email,
      contactnumber: formData.phone,
      receivinguser: {
        firstname: formData.firstName,
        lastname: formData.lastName,
        emailaddress: formData.email,
        contactnumber: formData.phone,
      },
    };
  }

  if (isLoginUser()) {
    // payload.authtoken = authtoken;
    payload.usertype = UserTypeEnum.user;
    // delete payload.firstname;
    // delete payload.lastname;
    // delete payload.emailaddress;
    // delete payload.contactnumber;
    delete payload.guestoptin;
  }

  return payload;
}

export function formatCustomFields(customFields: any, formData: any) {
  console.log('customFields', customFields);

  let formatArray: any = [];

  customFields.forEach((field: any) => {
    let obj = {};

    if (field.label === 'Table Number' && formData.tableNumber !== '') {
      obj = {
        id: field.id,
        value: formData.tableNumber,
      };
    } else if (field.label === 'Model' && formData.vehicleModal !== '') {
      obj = {
        id: field.id,
        value: formData.vehicleModal,
      };
    } else if (field.label === 'Make' && formData.vehicleMake !== '') {
      obj = {
        id: field.id,
        value: formData.vehicleMake,
      };
    } else if (field.label === 'Color' && formData.vehicleColor !== '') {
      obj = {
        id: field.id,
        value: formData.vehicleColor,
      };
    }
    if (Object.keys(obj).length) {
      formatArray.push(obj);
    }
  });

  return formatArray;
}

// export function formatDeliveryAddress(
//   formData: any,
//   defaultDeliveryAddress: RequestDeliveryAddress | null,
// ) {
//   if (defaultDeliveryAddress) {
//     const isSame = verifySameDeliveryAddress(formData, defaultDeliveryAddress);
//     if (isSame) {
//       defaultDeliveryAddress.isdefault = formData.saveAddressCheck;
//       return defaultDeliveryAddress;
//     }
//   }
//   let obj: RequestDeliveryAddress = {
//     building: formData.apartment,
//     streetaddress: formData.streetAddress,
//     city: formData.city,
//     zipcode: formData.zipcode,
//     phonenumber: formData.phone,
//     isdefault: formData.saveAddressCheck,
//   };
//   return obj;
// }

const isTimeSame = (fTime: string, sTime: string): boolean => {
  return fTime.split(' ')[1] === sTime.split(' ')[1];
};

export function GetRestaurantHoursRange(
  hours: ResponseRestaurantCalendars,
  type: CalendarTypeEnum,
): HoursListing[] {
  const selectedStoreHours = hours?.calendar.find((x) => x.type === type);
  let newHoursArray: HoursListing[] = [];
  if (selectedStoreHours) {
    selectedStoreHours &&
      selectedStoreHours.ranges.forEach((item, index) => {
        newHoursArray.push({
          label: item.weekday.substring(0, 1),
          start: item.start,
          end: item.end,
          isOpenAllDay: isTimeSame(item.start, item.end),
        });
      });
  }
  return newHoursArray;
}

const calculateMinutesDiff = (minutes: number): number => {
  if (minutes % 15 === 0) {
    return 0;
  } else {
    let difference = Math.trunc(minutes / 15);
    difference = (difference + 1) * 15 - minutes;
    return difference;
  }
};

export function generateNextAvailableTimeSlots(
  openingTime: string,
  closingTime: string,
  leadTime: number,
  orderType: string,
) {
  let timeSlots = [];
  let currentTime = moment();
  if (orderType === 'dispatch') {
    currentTime = currentTime.add(leadTime, 'minutes');
  }
  let startTime;
  let openAt = moment(openingTime, 'YYYYMMDD HH:mm');
  let closeAt = moment(closingTime, 'YYYYMMDD HH:mm');

  if (currentTime.isAfter(closeAt)) {
    return [];
  } else if (currentTime.isBetween(openAt, closeAt)) {
    startTime = currentTime;
  } else {
    startTime = openAt;
    if (orderType === 'dispatch') {
      startTime.add(leadTime, 'minutes');
    } else {
      startTime.add(15, 'minutes');
    }
  }

  let minutes = startTime.minutes();
  minutes = calculateMinutesDiff(minutes);
  startTime = startTime.add(minutes, 'minutes');

  let count = 0;
  const maxAllowed = 100;
  while (closeAt.diff(startTime, 'seconds') > 0 && count <= maxAllowed) {
    timeSlots.push(moment(startTime).format('YYYYMMDD HH:mm'));
    startTime && startTime.add(15, 'm');
    count++;
  }
  return timeSlots;
}

export function createTimeWantedPayload(time: string) {
  const date = moment(time, 'YYYYMMDD HH:mm');
  const payload: RequestUpdateBasketTimeWanted = {
    ismanualfire: false,
    year: date.year(),
    month: date.month() + 1,
    day: date.date(),
    hour: date.hour(),
    minute: date.minute(),
  };
  return payload;
}

export function getUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function getBillingSchemesStats(billingSchemes: any) {
  let billingSchemeStats: any = {
    creditCard: 0,
    giftCard: 0,
    selectedCreditCard: 0,
    selectedGiftCard: 0,
    savedCards: 0,
  };

  billingSchemes.forEach((account: any) => {
    billingSchemeStats = {
      creditCard:
        account.billingmethod === 'creditcard'
          ? billingSchemeStats.creditCard + 1
          : billingSchemeStats.creditCard,
      giftCard:
        account.billingmethod === 'storedvalue'
          ? billingSchemeStats.giftCard + 1
          : billingSchemeStats.giftCard,
      selectedCreditCard:
        account.billingmethod === 'creditcard' && account.selected
          ? billingSchemeStats.selectedCreditCard + 1
          : billingSchemeStats.selectedCreditCard,
      selectedGiftCard:
        account.billingmethod === 'storedvalue' && account.selected
          ? billingSchemeStats.selectedGiftCard + 1
          : billingSchemeStats.selectedGiftCard,
      savedCards:
        account.billingmethod === 'creditcard' && account.savedCard
          ? billingSchemeStats.savedCards + 1
          : billingSchemeStats.savedCards,
    };
  });

  return billingSchemeStats;
}

export function getCreditCardObj(cardDetails: any, billingSchemes: any) {
  const billingSchemeStats = getBillingSchemesStats(billingSchemes);

  // const totalCardsSelected =
  //   billingSchemeStats.selectedGiftCard + billingSchemeStats.selectedCreditCard;

  let selected = billingSchemeStats.selectedCreditCard < 1;

  let cardObj: any = [
    {
      localId: getUniqueId(),
      selected: true,
      billingmethod: 'creditcard',
      amount: 0,
      tipportion: 0.0,
      // token: cardDetails.id,
      // cardtype: cardTypes[cardDetails.card.brand],
      expiryyear: cardDetails.exp_year,
      expirymonth: cardDetails.exp_month,
      // cardlastfour: cardDetails.card.last4,
      zip: cardDetails.postal_code,
      saveonfile: true,
      alwaysVisible: false,
    },
  ];

  return cardObj;
}

export function getGiftCardObj(
  balanceResponse: any,
  billingSchemeId: any,
  body: any,
  billingSchemes: any,
) {
  const billingSchemeStats = getBillingSchemesStats(billingSchemes);

  // const totalCardsSelected =
  //   billingSchemeStats.selectedGiftCard + billingSchemeStats.selectedCreditCard;

  let selected = billingSchemeStats.selectedGiftCard < 4;

  let cardObj: any = [
    {
      localId: getUniqueId(),
      selected: selected,
      billingmethod: 'storedvalue',
      balance: balanceResponse.balance,
      amount: 0,
      tipportion: 0.0,
      saveOnFile: true,
      billingschemeid: billingSchemeId,
      billingfields: [
        {
          name: 'number',
          value: body.cardnumber,
        },
      ],
      alwaysVisible: false,
    },
  ];

  if (body.pin && body.pin !== '') {
    cardObj[0].billingfields.push({
      name: 'pin',
      value: body.pin,
    });
  }

  return cardObj;
}

export function updatePaymentCardsAmount(billingSchemes: any, basket: any) {
  const billingSchemeStats = getBillingSchemesStats(billingSchemes);

  // if (
  //   billingSchemeStats.selectedCreditCard === 0 &&
  //   billingSchemeStats.selectedGiftCard === 0
  // ) {
  //   billingSchemes = billingSchemes.map((account: any) => {
  //     account.amount = 0;
  //     return account;
  //   });
  //   return billingSchemes;
  // }
  // else if (
  //   (billingSchemeStats.selectedCreditCard === 1 ||
  //     billingSchemeStats.selectedCreditCard === 2 ||
  //     billingSchemeStats.selectedCreditCard === 3) &&
  //   billingSchemeStats.selectedGiftCard === 0
  // ) {
  //   let creditCardAmount: any = (
  //     basket.total / billingSchemeStats.selectedCreditCard
  //   ).toFixed(2);
  //
  //   billingSchemes = billingSchemes.map((account: any) => {
  //     if (account.selected) {
  //       if (account.billingmethod === 'creditcardtoken') {
  //         account.amount = parseFloat(creditCardAmount);
  //       }
  //     } else {
  //       account.amount = 0;
  //     }
  //     return account;
  //   });
  //   return billingSchemes;
  // }
  // if (
  //   (billingSchemeStats.selectedCreditCard === 0 ||
  //     billingSchemeStats.selectedCreditCard === 1 ||
  //     billingSchemeStats.selectedCreditCard === 2 ||
  //     billingSchemeStats.selectedCreditCard === 2) &&
  //   (billingSchemeStats.selectedGiftCard === 0 ||
  //     billingSchemeStats.selectedGiftCard === 1 ||
  //     billingSchemeStats.selectedGiftCard === 2)
  // ) {
  let total = basket && basket.total ? basket.total : 0;

  billingSchemes.sort((a: any, b: any) =>
    b.billingmethod > a.billingmethod
      ? 1
      : a.billingmethod > b.billingmethod
      ? -1
      : 0,
  );

  billingSchemes.sort((a: any, b: any) =>
    a.balance > b.balance ? 1 : b.balance > a.balance ? -1 : 0,
  );

  billingSchemes = billingSchemes.map((account: any) => {
    if (account.selected) {
      if (account.billingmethod === 'storedvalue') {
        let giftCardAmount: any =
          account.balance >= total ? total : account.balance;
        total = (total - giftCardAmount).toFixed(2);
        account.amount = parseFloat(giftCardAmount);
      } else if (account.billingmethod === 'creditcard') {
        account.amount = parseFloat(total);
      }
    } else {
      account.amount = 0;
    }
    return account;
  });
  // if (billingSchemeStats.selectedCreditCard > 0) {
  //   console.log('working 1');
  //   const remaining: any = remainingAmount(basket, billingSchemes);
  //   console.log('working 2', remaining);
  //   if (remaining === -0.01) {
  //     let runOnce = true;
  //     billingSchemes = billingSchemes.map((account: any) => {
  //       if (!runOnce) {
  //         console.log('working 3');
  //         return account;
  //       }
  //       if (account.selected) {
  //         if (account.billingmethod === 'creditcardtoken') {
  //           account.amount = account.amount + remaining;
  //           console.log('working 4');
  //           runOnce = false;
  //         }
  //       }
  //       return account;
  //     });
  //   }
  // }
  return billingSchemes;
  // }

  // else if (
  //   billingSchemeStats.selectedCreditCard === 0 &&
  //   billingSchemeStats.selectedGiftCard === 2
  // ) {
  //   let total = basket.total;
  //
  //   billingSchemes = billingSchemes.map((account: any) => {
  //     if (account.selected) {
  //       if (account.billingmethod === 'storedvalue') {
  //         let giftCardAmount =
  //           basket && account.balance >= total ? total : account.balance;
  //         total = (total - giftCardAmount).toFixed(2);
  //         console.log('total', total);
  //         account.amount = parseFloat(giftCardAmount);
  //       }
  //     } else {
  //       account.amount = 0;
  //     }
  //     return account;
  //   });
  //
  //   return billingSchemes;
  // } else if (
  //   billingSchemeStats.selectedCreditCard === 1 &&
  //   billingSchemeStats.selectedGiftCard === 0
  // ) {
  //   let creditCardAmount: any = basket.total;
  //
  //   billingSchemes = billingSchemes.map((account: any) => {
  //     if (account.selected) {
  //       if (account.billingmethod === 'creditcardtoken') {
  //         account.amount = parseFloat(creditCardAmount);
  //       }
  //     } else {
  //       account.amount = 0;
  //     }
  //     return account;
  //   });
  //   return billingSchemes;
  // } else if (
  //   billingSchemeStats.selectedCreditCard === 2 &&
  //   billingSchemeStats.selectedGiftCard === 0
  // ) {
  //   let halfAmount: any = basket.total;
  //   halfAmount = (halfAmount / 2).toFixed(2);
  //
  //   billingSchemes = billingSchemes.map((account: any) => {
  //     if (account.selected) {
  //       if (account.billingmethod === 'creditcardtoken') {
  //         account.amount = parseFloat(halfAmount);
  //       }
  //     } else {
  //       account.amount = 0;
  //     }
  //
  //     return account;
  //   });
  //   return billingSchemes;
  // } else if (
  //   billingSchemeStats.selectedCreditCard === 2 &&
  //   billingSchemeStats.selectedGiftCard === 1
  // ) {
  //   const giftCardIndex = billingSchemes.findIndex(
  //     (account: any) => account.billingmethod === 'storedvalue',
  //   );
  //
  //   let giftCardAmount: any =
  //     basket && billingSchemes[giftCardIndex].balance > basket.subtotal
  //       ? basket.subtotal
  //       : billingSchemes[giftCardIndex].balance;
  //   let halfAmount: any = 0;
  //   halfAmount = basket ? basket.total - giftCardAmount : 0;
  //   console.log('halfAmount', halfAmount);
  //   halfAmount = halfAmount > 0 ? (halfAmount / 2).toFixed(2) : 0;
  //
  //   billingSchemes = billingSchemes.map((account: any) => {
  //     if (account.selected) {
  //       if (account.billingmethod === 'creditcardtoken') {
  //         account.amount = parseFloat(halfAmount);
  //       } else if (account.billingmethod === 'storedvalue') {
  //         account.amount = parseFloat(giftCardAmount);
  //       }
  //     } else {
  //       account.amount = 0;
  //     }
  //     return account;
  //   });
  //   return billingSchemes;
  // } else if (
  //   billingSchemeStats.selectedCreditCard === 1 &&
  //   billingSchemeStats.selectedGiftCard === 1
  // ) {
  //   const giftCardIndex = billingSchemes.findIndex(
  //     (account: any) => account.billingmethod === 'storedvalue',
  //   );
  //
  //   console.log('giftCardIndex', giftCardIndex);
  //   let giftCardAmount =
  //     basket && billingSchemes[giftCardIndex].balance >= basket.total
  //       ? basket.total
  //       : billingSchemes[giftCardIndex].balance;
  //
  //   let creditCardAmount: any = basket
  //     ? (basket.total - giftCardAmount).toFixed(2)
  //     : 0;
  //
  //   billingSchemes = billingSchemes.map((account: any) => {
  //     if (account.selected) {
  //       if (account.billingmethod === 'creditcardtoken') {
  //         account.amount =
  //           creditCardAmount > 0 ? parseFloat(creditCardAmount) : 0;
  //       } else if (account.billingmethod === 'storedvalue') {
  //         account.amount = parseFloat(giftCardAmount);
  //       }
  //     } else {
  //       account.amount = 0;
  //     }
  //     return account;
  //   });
  //   return billingSchemes;
  // }
  // return [];
}

export function remainingAmount(basket: any, billingSchemes: any) {
  if (basket && billingSchemes) {
    let amountSelected = billingSchemes.reduce((sum: any, account: any) => {
      if (account.selected) {
        sum = sum + account.amount;
      }
      return sum;
    }, 0);

    amountSelected = amountSelected.toFixed(2);
    amountSelected = parseFloat(amountSelected);

    let remainingAmount = (basket?.total - amountSelected).toFixed(2);

    if (remainingAmount !== 'NAN') {
      return remainingAmount;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}
