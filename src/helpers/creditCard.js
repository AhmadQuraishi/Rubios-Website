// /*eslint no-undef: "error"*/
//
// let checkoutFrame;
// // eslint-disable-next-line no-undef
// checkoutFrame = new Olo.CheckoutFrame({
//   cardElement: 'credit-card-info-div',
//   cvvElement: 'cvv-info-div',
// });
//
// checkoutFrame.initialize({
//   brandAccessId: 'WX9GUJ9L6T2wwj2mPw_OGB9HM9ThJNPL',
//   basketGuid: '6E6C13EB-C128-A539-A911-EEE25A024BA2',
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
//   id: '0e62426c-d579-4df5-be66-fe395d44c3f8',
//   accessToken: 'e-qfElHsZDMnC4E-wXtOih3FgiSmo0vn',
//   billingAccounts: [
//     // For creditcard billing methods the cardnumber and cvv fields are collected by CCSF.
//     {
//       amount: 2.1,
//       billingMethod: 'creditcard',
//       city: 'New York',
//       expiryMonth: '1',
//       expiryYear: '2024',
//       state: 'NY',
//       streetAddress: '26 Broadway',
//       streetAddress2: '',
//       zip: '10004',
//       tipPortion: 0,
//     },
//     {
//       amount: 0.1,
//       billingMethod: 'cash',
//       tipPortion: 0,
//     },
//     // For storedvalue billing methods the number and pin fields are not collected by CCSF.
//     {
//       amount: 0.29,
//       billingFields: [
//         {
//           name: 'number',
//           value: '6000000000000123',
//         },
//         {
//           name: 'pin',
//           value: '123',
//         },
//       ],
//       billingMethod: 'storedvalue',
//       billingSchemeId: '1',
//       tipPortion: 0,
//     },
//     {
//       amount: 5.0,
//       billingMethod: 'billingaccount',
//       billingAccountId: '2152401257',
//       tipPortion: 0,
//     },
//   ],
//   contactNumber: '5555551212',
//   emailAddress: 'john.smith@olo.com',
//   firstName: 'John',
//   guestOptIn: false,
//   lastName: 'Smith',
//   userType: 'guest',
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
