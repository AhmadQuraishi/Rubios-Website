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
  cardDetails: any,
  deliverymode: string,
  authtoken: string,
): RequestBasketSubmit {
  let payload: RequestBasketSubmit = {
    billingmethod: BillingMethodEnum.creditcardtoken,
    usertype: UserTypeEnum.guest,
    token: cardDetails.id,
    cardtype: cardTypes[cardDetails.card.brand],
    expiryyear: cardDetails.card.exp_year,
    expirymonth: cardDetails.card.exp_month,
    cardlastfour: cardDetails.card.last4,
    zip: cardDetails.billing_details.address.postal_code,
    saveonfile: SaveOnFileEnum.true,
    guestoptin: formData.emailNotification,
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
