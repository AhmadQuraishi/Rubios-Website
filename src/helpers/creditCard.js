export class CreditCardCCSF {
  constructor(elements) {
    // eslint-disable-next-line no-undef
    this.checkoutFrame = new Olo.CheckoutFrame(elements);
  }
  initialize(basketId, brandAccessId) {
    this.checkoutFrame.initialize({
      brandAccessId: brandAccessId,
      basketGuid: basketId,
      // brandAccessId: 'WX9GUJ9L6T2wwj2mPw_OGB9HM9ThJNPL',
      // basketGuid: 'a41c1c54-ec0f-4b5b-bcd7-ea484feffa50',
      styles: {
        cardNumber:
          'font-size: 14px;padding-top: 5px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;border-left-width: 0px; width: 80%',
        cvv: 'font-size: 14px;padding-top: 5px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;border-left-width: 0px; width: 80%',
      },
      cardNumber: {
        placeholder: '',
      },
      cvv: {
        placeholder: '',
      },
    });
  }

  registerError(callBack) {
    this.checkoutFrame.on('error', function (errors) {
      callBack(errors);
      // console.log('Iframe Errors', errors);
      errors.forEach((error) => {
        console.log(error.code);
        console.log(error.description);
      });
    });
  }

  registerSuccess(callBack) {
    this.checkoutFrame.on('success', function (order) {
      callBack(order);
      console.log('Iframe success', order);
      // full order field list below
    });
  }
  registerFocus(callBack) {
    this.checkoutFrame.on('focus', function (evt) {
      console.log(evt);
      callBack(evt);
    });
  }

  registerComplete(callBack) {
    this.checkoutFrame.on('complete', function (evt) {
      callBack(evt);
      console.log(evt);
    });
  }
  registerReady(callBack) {
    this.checkoutFrame.on('ready', function (evt) {
      callBack(evt);
    });
  }

  submit(payload) {
    this.checkoutFrame.submit(payload);
  }
}
// /*eslint no-undef: "error"*/
// <script>
// let checkoutFrame;
//
// checkoutFrame = new Olo.CheckoutFrame({
//   cardElement: 'credit-card-info-div',
//   cvvElement: 'cvv-info-div',
// });
//
// checkoutFrame.initialize({
//   brandAccessId: 'WX9GUJ9L6T2wwj2mPw_OGB9HM9ThJNPL',
//   basketGuid: 'a41c1c54-ec0f-4b5b-bcd7-ea484feffa50',
//   styles: {
//     cardNumber: 'border-color: green; border-bottom: 5px solid red;',
//     cvv: 'border-color: green;',
//   },
//   cardNumber: {
//     placeholder: 'Credit Card',
//   },
//   cvv: {
//     placeholder: 'Cvv',
//   },
// });
//
// checkoutFrame.on('focus', function (evt) {
//   console.log('evt', evt);
// });
//
// checkoutFrame.submit({
//   id: '48c4d301-795e-4990-baf9-8d358a0259d4',
//   accessToken: 'YzIOzJ5T6wvlYXtSq_Weq_7MZr6FOYBP',
//   "billingaccounts": [
//     {
//         "billingmethod": "storedvalue",
//         "amount": 100,
//         "tipportion": 0,
//         "billingschemeid": 1282,
//         "billingfields": [
//             {
//                 "name": "number",
//                 "value": "4111111111111111111"
//             },
//             {
//                 "name": "pin",
//                 "value": "123"
//             }
//         ]
//     },
//     {
//         "billingmethod": "creditcard",
//         "amount": 195.24,
//         "tipportion": 0,
//         "cardtype": "Visa",
//         "expiryyear": 2033,
//         "expirymonth": 12,
//         "cardlastfour": "1111",
//         "zip": "12323",
//         "saveonfile": true
//     }
// ],
//   "receivinguser": {
//     "firstname": "Muhammad",
//     "lastname": "Sohail",
//     "emailaddress": "sohail@citrusbits.com",
//     "contactnumber": "3035286541"
//   },
//   userType: 'user',
// });
//
// checkoutFrame.on('error', function (errors) {
//   console.log('Iframe Errors', errors);
//   errors.forEach((error) => {
//     console.log(error.code);
//     console.log(error.description);
//   });
// });
//
// checkoutFrame.on('success', function (order) {
//   console.log('Iframe success', order);
//   // full order field list below
// });
// </script>

// {
//   "usertype": "user",
//   "billingaccounts": [
//   {
//     "billingmethod": "billingaccount",
//     "amount": 82.43,
//     "tipportion": 7,
//     "cardlastfour": "1111",
//     "billingaccountid": "16185741"
//   },
//   {
//     "billingmethod": "billingaccount",
//     "amount": 0,
//     "tipportion": 0,
//     "cardtype": "Visa",
//     "cardlastfour": "1111",
//     "billingaccountid": "2147844159",
//     "billingschemeid": 1
//   }
// ],
//   "receivinguser": {
//   "firstname": "Muhammad",
//     "lastname": "Sohail",
//     "emailaddress": "sohail@citrusbits.com",
//     "contactnumber": "3035286541"
// },
//   "authtoken": "ynUJ4SAOgaB6SxFMKHuqbCvlOdhQ3HLK"
// }
