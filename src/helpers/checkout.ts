import { RequestBasketSubmit, ResponseRestaurantCalendars, RequestUpdateBasketTimeWanted } from '../types/olo-api';
import {BillingMethodEnum, UserTypeEnum, SaveOnFileEnum, CountryEnum} from '../types/olo-api/olo-api.enums';
import { CalendarTypeEnum, HoursListing } from './hoursListing';
import moment from 'moment';

const cardTypes: any = {
    amex: 'Amex',
    visa:  'Visa', 
    discover: 'Discover', 
    mastercard: 'Mastercard'
}

export function generateSubmitBasketPayload(pickupInfo: any, cardDetails: any, authtoken: string): RequestBasketSubmit  {

    const payload: RequestBasketSubmit = {
        billingmethod: BillingMethodEnum.creditcardtoken,
        usertype: UserTypeEnum.guest,       
        firstname: pickupInfo.firstName,
        lastname: pickupInfo.lastName,
        emailaddress: pickupInfo.email,
        contactnumber: pickupInfo.phone,
        receivinguser: {
          firstname: pickupInfo.firstName,
          lastname: pickupInfo.lastName,
          emailaddress: pickupInfo.email,
          contactnumber: pickupInfo.phone,
        },
        token: cardDetails.id,
        cardtype: cardTypes[cardDetails.card.brand],
        expiryyear: cardDetails.card.exp_year,
        expirymonth: cardDetails.card.exp_month,        
        cardlastfour: cardDetails.card.last4,
        streetaddress: 'Pennsylvania Ave',
        streetaddress2: 'NW Washington, DC.',
        city: 'Washington',
        zip: '20500',
        country: CountryEnum.US,
        saveonfile: SaveOnFileEnum.true,
        guestoptin: pickupInfo.emailNotification
    }

    console.log('authtoken', authtoken)

    if(authtoken && authtoken !== ''){
        payload.authtoken = authtoken;
        payload.usertype = UserTypeEnum.user;
        delete payload.firstname;
        delete payload.lastname;
        delete payload.emailaddress;
        delete payload.contactnumber;
        delete payload.guestoptin;
    } 

    return payload;  
};


const isTimeSame = (fTime: string, sTime: string): boolean => {
    return fTime.split(' ')[1] === sTime.split(' ')[1];
};

export function GetRestaurantHoursRange (hours: ResponseRestaurantCalendars, type: CalendarTypeEnum): HoursListing[] {
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
};

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

export function generateNextAvailableTimeSlots (
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
  };

  export function createTimeWantedPayload (time: string)  {
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
  };
