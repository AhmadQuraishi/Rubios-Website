import { RequestBasketSubmit } from '../types/olo-api';
import {BillingMethodEnum, UserTypeEnum, SaveOnFileEnum, CountryEnum} from '../types/olo-api/olo-api.enums';

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

    if(authtoken !== ''){
        payload.authtoken = authtoken;
        payload.usertype = UserTypeEnum.user;
    }

    return payload;  
};
