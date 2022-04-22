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

const cardTypes: any = {
  amex: 'Amex',
  visa: 'Visa',
  discover: 'Discover',
  mastercard: 'Mastercard',
};

export function generateSubmitBasketPayload(
  formData: any,
  billingSchemes: any,
  deliverymode: string,
  authtoken: string,
  basket: any,
): RequestBasketSubmit {
  const billingSchemeStats = getBillingSchemesStats(billingSchemes);
  console.log('billingSchemeStats', billingSchemeStats);
  let paymentPayload: any = {};
  if (
    billingSchemeStats.selectedCreditCard === 1 &&
    billingSchemeStats.selectedGiftCard === 0
  ) {
    const cardIndex = billingSchemes.findIndex(
      (account: any) =>
        account.billingmethod === 'creditcardtoken' && account.selected,
    );
    const cardDetails = billingSchemes[cardIndex];
    paymentPayload = {
      token: cardDetails.token,
      billingmethod: BillingMethodEnum.creditcardtoken,
      cardtype: cardDetails.cardtype,
      expiryyear: cardDetails.expiryyear,
      expirymonth: cardDetails.expirymonth,
      cardlastfour: cardDetails.cardlastfour,
      zip: cardDetails.zip,
      saveonfile: SaveOnFileEnum.true,
    };
    if (cardDetails.billingaccountid) {
      paymentPayload.billingmethod = 'billingaccount';
      paymentPayload.billingaccountid = cardDetails.billingaccountid;
    }
  }

  if (
    billingSchemeStats.selectedCreditCard > 1 ||
    billingSchemeStats.selectedGiftCard === 1
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

        if (account.billingmethod === 'creditcardtoken' && tip > 0) {
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
        billingaccounts.push(obj);
      }
    });
    console.log('billingaccounts', billingaccounts);
    paymentPayload = {
      billingaccounts: billingaccounts,
    };
  }

  let payload: RequestBasketSubmit = {
    usertype: UserTypeEnum.guest,
    guestoptin: formData.emailNotification,
    ...paymentPayload,
  };

  if (
    deliverymode === DeliveryModeEnum.curbside ||
    deliverymode === DeliveryModeEnum.pickup
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

  if (authtoken && authtoken !== '') {
    payload.authtoken = authtoken;
    payload.usertype = UserTypeEnum.user;
    delete payload.firstname;
    delete payload.lastname;
    delete payload.emailaddress;
    delete payload.contactnumber;
    delete payload.guestoptin;
  }

  return payload;
}

