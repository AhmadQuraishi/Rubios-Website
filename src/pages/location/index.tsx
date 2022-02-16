import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import LocationCard from '../../components/location';
import './location.css';
import axios from 'axios';



const Location = () => {
  const containerStyle = {
    width: '100%',
    height: '100vh',
  };
  const state = {
    responseData : []
  }

  // const center = {
  //   lat: 32.715736,
  //   lng: -117.161087,
  // };
  const centers = [{
    lat: 37.772,
    lng: -122.214
  },
  {
    lat: 37.672,
    lng: -122.219
  },
  {
    lat: 37.832,
    lng: -122.424
  }];
  const response ={
    "restaurants": [
        {
            "acceptsordersbeforeopening": false,
            "acceptsordersuntilclosing": true,
            "advanceonly": false,
            "advanceorderdays": 14,
            "allowhandoffchoiceatmanualfire": false,
            "attributes": [],
            "availabilitymessage": null,
            "brand": "rubios",
            "calendars": null,
            "candeliver": false,
            "canpickup": true,
            "city": "New York",
            "contextualpricing": null,
            "country": "US",
            "crossstreet": "",
            "customerfacingmessage": "",
            "customfields": [
                {
                    "id": 141563,
                    "label": "Make",
                    "qualificationcriteria": "CurbsidePickupOrdersOnly",
                    "required": true,
                    "validationregex": ""
                },
                {
                    "id": 141564,
                    "label": "Model",
                    "qualificationcriteria": "CurbsidePickupOrdersOnly",
                    "required": true,
                    "validationregex": ""
                },
                {
                    "id": 141565,
                    "label": "Color",
                    "qualificationcriteria": "CurbsidePickupOrdersOnly",
                    "required": true,
                    "validationregex": ""
                },
                {
                    "id": 147827,
                    "label": "Table Number",
                    "qualificationcriteria": "DineInOrdersOnly",
                    "required": true,
                    "validationregex": "^[0-9]+$"
                }
            ],
            "deliveryarea": "",
            "deliverydelayalertenabled": false,
            "deliverydelayalertmessage": null,
            "deliveryfee": 0,
            "deliveryfeetiers": [],
            "distance": 0.01,
            "extref": "123",
            "hasolopass": false,
            "id": 60854,
            "isavailable": true,
            "iscurrentlyopen": true,
            "labels": [
                {
                    "key": "handoffmode_delivery",
                    "value": "Delivery"
                },
                {
                    "key": "handoffmode_dispatch",
                    "value": "Delivery"
                },
                {
                    "key": "handoffmode_pickup",
                    "value": "Pickup"
                },
                {
                    "key": "handoffmode_curbside",
                    "value": "Curbside"
                },
                {
                    "key": "handoffmode_drivethru",
                    "value": "Drive-thru"
                },
                {
                    "key": "handoffmode_dinein",
                    "value": "Dine In"
                },
                {
                    "key": "manual_fire_label",
                    "value": "Check-in"
                },
                {
                    "key": "thanks_curbsidepickup_instructions",
                    "value": "Go Straight to Order Pickup At the Counter & Tell a Crew Member You Ordered Online."
                },
                {
                    "key": "thanks_counterpickup_instructions",
                    "value": "Go Straight to Order Pickup At the Counter & Tell a Crew Member You Ordered Online."
                },
                {
                    "key": "thanks_delivery_instructions",
                    "value": "Thanks for your order!"
                },
                {
                    "key": "thanks_dispatch_instructions",
                    "value": "Thanks for your order!"
                },
                {
                    "key": "thanks_drivethru_instructions",
                    "value": "Provide your name or order number to the attendant at drive-thru when you arrive."
                },
                {
                    "key": "thanks_dinein_instructions",
                    "value": "Thanks for your order!"
                },
                {
                    "key": "thanks_pickupinstructions",
                    "value": "Go Straight to Order Pickup At the Counter & Tell a Crew Member You Ordered Online."
                }
            ],
            "latitude": 40.7052022,
            "longitude": -73.0131655,
            "maximumpayinstoreorder": 0.0000,
            "metadata": null,
            "minimumdeliveryorder": 0.0000,
            "minimumpickuporder": 0.0000,
            "mobileurl": "https://rubios.olosandbox.com/menu/rubios-sandbox-demo-lab-1/",
            "name": "Rubio's Sandbox Demo Lab 1",
            "productrecipientnamelabel": "Name:",
            "requiresphonenumber": true,
            "showcalories": true,
            "slug": "rubios-sandbox-demo-lab-1",
            "specialinstructionsmaxlength": 10,
            "state": "NY",
            "storename": "Rubio's",
            "streetaddress": "26 Broadway",
            "suggestedtippercentage": 20,
            "supportedarrivalmessagehandoffmodes": [],
            "supportedcardtypes": "American Express/Discover/MasterCard/Visa",
            "supportedcountries": [
                "US"
            ],
            "supportedtimemodes": [
                "advance",
                "asap"
            ],
            "supportsbaskettransfers": true,
            "supportscoupons": true,
            "supportscurbside": true,
            "supportsdinein": true,
            "supportsdispatch": true,
            "supportsdrivethru": false,
            "supportsfeedback": true,
            "supportsgrouporders": true,
            "supportsguestordering": true,
            "supportsloyalty": true,
            "supportsmanualfire": false,
            "supportsnationalmenu": false,
            "supportsonlineordering": true,
            "supportsproductrecipientnames": true,
            "supportsspecialinstructions": false,
            "supportssplitpayments": true,
            "supportstip": true,
            "telephone": "(505) 555-5555",
            "url": "https://rubios.olosandbox.com/menu/rubios-sandbox-demo-lab-1/",
            "utcoffset": -5,
            "zip": "07746"
        },
        {
            "acceptsordersbeforeopening": false,
            "acceptsordersuntilclosing": true,
            "advanceonly": false,
            "advanceorderdays": 14,
            "allowhandoffchoiceatmanualfire": false,
            "attributes": [],
            "availabilitymessage": null,
            "brand": "rubios",
            "calendars": null,
            "candeliver": true,
            "canpickup": true,
            "city": "New York",
            "contextualpricing": null,
            "country": "US",
            "crossstreet": "",
            "customerfacingmessage": "",
            "customfields": [
                {
                    "id": 139541,
                    "label": "Make",
                    "qualificationcriteria": "CurbsidePickupOrdersOnly",
                    "required": true,
                    "validationregex": ""
                },
                {
                    "id": 139542,
                    "label": "Model",
                    "qualificationcriteria": "CurbsidePickupOrdersOnly",
                    "required": true,
                    "validationregex": ""
                },
                {
                    "id": 139543,
                    "label": "Color",
                    "qualificationcriteria": "CurbsidePickupOrdersOnly",
                    "required": true,
                    "validationregex": ""
                },
                {
                    "id": 147828,
                    "label": "Table Number",
                    "qualificationcriteria": "DineInOrdersOnly",
                    "required": true,
                    "validationregex": "^[0-9]+$"
                }
            ],
            "deliveryarea": "within 1 mile",
            "deliverydelayalertenabled": false,
            "deliverydelayalertmessage": null,
            "deliveryfee": 0,
            "deliveryfeetiers": [],
            "distance": 0.01,
            "extref": "email",
            "hasolopass": false,
            "id": 64327,
            "isavailable": true,
            "iscurrentlyopen": true,
            "labels": [
                {
                    "key": "handoffmode_delivery",
                    "value": "Delivery"
                },
                {
                    "key": "handoffmode_dispatch",
                    "value": "Delivery"
                },
                {
                    "key": "handoffmode_pickup",
                    "value": "Pickup"
                },
                {
                    "key": "handoffmode_curbside",
                    "value": "Curbside"
                },
                {
                    "key": "handoffmode_drivethru",
                    "value": "Drive-thru"
                },
                {
                    "key": "handoffmode_dinein",
                    "value": "Dine In"
                },
                {
                    "key": "manual_fire_label",
                    "value": "Check-in"
                },
                {
                    "key": "thanks_curbsidepickup_instructions",
                    "value": "Go Straight to Order Pickup At the Counter & Tell a Crew Member You Ordered Online."
                },
                {
                    "key": "thanks_counterpickup_instructions",
                    "value": "Go Straight to Order Pickup At the Counter & Tell a Crew Member You Ordered Online."
                },
                {
                    "key": "thanks_delivery_instructions",
                    "value": "Thanks for your order!"
                },
                {
                    "key": "thanks_dispatch_instructions",
                    "value": "Thanks for your order!"
                },
                {
                    "key": "thanks_drivethru_instructions",
                    "value": "Provide your name or order number to the attendant at drive-thru when you arrive."
                },
                {
                    "key": "thanks_dinein_instructions",
                    "value": "Thanks for your order!"
                },
                {
                    "key": "thanks_pickupinstructions",
                    "value": "Go Straight to Order Pickup At the Counter & Tell a Crew Member You Ordered Online."
                }
            ],
            "latitude": 41.7052022,
            "longitude": -74.0131655,
            "maximumpayinstoreorder": 0.0000,
            "metadata": null,
            "minimumdeliveryorder": 0.0000,
            "minimumpickuporder": 0.0000,
            "mobileurl": "https://rubios.olosandbox.com/menu/rubios-sandbox-email-vendor/",
            "name": "Rubio's Sandbox email vendor",
            "productrecipientnamelabel": "Name:",
            "requiresphonenumber": true,
            "showcalories": true,
            "slug": "rubios-sandbox-email-vendor",
            "specialinstructionsmaxlength": 10,
            "state": "NY",
            "storename": "Rubio's",
            "streetaddress": "26 Broadway",
            "suggestedtippercentage": 20,
            "supportedarrivalmessagehandoffmodes": [],
            "supportedcardtypes": "American Express/Discover/MasterCard/Visa",
            "supportedcountries": [
                "US"
            ],
            "supportedtimemodes": [
                "advance",
                "asap"
            ],
            "supportsbaskettransfers": true,
            "supportscoupons": true,
            "supportscurbside": true,
            "supportsdinein": true,
            "supportsdispatch": false,
            "supportsdrivethru": false,
            "supportsfeedback": true,
            "supportsgrouporders": true,
            "supportsguestordering": true,
            "supportsloyalty": true,
            "supportsmanualfire": false,
            "supportsnationalmenu": false,
            "supportsonlineordering": true,
            "supportsproductrecipientnames": true,
            "supportsspecialinstructions": false,
            "supportssplitpayments": true,
            "supportstip": true,
            "telephone": "(555) 555-5555",
            "url": "https://rubios.olosandbox.com/menu/rubios-sandbox-email-vendor/",
            "utcoffset": -5,
            "zip": "10004"
        },
        {
            "acceptsordersbeforeopening": false,
            "acceptsordersuntilclosing": true,
            "advanceonly": false,
            "advanceorderdays": 14,
            "allowhandoffchoiceatmanualfire": false,
            "attributes": [],
            "availabilitymessage": null,
            "brand": "rubios",
            "calendars": null,
            "candeliver": true,
            "canpickup": true,
            "city": "New York",
            "contextualpricing": null,
            "country": "US",
            "crossstreet": "",
            "customerfacingmessage": "",
            "customfields": [
                {
                    "id": 147829,
                    "label": "Table Number",
                    "qualificationcriteria": "DineInOrdersOnly",
                    "required": true,
                    "validationregex": "^[0-9]+$"
                },
                {
                    "id": 141566,
                    "label": "Make",
                    "qualificationcriteria": "CurbsidePickupOrdersOnly",
                    "required": true,
                    "validationregex": ""
                },
                {
                    "id": 141567,
                    "label": "Model",
                    "qualificationcriteria": "CurbsidePickupOrdersOnly",
                    "required": true,
                    "validationregex": ""
                },
                {
                    "id": 141568,
                    "label": "Color",
                    "qualificationcriteria": "CurbsidePickupOrdersOnly",
                    "required": true,
                    "validationregex": ""
                }
            ],
            "deliveryarea": "1 mile",
            "deliverydelayalertenabled": false,
            "deliverydelayalertmessage": null,
            "deliveryfee": 1.00,
            "deliveryfeetiers": [
                {
                    "amount": 1.00,
                    "feetype": "FixedFee",
                    "subtotalminimum": 0.00
                }
            ],
            "distance": 0.01,
            "extref": "122",
            "hasolopass": false,
            "id": 60855,
            "isavailable": false,
            "iscurrentlyopen": true,
            "labels": [
                {
                    "key": "handoffmode_delivery",
                    "value": "Delivery"
                },
                {
                    "key": "handoffmode_dispatch",
                    "value": "Delivery"
                },
                {
                    "key": "handoffmode_pickup",
                    "value": "Pickup"
                },
                {
                    "key": "handoffmode_curbside",
                    "value": "Curbside"
                },
                {
                    "key": "handoffmode_drivethru",
                    "value": "Drive-thru"
                },
                {
                    "key": "handoffmode_dinein",
                    "value": "Dine In"
                },
                {
                    "key": "manual_fire_label",
                    "value": "Check-in"
                },
                {
                    "key": "thanks_curbsidepickup_instructions",
                    "value": "Go Straight to Order Pickup At the Counter & Tell a Crew Member You Ordered Online."
                },
                {
                    "key": "thanks_counterpickup_instructions",
                    "value": "Go Straight to Order Pickup At the Counter & Tell a Crew Member You Ordered Online."
                },
                {
                    "key": "thanks_delivery_instructions",
                    "value": "Thanks for your order!"
                },
                {
                    "key": "thanks_dispatch_instructions",
                    "value": "Thanks for your order!"
                },
                {
                    "key": "thanks_drivethru_instructions",
                    "value": "Provide your name or order number to the attendant at drive-thru when you arrive."
                },
                {
                    "key": "thanks_dinein_instructions",
                    "value": "Thanks for your order!"
                },
                {
                    "key": "thanks_pickupinstructions",
                    "value": "Go Straight to Order Pickup At the Counter & Tell a Crew Member You Ordered Online."
                }
            ],
            "latitude": 42.7052022,
            "longitude": -75.0131655,
            "maximumpayinstoreorder": 0.0000,
            "metadata": null,
            "minimumdeliveryorder": 1.0000,
            "minimumpickuporder": 0.0000,
            "mobileurl": "https://rubios.olosandbox.com/menu/rubios-sandbox-demo-lab-2/",
            "name": "Rubios Sandbox Demo Lab 2",
            "productrecipientnamelabel": "Name:",
            "requiresphonenumber": true,
            "showcalories": true,
            "slug": "rubios-sandbox-demo-lab-2",
            "specialinstructionsmaxlength": 10,
            "state": "NY",
            "storename": "Rubio's",
            "streetaddress": "26 Broadway",
            "suggestedtippercentage": 0,
            "supportedarrivalmessagehandoffmodes": [],
            "supportedcardtypes": "American Express/Discover/MasterCard/Visa",
            "supportedcountries": [
                "US"
            ],
            "supportedtimemodes": [
                "advance",
                "asap"
            ],
            "supportsbaskettransfers": true,
            "supportscoupons": true,
            "supportscurbside": true,
            "supportsdinein": true,
            "supportsdispatch": false,
            "supportsdrivethru": false,
            "supportsfeedback": true,
            "supportsgrouporders": true,
            "supportsguestordering": true,
            "supportsloyalty": true,
            "supportsmanualfire": false,
            "supportsnationalmenu": false,
            "supportsonlineordering": true,
            "supportsproductrecipientnames": true,
            "supportsspecialinstructions": false,
            "supportssplitpayments": true,
            "supportstip": false,
            "telephone": "(555) 555-5555",
            "url": "https://rubios.olosandbox.com/menu/rubios-sandbox-demo-lab-2/",
            "utcoffset": -5,
            "zip": "10004"
        }
    ]
}
React.useEffect(() => {
  let lat, long;
    navigator.geolocation.getCurrentPosition(function(position) {
     // console.log("Latitude is :", position.coords.latitude);
      lat = position.coords.latitude;
      long = position.coords.longitude;  
    
    //   const headers ={'Authorization': "OloKey ElwEkgDhuasD9HydkYI2kp3Hs0EWPkR2"}
    //   axios.get(`https://ordering.api.olosandbox.com/v1.1//restaurants/near?lat=40.7054008&long=-74.0132198&radius=15&limit=10`,{headers} )
    //       .then(res => {
    //         debugger
    //         console.log(res)
    //         const responseData = res.data;
    //         //this.setState({ 
    //           responseData.restaurants.map((item :any, i: any) =>{
    //             //debugger
    //           if(mapCenter ==undefined){
    //             mapCenter = {
    //               lat: item.latitude,
    //               lng: item.longitude
    //             }
    //           }
    //             let latLong = {
    //               lat: item.latitude,
    //               lng: item.longitude
    //             }
    //             return(<Marker position={latLong}/>)
    //           })
    //       })      
      }); 
  }, []);
  
  let markers = centers.map((item, i) => {
    return (
      <Marker
      position={centers[i]}
    />
    );
  });
  let mapCenter: any;
let newMarker = response.restaurants.map((item, i) =>{
  //debugger
 if(mapCenter ==undefined){
  mapCenter = {
    lat: item.latitude,
    lng: item.longitude
  }
 }
  let latLong = {
    lat: item.latitude,
    lng: item.longitude
  }
  return(<Marker position={latLong}/>)
})
  return (
    <LoadScript googleMapsApiKey="AIzaSyCWKuRHEkeFWOy0JDMBT7Z4YApPVkZYHFI">
     
      <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={7}>
        {newMarker}
        <LocationCard  respondData ={response}/>
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </LoadScript>
    
  );
};

const responseData = async (): Promise<any> => {
  
  // const url = ``;
  // return axios.get(url, {});
};

export default Location;
