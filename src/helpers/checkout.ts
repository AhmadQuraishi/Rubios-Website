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
  }

  if (
    billingSchemeStats.selectedCreditCard > 1 ||
    billingSchemeStats.selectedGiftCard === 1
  ) {
    let billingaccounts: any = [];
    billingSchemes.forEach((account: any) => {
      let obj = {
        ...account,
      };
      if (account.billingaccountid) {
        obj.billingmethod = 'billingaccount';
      }
      delete obj.selected;
      delete obj.localId;
      delete obj.balance;
      billingaccounts.push(obj);
    });
    // billingaccounts = billingaccounts.reduce((filtered: any, account: any) => {
    //   if (account.selected) {
    //     delete account.localId;
    //     delete account.selected;
    //     filtered.push(account);
    //   }
    //   return filtered;
    // }, []);
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