export function formatCustomFields(customFields: any, formData: any) {
  console.log('customFields', customFields);

  let formatArray: any = [];

  customFields.forEach((field: any) => {
    let obj = {};

    if (field.label === 'Model') {
      obj = {
        id: field.id,
        value: formData.vehicleModal,
      };
    } else if (field.label === 'Make') {
      obj = {
        id: field.id,
        value: formData.vehicleMake,
      };
    } else if (field.label === 'Color') {
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

export function formatDeliveryAddress(
  formData: any,
  defaultDeliveryAddress: RequestDeliveryAddress | null,
) {
  if (defaultDeliveryAddress) {
    const isSame = verifySameDeliveryAddress(formData, defaultDeliveryAddress);
    if (isSame) {
      defaultDeliveryAddress.isdefault = formData.saveAddressCheck;
      return defaultDeliveryAddress;
    }
  }
  let obj: RequestDeliveryAddress = {
    building: formData.apartment,
    streetaddress: formData.streetAddress,
    city: formData.city,
    zipcode: formData.zipcode,
    phonenumber: formData.phone,
    isdefault: formData.saveAddressCheck,
  };
  return obj;
}

const verifySameDeliveryAddress = (
  formData: any,
  defaultDeliveryAddress: RequestDeliveryAddress,
) => {
  const currentAddress: any = {
    building: formData.apartment,
    streetaddress: formData.streetAddress,
    city: formData.city,
    zipcode: formData.zipcode,
  };
  const defaultAddress: any = {
    building: defaultDeliveryAddress.building,
    streetaddress: defaultDeliveryAddress.streetaddress,
    city: defaultDeliveryAddress.city,
    zipcode: defaultDeliveryAddress.zipcode,
  };
  console.log('currentAddress', currentAddress);
  console.log('defaultAddress', defaultAddress);
  return JSON.stringify(currentAddress) === JSON.stringify(defaultAddress);
};

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
  if ([0, 15, 30, 45].includes(minutes)) {
    return minutes;
  } else {
    let difference = Math.ceil(minutes / 15);
    difference = difference * 15 - minutes;
    minutes = difference + 30;
    return minutes;
  }
};

export function generateNextAvailableTimeSlots(
  openingTime: string,
  closingTime: string,
  isOpenAllDay: Boolean,
) {
  let timeSlots = [];
  let currentTime = moment();
  let startTime;

  let openAt = moment(openingTime, 'YYYYMMDD HH:mm');
  let closeAt = moment(closingTime, 'YYYYMMDD HH:mm');

  let minutes = currentTime.minutes();
  minutes = calculateMinutesDiff(minutes);

  // if (isOpenAllDay) {
  //   openAt.startOf('day');
  //   closeAt.endOf('day');
  // }

  if (currentTime.isAfter(closeAt)) {
    return [];
  } else if (currentTime.isBetween(openAt, closeAt)) {
    startTime = currentTime.add(minutes, 'minute');
  } else if (currentTime.isBefore(openAt)) {
    startTime = openAt.add(15, 'm');
  }

  let count = 0;
  const maxAllowed = 100;
  while (closeAt.diff(startTime, 'seconds') > 900 && count <= maxAllowed) {
    timeSlots.push(moment(startTime).format('YYYYMMDD HH:mm'));
    startTime && startTime.add('m', 15);
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
  };

  billingSchemes.forEach((account: any) => {
    billingSchemeStats = {
      creditCard:
        account.billingmethod === 'creditcardtoken'
          ? billingSchemeStats.creditCard + 1
          : billingSchemeStats.creditCard,
      giftCard:
        account.billingmethod === 'storedvalue'
          ? billingSchemeStats.giftCard + 1
          : billingSchemeStats.giftCard,
      selectedCreditCard:
        account.billingmethod === 'creditcardtoken' && account.selected
          ? billingSchemeStats.selectedCreditCard + 1
          : billingSchemeStats.selectedCreditCard,
      selectedGiftCard:
        account.billingmethod === 'storedvalue' && account.selected
          ? billingSchemeStats.selectedGiftCard + 1
          : billingSchemeStats.selectedGiftCard,
    };
  });

  return billingSchemeStats;
}

export function getCreditCardObj(cardDetails: any, billingSchemes: any) {
  const billingSchemeStats = getBillingSchemesStats(billingSchemes);

  let selected = billingSchemeStats.selectedCreditCard < 2;
  let cardObj: any = [
    {
      localId: getUniqueId(),
      selected: selected,
      billingmethod: 'creditcardtoken',
      amount: 0,
      tipportion: 0.0,
      token: cardDetails.id,
      cardtype: cardTypes[cardDetails.card.brand],
      expiryyear: cardDetails.card.exp_year,
      expirymonth: cardDetails.card.exp_month,
      cardlastfour: cardDetails.card.last4,
      zip: cardDetails.billing_details.address.postal_code,
      saveonfile: true,
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

  let selected = billingSchemeStats.selectedGiftCard === 0;

  let cardObj: any = [
    {
      localId: getUniqueId(),
      selected: selected,
      billingmethod: 'storedvalue',
      balance: balanceResponse.balance,
      amount: 0,
      tipportion: 0.0,
      billingschemeid: billingSchemeId,
      billingfields: [
        {
          name: 'number',
          value: body.cardnumber,
        },
      ],
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

  console.log('billingSchemeStats', billingSchemeStats);

  if (
    billingSchemeStats.selectedCreditCard === 0 &&
    billingSchemeStats.selectedGiftCard === 0
  ) {
    return billingSchemes;
  } else if (
    billingSchemeStats.selectedCreditCard === 1 &&
    billingSchemeStats.selectedGiftCard === 0
  ) {
    let creditCardAmount: any = basket.total;

    billingSchemes = billingSchemes.map((account: any) => {
      if (account.selected) {
        if (account.billingmethod === 'creditcardtoken') {
          account.amount = parseFloat(creditCardAmount);
        }
      } else {
        account.amount = 0;
      }
      return account;
    });
    return billingSchemes;
  } else if (
    billingSchemeStats.selectedCreditCard === 2 &&
    billingSchemeStats.selectedGiftCard === 0
  ) {
    let halfAmount: any = basket.total;
    halfAmount = (halfAmount / 2).toFixed(2);

    billingSchemes = billingSchemes.map((account: any) => {
      if (account.selected) {
        if (account.billingmethod === 'creditcardtoken') {
          account.amount = parseFloat(halfAmount);
        }
      } else {
        account.amount = 0;
      }

      return account;
    });
    return billingSchemes;
  } else if (
    billingSchemeStats.selectedCreditCard === 2 &&
    billingSchemeStats.selectedGiftCard === 1
  ) {
    const giftCardIndex = billingSchemes.findIndex(
      (account: any) => account.billingmethod === 'storedvalue',
    );

    let giftCardAmount: any =
      basket && billingSchemes[giftCardIndex].balance > basket.subtotal
        ? basket.subtotal
        : billingSchemes[giftCardIndex].balance;
    let halfAmount: any = 0;
    halfAmount = basket ? basket.total - giftCardAmount : 0;
    console.log('halfAmount', halfAmount);
    halfAmount = (halfAmount / 2).toFixed(2);

    billingSchemes = billingSchemes.map((account: any) => {
      if (account.selected) {
        if (account.billingmethod === 'creditcardtoken') {
          account.amount = parseFloat(halfAmount);
        } else if (account.billingmethod === 'storedvalue') {
          account.amount = parseFloat(giftCardAmount);
        }
      } else {
        account.amount = 0;
      }
      return account;
    });
    return billingSchemes;
  } else if (
    billingSchemeStats.selectedCreditCard === 1 &&
    billingSchemeStats.selectedGiftCard === 1
  ) {
    const giftCardIndex = billingSchemes.findIndex(
      (account: any) => account.billingmethod === 'storedvalue',
    );

    console.log('giftCardIndex', giftCardIndex)
    let giftCardAmount: any =
      basket && billingSchemes[giftCardIndex].balance > basket.subtotal
        ? basket.subtotal
        : billingSchemes[giftCardIndex].balance;
    let creditCardAmount: any = basket
      ? (basket.total - giftCardAmount).toFixed(2)
      : 0;

    billingSchemes = billingSchemes.map((account: any) => {
      if (account.selected) {
        if (account.billingmethod === 'creditcardtoken') {
          account.amount = parseFloat(creditCardAmount);
        } else if (account.billingmethod === 'storedvalue') {
          account.amount = parseFloat(giftCardAmount);
        }
      } else {
        account.amount = 0;
      }
      return account;
    });
    return billingSchemes;
  }
  return [];
  // if (
  //   billingSchemeStats.creditCard === 0 &&
  //   billingSchemeStats.giftCard === 0
  // ) {
  //   cardObj[0].amount = basket && basket?.total ? basket?.total : 0;
  //   cardObj[0].selected = true;
  // } else if (
  //   billingSchemeStats.creditCard === 1 &&
  //   billingSchemeStats.giftCard === 1
  // ) {
  //   let giftCardAmount = 0;
  //   let halfAmount: any = 0;
  //   const giftCardIndex = billingSchemesNewArray.findIndex(
  //     (account: any) => account.billingmethod === 'storedvalue',
  //   );
  //   if (giftCardIndex !== -1) {
  //     let updatedCreditCard = billingSchemesNewArray[giftCardIndex];
  //     giftCardAmount =
  //       basket && updatedCreditCard.balance > basket.subtotal
  //         ? basket.subtotal
  //         : updatedCreditCard.balance;
  //     updatedCreditCard.amount = giftCardAmount;
  //     updatedCreditCard.selected = true;
  //     billingSchemesNewArray[giftCardIndex] = updatedCreditCard;
  //   }
  //
  //   halfAmount = basket ? basket.total - giftCardAmount : 0;
  //   halfAmount = halfAmount / 2;
  //   halfAmount = halfAmount.toFixed(2);
  //
  //   const creditCardIndex = billingSchemesNewArray.findIndex(
  //     (account: any) => account.billingmethod === 'creditcardtoken',
  //   );
  //   if (creditCardIndex !== -1) {
  //     let updatedCreditCard = billingSchemesNewArray[creditCardIndex];
  //     updatedCreditCard.amount = parseFloat(halfAmount);
  //     updatedCreditCard.selected = true;
  //     billingSchemesNewArray[creditCardIndex] = updatedCreditCard;
  //   }
  //
  //   cardObj[0].amount = parseFloat(halfAmount);
  //   cardObj[0].selected = true;
  // } else if (
  //   billingSchemeStats.creditCard === 1 &&
  //   billingSchemeStats.giftCard === 0
  // ) {
  //   let halfAmount: any = basket ? basket.total : 0;
  //   halfAmount = halfAmount / 2;
  //   halfAmount = halfAmount.toFixed(2);
  //   const creditCardIndex = billingSchemesNewArray.findIndex(
  //     (account: any) => account.billingmethod === 'creditcardtoken',
  //   );
  //   if (creditCardIndex !== -1) {
  //     let updatedCreditCard = billingSchemesNewArray[creditCardIndex];
  //     updatedCreditCard.amount = parseFloat(halfAmount);
  //     updatedCreditCard.selected = true;
  //     billingSchemesNewArray[creditCardIndex] = updatedCreditCard;
  //   }
  //
  //   cardObj[0].amount = parseFloat(halfAmount);
  //   cardObj[0].selected = true;
  // }
}
