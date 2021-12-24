# Introduction

**Overview**

Olo exposes online ordering functionality through a REST API which third party developers can use to create applications on top of the Olo platform and restaurant network.

**Confidentiality**

The contents of this document are confidential and under NDA. The information herein may only be used by the intended audience and for the purposes of integration with Olo.

# Usage Basics

## Environments

The production environment endpoint is:  
https://ordering.api.olo.com/v1.1/  

All development and testing must be carried out against the Olo sandbox environment:  
https://ordering.api.olosandbox.com/v1.1/

All communication must be encrypted over TLS 1.2

The Sandbox environment runs the same code as production, but with test data which may not include newer brands.

Restaurant telephone numbers and other contact details have been sanitized on Sandbox to avoid any chance of phone calls or emails to real people or restaurants. It is normal for these to all appear the same.

## Request Structures

**https://\<environment_domain\>/\<API_version\>/\<resource\>?[params]**

* Every API call, whether from a [server](#section/Authentication/Server-Authorization-(Server-to-Server)) or a [client](#section/Authentication/Client-Authorization-(Client-to-Server)), is generally authorized in the header of each request. This authorization is provided either directly by a Platform API Key or by information associated with an API key (ClientId and ClientSecret).
* The HTTP **Accept** header must be set to the preferred response format of either application/json or application/xml.
* For `POST` or `PUT` operations where there is content in the HTTP body, the Content-Type header should be set to either **application/json** if using json-encoded values, or application/x-www-form-urlencoded if using form-encoded parameters.
* It is recommended that you use application/json for both the Accept and Content-Type headers, because XML and form-encoding will be deprecated in the next version of the API.
* JSON encoded requests must use double (not single) quotes for property names.
* HTTP Status Codes will be returned as follows:
    * **200 OK** - The requested operation completed successfully!
    * **400 Bad Request** - An Olo error occurred. Please reference the response body's "num" value in the Olo [Error Numbers](#section/Usage-Basics/Olo-Error-Numbers) documentation.
    * **403 Forbidden** - Invalid [API credentials](#section/Authentication) or insufficient access to operation
    * **500 Server Error** - An unexpected error occurred. Please verify that your request is correctly formatted. If it persists reach out to Olo [Developer Support](#section/Contact-Us).

**Request Rate Limit**

All integrations to Olo's Ordering API are subject to request rate limits. This is intended to protect the stability of our system and ensure smooth operations for all of our partners.

Please ensure your integration avoids creating multiple baskets unnecessarily, excessive basket validations, and minimizes the number of Ordering API requests needed to place orders. We monitor the request rate of all our integrations both during and after the Production certification process.

## Creating a Platform API Key

As explained above, all API requests are authorized either directly by an API key or by information associated with an API key (ClientId and ClientSecret). API keys and, where applicable, their associated ClientIds and Client Secrets are created in the Olo Developer Portal by a [Developer Support](#section/Contact-Us) agent.

Possible Client Platform values are as follows:
* Web - Desktop Web application
* MobileWeb - Mobile Web application
* CallCenter - Call Center application
* Android - Android mobile application
* iOS - iOS mobile application
* SMS - Short Message Service application
* ThirdParty - Server-to-server application
* Kiosk - Kiosk application

Each API key has access to a limited set of data and functions that are defined by Olo per the needs of the project. Where used, API keys (along with ClientIds and ClientSecrets) must be kept in a safe place and should be defined in only one place in your code in case it needs to change. **You should only use API Keys designated for a specific Client Platform (Android, iOS, Web, ThirdParty, etc) with that Client Platform to maintain platform integrity. The Olo Platform will track activity based on the type of Client Platform and this specificity is incredibly useful when researching support requests.** If you are creating a cross platform app (e.g. Web and MobileWeb), you should request an API key for each platform and use the proper API key in each context. There is currently no limit to the number of API keys a project can have.

If the project is set up for [Server Authorization](#section/Authentication/Server-Authorization-(Server-to-Server)), the ClientID and ClientSecret will also be generated alongside the new key.

## Olo Error Numbers

An HTTP 400 Bad Request will always be accompanied by an object containing two properties: **num** (see numbers below) and **message**.

### Technical Errors (1-199)

| Num | Meaning | Suggested Action |
|---|---|---|
| 1 | *Misunderstood Request:* Invalid method signature, missing fields, wrong types, etc. | Most likely a bug or integration error. Notify Olo [Developer Support](#section/Contact-Us). |
| 2 |	*No Longer Available:* Resource has been deleted, updated, or was temporary in nature. | If resource is based on a cache, the cache should be refreshed. |
| 3 | *Insufficient Access:* API credentials do not have access to the resource being requested. This can occur if the API partner does not have access to the requested restaurant or if the request is sent with a different user than the one associated with a basket/order. | Verify that the correct Olo restaurant/vendor id is being referenced. Verify that the user you are referencing is the same user that is already attached to the basket/order. If you believe that these are both correct and are still receiving this error, please contact Olo Developer Support. |
| 4 | *Velocity Threshold Exceeded:* Too many users created or cards authorized from a single IP address (from a mobile application) in a short time period. Error is enforced as protection against possible brute-force hacking attempts. | Should never happen in ordinary use. User can wait a while and try again. If API key has been compromised, a new one may need to be issued. |
| 5 | *Brand Error:* Attempted a brand-specific operation with a multi-brand API key. | If brand-specific operations are needed, please reach out to Olo [Developer Support](#section/Contact-Us) for a brand-specific key. |
| 6 | *Invalid Operation for API Key:* API credentials do not have permission for this feature. API integration partners are restricted only to the API features they require. | Contact Olo [Developer Support](#section/Contact-Us) about enabling the feature if necessary. |
| 7 | *Invalid IP Address:* IP address not safelisted and Authorization & Date headers not sent. (Affects only projects requiring [Server Authorization](#section/Authentication/Server-Authorization-(Server-to-Server)).) | We recommend sending Authorization & Date headers. Read: [Server Authorization](#section/Authentication/Server-Authorization-(Server-to-Server)). |
| 8 | *Invalid Operation for Vendor:* The operation is not valid on this particular vendor. | The vendor's configuration does not support this operation. Check the restaurant object to determine operation viability. Reach out to your Olo Customer Relations Manager regarding adjusting a vendor's configuration. |
| 9 | *Invalid Operation:* The operation is not currently valid. | An operation was requested that cannot be fulfilled. Vendor may not support operation. Check flow. Reach out to your Olo Customer Relations Manager regarding adjusting a vendor's configuration. |
| 10 | *Olo Internal Error:* General catch-all for a number of possible underlying errors. | Please reach out to Olo [Developer Support](#section/Contact-Us) for more detail. |
| 11 | *Not Supported by Brand:*The brand does not support the operation requested. | If a change in configuration is needed, please reach out to your Olo Customer Success representative. |
| 12 | *Legacy Endpoint:* An old endpoint that is not to be used by new projects. | If you have any questions, please reach out to Olo [Developer Support](#section/Contact-Us). |
| 101 | *Invalid Authtoken:* User may not exist in current scope. |  Ask the customer to re-login to receive a new authtoken. |

    
### Customer-Friendly Errors (200-299)

> The numbers between 201 and 299 are 'specialized' and may be used to process specific error cases programmatically. Our "Suggested Action" for each error can be found in the column of the same name below. Numbers in this range may continue to expand over time.

| Num | Meaning | Suggested Action |
|---|---|---|
| 200 | *Message for User:* A generic customer-friendly error that we weren't able to categorize more granularly. | The message should contain an instruction to the user on what went wrong and how to proceed. |
| 201 | *Invalid Coupon:* The coupon supplied in the request cannot be applied to the basket. | The message should contain an instruction to the user on what went wrong and how to proceed. |
| 203 | *Auth Declined:* The payment for the order was declined. | Prompt the user to supply a different payment method for the order. |
| 204 | *Invalid AVS:* The payment for the order was declined due to address verification. | Prompt the user to supply the correct billing address for the payment method. |
| 205 | *Invalid CVV:* The payment for the order was declined due to an invalid CVV code. | Prompt the user to supply the correct CVV code for the payment method. |
| 206 | *Invalid Advance Time:* The order cannot be prepared before the supplied wanted time. | Update the wanted time for the basket to be later in the day to allow for adequate preparation time in the restaurant. The "earliestreadytime" and "leadtimeestimateminutes" properties on a basket can provide a good indication of how long the order will take to prepare. |
| 207 | *Unsupported Version:* The current version of the client application is no longer supported. | Update the client application to a supported version, or prompt the user to update in the case of a mobile app. |
| 208 | *Invalid Reward:* The reward supplied in the request cannot be applied to the basket. | The message should contain an instruction to the user on what went wrong and how to proceed. |
| 209 | *Already Submitted:* The current basket has already been submitted as a successful order. | Refer to the order created by the original basket submission for the latest order status. |
| 210 | *Capacity Throttled:* The restaurant no longer has the capacity to prepare the order for the desired wanted time. | Update the wanted time for the basket to a different timeslot where the restaurant still has capacity. |
| 211 | *Menu Item Eighty-Sixed:* A menu item in this request is currently unavailable at the restaurant. | Remove the unavailable items from the basket and retry the order. The error message will give a customer-friendly message describing which item was unavailable. |
| 212 | *Menu Item Out-of-Hours:* A menu item in this request is not available at the desired wanted time for this order. | Update the wanted time to a different time, or remove the unavailable items from the basket, and retry the order. The error message will give a customer-friendly message describing which item was unavailable. |
| 213 | *Transmission Failure:* There was an error transmitting the order to the restaurant that could not be categorized more specifically. | While this can sometimes be a transient issue at the restaurant, more often this suggests an underlying problem in need of investigation. Resubmission is encouraged but if failure response is consistent, consider moving this restaurant to an unavailable state until the root cause can be identified and notify Olo [Developer Support](#section/Contact-Us). |
| 215 | *Insufficient Payment Balance:* The payment method supplied didn't have a sufficient balance to fulfill the order. | Prompt the user to supply a different payment method for the order. |
| 216 | *Loyalty Redemption Declined:* The reward supplied in the request could not be redeemed. | The message should contain an instruction to the user on what went wrong and how to proceed. |
| 217 | *Restaurant Unreachable:* The restaurant cannot be reached due to the POS being offline or otherwise unavailable. | This can often be a short-lived transient issue at the restaurant, so we encourage trying to submit the order again if this is encountered. If failure response is consistent, consider moving this restaurant to an unavailable state until the root cause can be identified. If the problem persists, please notify the brand. |
| 218 | *Restaurant Out-of-Hours:* The restaurant is not open for ordering at the basket's desired wanted time. | Update the basket's wanted time to be within the restaurant's open hours. |
| 219 | *Restaurant Temporarily Unavailable:* The restaurant has been manually disabled by an administrator from the brand or by the Olo system due to repeated error responses. | The error message that comes back should give some detail on how to proceed. Typically the user will either need to call in their order or select a different restaurant. Further investigation would be required to determine why the restaurant has been disabled. We recommend reaching out to the brand for initial clarification. Please make sure to reference the basket "vendoronline" or restaurant "isavailable" fields as they can help to inform when a restaurant has been disabled. |
| 220 | *Invalid POS Configuration:* The restaurant's POS refused the basket due to an invalid configuration. | Inform the user that the restaurant is unavailable at this time. The user will either need to call in their order or select a different restaurant. A POS configuration update would need to be made (likely by the brand) to resolve this error. Consider putting this restaurant into an unavailable state until the issue has been resolved. |
| 221 | *Invalid POS Coupon Configuration:* The restaurant's POS refused the basket due to an invalid coupon configuration. | Prompt the user to remove the coupon and try again. Further investigation (initially by the brand) would be required to determine why the applied coupon was not usable. |
| 222 | *Invalid Menu Setup/Mapping:* The restaurant's POS refused the basket because one or more of the products or options were not set up or mapped correctly. | If the problematic product or option is returned in the response message, prompt the user to remove it from their basket and try again. Otherwise, please reach out to the brand and notify them that there is a setup or mapping issue with one or more of the products or options within the basket. |
| 223 | *POS Contention:* The restaurant's POS refused the basket because of contention at the site, which usually indicates that the system is busy. | Wait a few seconds and try again. If it fails after a few automatic retries, ask the user to try again in a few minutes. If the issue persists, please inform the brand. |
| 224 | *Menu Item Not Offered:*The restaurant does not offer one or more of the items in the fave or transferred basket. | Inform the user that the fave or basket cannot be ordered at the desired restaurant. |
| 225 | *POS Response Timeout:* The restaurant's POS did not respond to Olo in time. | Wait a few seconds and try again. If it fails after a few automatic retries, ask the user to try again in a few minutes. If the issue persists, please inform the brand. |
| 226 | *Loyalty Account Not Found:* No loyalty accounts matching the user's email address were found. | Inform the user that the loyalty account does not exist. |
| 227 | *Requires Password Reset:* The user's password needs to be reset. | Inform the user that they will need to reset their password via the integration's forgot password flow. |

> The "code" property is deprecated and should be ignored. It has been left in to be backward-compatible with existing clients and will be removed in a future version.

## Users vs Guests

### Olo Users

An Olo "User" represents a full end-user account created on Olo's platform. Users can be created with an Olo password or can be authenticated against a Single Sign-On provider such as Facebook, Google, or LevelUp. The advantages of an Olo user:

* Credit cards (and other billing accounts) can be stored on file against the user.
* Access to the customer's favorite orders and recent order history.
* Much of the security around authentication and passwords can be offloaded.
* The end-user can use the same credentials to log into any of Olo online ordering websites or mobile websites.

After creating or authenticating an Olo User through the API, a unique **authentication token** will be returned which can be used to refer to that user from that moment on without the need to store their password.

### Olo Guests

An Olo "Guest" is suitable when an integration partner has existing infrastructure in place for authentication, handling recent orders and favorites (if required) and storage of billing details. A Guest order is one where the customer's name, contact details and billing information is submitted along with each order, and no reusable user account is created.

## Ad hoc vs Vendor Exports (Restaurant and Menu Data)

Restaurant and menu data is available both ad hoc (querying only the items needed as they're needed) and as an export (Vendor Export) which is updated after each menu change. If you intend to store restaurant and menu data, you need to use the [Vendor Export endpoint](#operation/DownloadRestaurantMenuData) rather than calling the restaurant/menu API endpoints. Please reach out to your Olo Customer Success representative to get started with Vendor Export access.

### Ad Hoc Queries

Olo's API negates the need for an integration partner to replicate the complicated menu structures and storage. Olo's production API is highly optimized for short round-trip times and high availability, and so this is the ideal for the majority of applications, especially mobile applications. Restaurant and menu data is retrieved as-needed and can be cached for short durations. *If in doubt, use the ad hoc API endpoints, as it is significantly less integration work.*

### Vendor Exports (Restaurant and Menu Data)

Integration Partners with existing online ordering backends that have the ability to store and display menus may wish to load Olo data into their database alongside other systems' data. Olo provides [Vendor Export](#operation/DownloadRestaurantMenuData) XML files containing restaurant and menu data for every participating restaurant. These files are available through the API and can be retrieved on a per restaurant basis.

## Versioning and Compatibility

Please treat all IDs in the API as type int64 (long). As these IDs continue to grow in size, more will cross over into int64 territory.

We will not remove properties from the current API version, but we do add new properties to return objects from time to time.

There is no guaranteed ordering of properties. We request that properties are accessed by name and not by index.

Please do not rely on error messages for logic. Error text may change periodically. Rather rely on error numbers, which are guaranteed to not change.

## Planned Obsolescence

If you wish to force end-users to upgrade to the latest version of your application, you can notify Olo at any time to set a "minimum client version" for your API key. Any calls with an older version specified in the User Agent will be rejected with error code 207 and the message *"This version of the application is no longer supported. Please upgrade to the latest version."*

## Code Examples

Below is a C# example of using the Olo API. The code is intended to be educational and is not production-ready:

```
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Olo.Api.Example
{
    public class Program
    {
        public static void Main()
        {
            var client = new OloApiExamples("https://ordering.api.olosandbox.com/v1.1/", "{your api key here}");
            client.CreateSimpleGuestOrder();
            var basketId = client.CreateAUserAndCustomizeAProduct();
            client.CreateAndOrderAFavorite(basketId);
        }
    }

    public class OloApiExamples
    {
        private readonly OloApiSampleClient _client;

        public OloApiExamples(string baseApiUrl, string apiKey)
        {
            _client = new OloApiSampleClient(baseApiUrl, apiKey);
        }

        public void CreateSimpleGuestOrder()
        {
            // get a list of restaurants
            var restaurants = _client.Get("restaurants");
            var vendorid = restaurants.restaurants[0].id;

            // get a restaurant's menu
            var menuResponse = _client.Get("restaurants/" + vendorid + "/menu");
            var categories = menuResponse.categories;
            var firstProduct = categories[0].products[0];

            // create a basket
            var basket = _client.Post("baskets/create", new { vendorid });
            var basketId = basket.id;

            // add a product
            _client.Post("baskets/" + basketId + "/products", new { productid = firstProduct.id, quantity = 1 });

            // submit basket; get an order
            var orderStatus = _client.Post("baskets/" + basketId + "/submit",
                new
                {
                    billingmethod = "cash",
                    usertype = "guest",
                    firstname = "Joe",
                    lastname = "Test",
                    emailaddress = "joe_test+123@test.com"
                });
        }

        public string CreateAUserAndCustomizeAProduct()
        {
            // create a user; get an authtoken
            var newuser = new { firstname = "Joe", lastname = "Test", emailaddress = "test+12345@test.com", password = "letmein!" };
            var user = _client.Post("users/create", newuser);
            var authtoken = user.authtoken;

            // OR log-in as an existing user
            //var user = _client.Post("users/authenticate", new { login = "test+12345@test.com", password = "letmein!" });
            //var authtoken = user.token;

            // get a list of restaurants
            var restaurants = _client.Get("restaurants");
            var vendorid = restaurants.restaurants[0].id;

            // get a restaurant's menu
            var menuResponse = _client.Get("restaurants/" + vendorid + "/menu");
            var categories = menuResponse.categories;
            var firstProduct = categories[0].products[0];

            // get product's options
            var modifiers = _client.Get("products/" + firstProduct.id + "/options");
            var firstChoiceId = modifiers.optiongroups[0].options[0].id;

            // create a basket for the user
            var basket = _client.Post("baskets/create", new { vendorid, authtoken });
            var basketId = basket.id;

            // add a product
            _client.Post("baskets/" + basketId + "/products",
                new
                {
                    productid = firstProduct.id,
                    quantity = 1,
                    choicecustomfields = new[] { new { choiceid = firstChoiceId, quantity = 1 } }
                });

            // submit basket; get an order
            var orderStatus = _client.Post("baskets/" + basketId + "/submit",
                new
                {
                    billingmethod = "cash",
                    usertype = "user",
                    authtoken
                });
            return basketId;
        }

        public void CreateAndOrderAFavorite(string previousOrderBasketId)
        {
            // log-in as an existing user
            var user = _client.Post("users/authenticate", new { login = "test+12345@test.com", password = "letmein!" });
            var authtoken = user.token;

            // create a fav from a previous order
            var favs = _client.Post("users/" + authtoken + "/faves", new { basketid = previousOrderBasketId, description = "my fav lunch" });
            var faveid = favs.faves[0].id;

            // OR get an existing fav
            //var favs = _client.Get("users/" + authtoken + "/faves");
            //var faveid = favs.faves[0].id;

            // create basket from fav
            var basket = _client.Post("baskets/createfromfave", new { faveid }, new Dictionary<string, string> { { "authtoken", authtoken.ToString() } });
            var basketId = basket.id;

            // submit basket; get an order
            var orderStatus = _client.Post("baskets/" + basketId + "/submit",
                new
                {
                    billingmethod = "cash",
                    usertype = "user",
                    authtoken
                });
        }
    }

    public class OloApiSampleClient
    {
        private readonly HttpClient _client;

        public OloApiSampleClient(string baseApiUrl, string apiKey)
        {
            _client = new HttpClient(new LoggingHandler(new HttpClientHandler()))
            {
                BaseAddress = new Uri(baseApiUrl)
            };
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("OloKey", apiKey);
        }

        public dynamic Get(string path, IDictionary<string, string> parameters = null)
        {
            var finalUrl = GetFinalUrl(path, parameters);
            var response = _client.GetAsync(finalUrl).Result;
            var responseContent = response.Content.ReadAsStringAsync().Result;
            ValidateResponse(response, responseContent);
            return JsonConvert.DeserializeObject(responseContent);
        }

        public dynamic Post(string path, object data, IDictionary<string, string> parameters = null)
        {
            var finalUrl = GetFinalUrl(path, parameters);
            var dataJson = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
            var response = _client.PostAsync(finalUrl, dataJson).Result;
            var responseContent = response.Content.ReadAsStringAsync().Result;
            ValidateResponse(response, responseContent);
            return JsonConvert.DeserializeObject(responseContent);
        }

        private string GetFinalUrl(string path, IDictionary<string, string> parameters)
        {
            var finalUrl = path;
            if (parameters != null)
            {
                foreach (var p in parameters)
                    finalUrl += "&" + p.Key + "=" + p.Value;
            }
            return finalUrl;
        }

        private static void ValidateResponse(HttpResponseMessage response, string responseContent)
        {
            if (!response.IsSuccessStatusCode)
            {
                Error error = null;
                if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                    error = JsonConvert.DeserializeObject<Error>(responseContent);
                throw new HttpRequestException(
                    string.Format(@"Error with {0} {1} http status code: {2}\nOlo Error Code: {3}\nOlo Message: {4}",
                        response.RequestMessage.Method,
                        response.RequestMessage.RequestUri,
                        response.StatusCode,
                        error == null ? null : error.Num.ToString(),
                        error == null ? null : error.Message));
            }
        }

        public class Error
        {
            public int Num { get; set; }

            public string Message { get; set; }
        }
    }

    public class LoggingHandler : DelegatingHandler
    {
        public LoggingHandler(HttpMessageHandler innerHandler)
            : base(innerHandler)
        {
        }

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            Console.WriteLine("Request:");
            Console.WriteLine(request.ToString());
            if (request.Content != null)
                Console.WriteLine(await request.Content.ReadAsStringAsync());
            Console.WriteLine();

            var response = await base.SendAsync(request, cancellationToken);

            Console.WriteLine("Response:");
            Console.WriteLine(response.ToString());
            if (response.Content != null)
                Console.WriteLine(await response.Content.ReadAsStringAsync());
            Console.WriteLine();

            return response;
        }
    }
}
```

## Exploring the API

Prior to jumping in and writing some code against our API, you may want to more quickly learn how it works with a little trial and error. For this we recommend utilizing a free REST client/app to be able to make test calls to our API without having to rely on custom code, something like [Postman](https://www.postman.com). 

A tool like Postman allows you to quickly provide an endpoint URL, with associated headers and optional request body, then send the request with the click of a button. The response is auto-formatted and immediately viewable within the app.

You can even save whole collections of common calls and set up environment variables that can be plugged into them. For example, once set up, you can just plug in your Olo API credentials, select that environment, then hit Send!

> If your API credentials are configured to require server authorization, be sure to check out our Postman [pre-request script](#section/Authentication/Server-Authorization-(Server-to-Server)) (scroll to the bottom of the section) to automatically generate the Olo signature from those credentials. Just paste the script into the "Pre-request Script" Postman tab, either for individual API calls or an entire collection of calls, along with the proper headers and environment variables, and you should be good to go. 

If you're having any problems getting a tool like Postman working against our API, feel free to [Contact Us](#section/Contact-Us) for further assistance -- we're here to help!

# Security

## Basics

* Web browser client-side apps (e.g. using Javascript and/or JS frameworks) *must* have all API calls proxied through server-side code or they will encounter security errors.
* API keys must *never* be publicly exposed.
* Regarding PCI Compliance: Olo is not qualified to give PCI advice to a third party, so please work with a PCI Qualified Security Assessor to determine your needs.
* Passwords or credit card details stored on file against Olo Users may not also be stored on a mobile device or on the integration partner's servers. A device may however store the user authentication token which is returned during signup or authentication.
* Olo Users should have the option of disconnecting their account (thereby deleting the token off the server.)
* For calls made from mobile applications, Olo's servers use velocity checks on the number of credit card authorizations and user logins per IP address. This is turned off on Sandbox to avoid these limits being hit during testing, but it should be kept in mind that API calls from mobile devices must originate directly from the device (we call this [Client Authorization](#section/Authentication/Client-Authorization-(Client-to-Server))) or they'll look like brute force attacks from our system's point of view.
* For calls made from one or more central server(s), Olo's servers require the third party to meet the requirements for [Server Authorization](#section/Authentication/Server-Authorization-(Server-to-Server)). In addition, the end-user's IP address must be passed along in the **X-Forwarded-For** HTTP header.

## PCI Compliance

| PCI Requirement | Olo Responsibility| Customer Responsibility |
|---|---|---|
| Install and maintain a firewall configuration to protect cardholder data. | Limiting network access to and from devices used within the Olo online ordering platform to the most restrictive possible. | Firewalls of all other networks controlled by Olo client and other third parties chosen by the client. |
| Do not use vendor-supplied defaults for system passwords and other security parameters. | Adhering to CIS-derived system hardening policies for all devices and systems within the Olo online ordering platform. | Hardening of all other systems, including in-store systems and third parties in PCI scope. |
| Protect stored cardholder data. | Securely storing (or not storing) cardholder data within the Olo platform in line with PCI Requirement 3. | Protecting cardholder data stored in-store or with non-Olo providers. |
| Encrypt transmission of cardholder data across open, public networks. | Requiring secure transmission of cardholder data into the Olo platform, and sending data to payment gateways in the most secure manner supported. | Protecting cardholder data across all non-Olo networks falling within PCI scope, including the selected payment gateway. |
| Protect all systems against malware and regularly update anti-virus software or programs. | Regularly scanning Olo platform servers in PCI scope for malware and viruses with up-to-date anti-virus software. | Protecting in-store networks and all other third parties within PCI scope against malware. |
| Develop and maintain secure systems and applications. | Following secure development and change control procedures for all changes to Olo platform components, and ensuring that all Olo platform components have the latest vendor-supplied security patches installed. | Ensuring that all non-Olo platform systems and components follow secure development, change control and patching processes. |
| Restrict access to cardholder data by business need to know. | Restricting access to cardholder data to systems and parties authorized by client. | Restricting access to cardholder data transmitted or stored in-store and by all non-Olo systems. |
| Identify and authenticate access to system components. | Identifying and authenticating access to all Olo-controlled components in PCI scope. | Identifying and authenticating access to non-Olo components. |
| Restrict physical access to cardholder data. | Restricting physical access to Olo's platform to PCI level 1 hosting providers. | Restricting physical access to all non-Olo-controlled devices. |
| Track and monitor all access to network resources and cardholder data. | Logging and monitoring all activity occurring within the Olo platform. | Tracking and monitoring activity that occurs in-store and other non-Olo systems within scope. |
| Regularly test security systems and processes. | Testing the security systems and processes for the Olo platform. | Testing non-Olo security systems and processes within PCI scope. |
| Maintain a policy that addresses information security for all personnel. | Maintaining security policies for all Olo employees and contractors. | Maintaining security policies for non-Olo personnel. |

**Examples of Olo's Responsibilities:**

* Preventing credit card data from being intercepted in-transit between a customer submitting credit card data on Olo hosted front-ends and our platform servers.
* Preventing credit card data stored or transmitted within our platform from being stolen by unauthorized parties.
* Restricting access to sensitive data transmitted and stored by Olo's platform to only those with a business need.

This authorization method is only to be used for projects where all incoming API requests will originate *directly* from a mobile device with an Android/iOS app -- i.e. not proxied through a server -- each with its own unique IP address. This authorization method requires the use of an API key, which can be found within the 'API Keys' tab of your Developer Portal project.

**Examples of Customer Responsibilities:**

* Restricting traffic in and out of stores behind suitable firewall rules.
* Regularly updating operating systems and applications installed in-store.
* Security of third-party developers or agencies directed by customer to develop to an Olo API.
* Security of POS system(s), payment processor(s) and loyalty service provider(s).

**Examples of End-User Responsibilities:**

* Security of the device or browser being used to enter credit card data. For example, Olo is not responsible for malicious browser plugins or key loggers.
* Using a strong, secure password.

## Websites

### Server-to-Server Headers

Automated attacks, like credential stuffing and payment fraud, continue to increase in volume and evolve rapidly. To better protect our brands and customers, we require that web integrations using server authorization provide the following HTTP headers with every request sent to the Ordering API:

| <div style="width:125px">Header</div> | Description | Example |
|---|---|---|
| User-Agent | Unique user agent value that identifies your backend. Please send this formatted as *application_name/version*. | User-Agent: DonutEngine/v2 |
| X-Forwarded-For | End user's originating address, existing IPs and subsequent IPs. | X-Forwarded-For: 129.78.138.66, 129.78.64.103 |
| X-Forwarded-UAH | End user's user agent. | X-Forwarded-UAH: Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/12.0 |
| Referer | Identifies the page that the Ordering API request is being made on behalf of. | Referer: http://donuts.org/mainpage |
| X-Forwarded-HKY | If you are using the Olo provided JS, include a comma-delimited list of header keys, **in the order they are received**. Please **do not** provide the content of the headers. | X-Forwarded-HKY: Host,User-Agent,Accept,Accept-Language,Accept-Encoding,Connection,Cookie,Upgrade-Insecure-Requests,Pragma,Cache-Control,TE |

If you use the services below, forward on the applicable HTTP headers that represent the True IP:

| <div style="width:125px">Header</div> | Description | Example |
|---|---|---|
| Fastly-Client-IP | Fastly, explained <a href="https://developer.fastly.com/reference/http-headers/Fastly-Client-IP/" target="_blank">here</a>. We strongly recommend using VCL to prevent modification of the header. | Fastly-Client-IP: 129.78.138.66 |
| Incap-Client-IP | Imperva Cloud WAF, explained <a href="https://support.incapsula.com/hc/en-us/articles/200627650-Detection-and-Location-of-Real-Source-Client-IPs-in-Cloud-WAF-X-Forwarded-For-and-Incap-Client-IP-headers" target="_blank">here</a>. | Incap-Client-IP: 129.78.138.66 |
| X-Azure-ClientIP | Azure Front Door, explained <a href="https://docs.microsoft.com/en-us/azure/frontdoor/front-door-http-headers-protocol" target="_blank">here</a>. | X-Azure-ClientIP: 129.78.138.66 |
| X-Forwarded-CIP | Cloudflare connecting IP. This can be obatined from the cf-connecting-ip header and needs to be copied into a new header to prevent Cloudflare from dropping it on the edge. | X-Forwarded-CIP: 129.78.138.66 |

### Javascript Snippet

Olo has licensed an industry leading bot protection solution to detect and prevent automated attacks against the Ordering API, such as credential stuffing and fraud. Adding the Olo provided JavaScript below is optional but may be required if our security team detects that your integration is sending a significant amount of API traffic identified as a security risk.

Limitations and caveats:

* The Olo provided JavaScript bot protection can only protect web pages that result in server side requests to the Ordering API.
* Partners are still responsible for meeting and complying with Olo's [API Terms of Use](https://www.olo.com/api-usage-terms) for defense in depth. This includes WAF, rate limiting, DDoS and other controls.
* Olo may change the bot protection solution.

To implement the Olo provided JavaScript with your ordering website:

1. Add the Olo provided JavaScript snippet to web pages that make server side requests to the Ordering API.
2. Include the cookies generated by the Olo provided JavaScript (\_pxff\_\*,\_pxvid,\_pxhd,\_pxde) with your requests to the Ordering API. Alternatively, you can send these fields in the `x-px-cookie` request header.
3. Include the headers you received in a new `X-Forwarded-HKY` header on your requests to the Ordering API. Headers should be comma separated within the new custom header as seen in the table above.
4. If needed, modify your API code to gracefully handle an HTTP 403 response from the Ordering API.

HTTP 403 responses would only be returned if Olo determines that the original requestor is obviously automated. This would only occur for high risk Ordering API calls like those related to user logins and gift cards.

We recommend that the Olo provided JavaScript snippet is the first script after `<head>`. If this is not possible, it should be inserted as high up in the HTML as possible. It can be deployed through Google Tag Manager or through other Tag Management Systems. Different snippets are provided for the Olo Production and Non-Production environments. 

> The Olo provided JavaScript snippet makes 3rd party calls. Since some browsers and browser plugins block 3rd party calls, the additional HTTP request headers will ensure that Olo still has visibility into the request origin and can still provide some protection for the brand and customer.

**JavaScript snippet to include for Olo Non-Production environments**

```
<script type="text/javascript">
    (function(){
        window._pxAppId = 'PXAOit9CN0';
        // Custom parameters
        // window._pxParam1 = "<param1>";
        var p = document.getElementsByTagName('script')[0],
            s = document.createElement('script');
        s.async = 1;
        s.src = '//client.px-cloud.net/PXAOit9CN0/main.min.js';
        p.parentNode.insertBefore(s,p);
    }());
</script>
```

**JavaScript snippet to include for the Olo Production environment**

```
<script type="text/javascript">
    (function(){
        window._pxAppId = 'PXAbo2Yc8X';
        // Custom parameters
        // window._pxParam1 = "<param1>";
        var p = document.getElementsByTagName('script')[0],
            s = document.createElement('script');
        s.async = 1;
        s.src = '//client.px-cloud.net/PXAbo2Yc8X/main.min.js';
        p.parentNode.insertBefore(s,p);
    }());
</script>
```

Please [contact us](#section/Contact-Us) if you would like additional documentation for the Olo-provided JavaScript.

## Mobile Apps

### Request Headers

Mobile app integrations are required to provide the following HTTP headers with every request sent to the Ordering API:

| <div style="width:125px">Header</div> | Description | Example |
|---|---|---|
| User-Agent | Unique user agent value that identifies the app. Please send this formatted as *application_name/version*. | User-Agent: DonutApp/v2 |
| X-Device-Id | Unique hardware identifier for the device. | X-Device-Id: a4b5cda8-d52b-11eb-b8bc-0242ac130003 |

### Bot Protection

Olo has licensed an industry leading bot protection solution to detect and prevent automated attacks against the Ordering API, such as credential stuffing and fraud. Implementation of the Olo-provided SDKs for mobile apps is optional but may be required if our security team detects that your integration is sending a significant amount of API traffic that is identified as a security risk.

Limitations and caveats:

* The Olo-provided SDKs can only integrate with mobile apps that send requests directly to the Ordering API.
* Olo may change the bot protection solution.

The Olo-provided SDKs for mobile apps profile and evaluate the behavior of the customer's device to ensure that the requests sent to the Ordering API are genuine.

The SDKs are publicly available at the following links:
* **iOS:** https://github.com/PerimeterX/px-iOS-Framework
* **Android:** https://bintray.com/perimeterx/px-Android-SDK/Android-sdk

The following app IDs should be used with the Olo-provided SDKs:
* **Production environment:** PXAbo2Yc8X
* **Sandbox environment:** PXAOit9CN0

Please [contact us](#section/Contact-Us) if you would like additional documentation for the Olo-provided SDKs.

# Webhooks

A webhook (also called a web callback or HTTP push API) is a way for Olo to send event-driven information to our integration partners. Events are delivered via HTTP POST to an HTTPS endpoint provided by the partner. Webhooks deliver event data to subscribers close to when the events occurs, generally within seconds.

Partners that utilize webhooks gain an efficient way to respond to events without needing to query Olo's systems for changes. Typical use cases may include keeping internal systems in sync with Olo, responding to issues or outages, monitoring trends, or maintaining mailing lists.

### Event Types

This authorization method is to be used for projects where all incoming API requests will originate from one or more servers. Generally used for non-mobile Ordering projects such as websites. Also required to utilize the following functions (and related endpoints) within the Olo API:

The following events can be configured to trigger webhook calls relevant to the Ordering API:

* **OrderPlaced** - an order has been successfully placed
* **OrderClosed** - an order has reached its Ready Time and is considered complete
* **OrderCancelled** - an order has been cancelled
* **OrderAdjusted** - the order has been partially adjusted or refunded
* **UserSignedUp** - a user has created an account (not applicable to guests)
* **UserUpdated** - a user has updated their information (not applicable to guests)
* **GuestOptIn** - a guest has opted into receiving emails from the brand
* **UserOptOut** - a user opted out of marketing communications
* **ScheduledOrderFired** - a scheduled order has been transmitted
* **ScheduledOrderFailed** - a scheduled order has failed
* **MenuItemAvailabilityChanged** - a product or choice's availability has been changed (i.e. 86'd or 68'd)
* **VendorAvailabilityChanged** (a.k.a. Vendor POS Health Check) - a vendor has gone online or offline
* **VendorTemporarilyDisabled** - A vendor is temporarily disabled or re-enabled
* **VendorExportComplete** - the Vendor Export generation task has completed
* **DispatchStatusUpdate** - Dispatch delivery status has been updated
* **StandingOrderInstantiationFailed** - a recurring standing order instantiation failed
* **LocationParticipationChanged** - will fire when a vendor/location participation changes, i.e. add/remove vendor access to marketplace
* **MenuSyncComplete** - a menu sync has been completed for the subscriber
* **ExternalOrderEvent** - a notification has been received about an external order

If you are interested in learning more about webhooks, please review our full <a href="/docs/load/webhooks/">Webhook documentation</a>.

# Testing

## Verifying Results

Since the API exposes data and operations that are already accessible through the website, you may verify your application's behavior by comparing it to the [Foosburgers Sandbox site](https://vanilla.olosandbox.com/).

## Credit Card Simulation

For testing on the Sandbox environment, no real credit card transactions will occur. You may use the following test credentials:

* Valid card numbers: Anything passing a Luhn check (e.g. 4111111111111111) and with a future expiration date.
* Invalid CVV: 000 (all others pass).
* Invalid Billing Zip: 00000 (all others pass).
* Simulating Declines: Olo can set up a test restaurant that will always decline. Otherwise, all transactions by default will be set to pass.

## Regression Tests

It is highly recommended that your application is accompanied by a set of integration tests which can be run automatically on an ongoing basis (e.g. each night) or easily on-demand. Olo may request that your test suite is run from time to time to ensure that future API changes do not break your integration.    

## Load Testing

Any load testing that will affect the Ordering API will need to be approved before it is performed. Please contact [Developer Support](#section/Contact-Us) with the details of your load testing plan for approval.

## Certification

Olo must certify your integration before we grant access to our production environment.  Please contact your Olo Customer Success Manager and then complete the [Olo Pre-certification Checklist : Third Party API Access](https://docs.google.com/forms/d/e/1FAIpQLSd4z9b8K5AWaWBNtTj0I0XlAYMlqKRmQp7LvA4jY6s1MvB5ig/viewform) when you are ready to begin the certification process.

In addition to the Operational Guidelines above, the certification process will review the following:

* The volume of requests is kept to the minimally reasonable amount necessary
* If the menu the customer interacts with is served via the partner's own system: Restaurant and menu data is imported using the [Vendor Export](#operation/DownloadRestaurantMenuData) files and not the restaurant/menu API endpoints.

# Do's and Don'ts

Please ensure that your application abides by the following rules. Failure to comply could jeopardize the stability of the combined system. We also recommend reviewing our [Usage Basics](#section/Usage-Basics).

## Do: Identify your application

The User Agent header must identify the application in the format "ApplicationName/Version", for example "Foodcourt/1.0". This makes it easier for us to troubleshoot the integration, and reduces the risk of us mistakenly blocking the application when fighting certain types of attack. Applies to both Server-to-Server and native application integrations.

## Don’t: Blindly proxy all traffic

It can be tempting to have a path like "/oloapi/*" on your website which forwards all requests to the Olo API behind the scenes. Unfortunately this also forwards attack traffic, if for example you are being scanned by a vulnerability scanner it could result in our security defenses blocking your server IP. Proxying all traffic also increases the chances of an unintended server-to-server API operation being called maliciously, putting customer data at risk. Be explicit and deliberate about each API operation that is called.

## Do: If using a server-to-server integration, pass the necessary headers

The necessary headers for Server-to-Server integrations can be found here, [Server-to-Server Headers](#section/Security/Websites). End-user IP address is used for a number of fraud prevention mechanisms, such as rate-limiting and credit card fraud scoring. To prevent us from rate limiting your server IPs, send the end-user IP address with each user-initiated operation. You can check if your project is a server-to-server integration by going to the Projects page and verifying the "Server Auth" column has a "Yes" value.

## Don’t: Use menu retrieval endpoints for downloading full menus

Menu retrieval endpoints (including [Menu endpoints](#tag/retrieveMenuProducts) and [Product endpoints](#tag/retrieveProductModifiers)) are designed for dynamic browsing of the menu as requested by an end-user, for example from a mobile app or website that doesn’t have its own menu database.

These endpoints may not be used to enumerate all menu items for the purpose of downloading an entire menu. Systems that store their own menu must instead use the [Vendor Export](#operation/DownloadRestaurantMenuData) menu download endpoint.

## Do: If using the Vendor Export endpoint, keep your menu up to date

Olo generates new [Vendor Export](#operation/DownloadRestaurantMenuData) files after every menu change. To keep menus fresh, you should subscribe to the "[VendorMenuExportComplete](/docs/load/webhooks/#operation/vendorMenuExportComplete)" webhook to know when to download the latest menus and subscribe to the "[MenuItemAvailabilityChanged](/docs/load/webhooks/#operation/menuItemAvailabilityChanged)" webhook to receive 86/68 status changes.

## Don’t: Create Baskets unless there is an intent to order

Baskets may <u>only</u> be created when an end-user indicates an intent to order, such as by adding an item to their cart. Baskets may not be created purely for the purposes of monitoring the data that comes back, or if the user is just browsing. 

## Do: Have protection against distributed brute-force attacks

While our rate-limiting can mitigate simple credential stuffing attacks, with highly distributed botnet attacks it is often necessary to enforce a Captcha or browser challenge, actions which we are unable to enforce through the API because we’re not interacting directly with the user. You should have some mechanism for monitoring for these attacks and activating protections on your end. (Cloudflare for example is a low cost solution that can block these sort of attacks.)

## Do: Make sure your system can handle spikes in webhook traffic

If you are subscribed to webhook events, your system should be able to reliably receive these at a high rate (such as during a busy period or after a bulk 86’ing) with a low response time (preferably sub-second). We recommend building webhook listener logic in a way that the acknowledgement of a webhook delivery is either done before the processing of the event or is not dependent on the completion of the event processing (e.g. in a separate thread). Slow response times could result in further messages being delayed. Timeouts or errors will result in retries for up to 24 hours, after which the messages will not be delivered at all. Webhook subscriptions that sustain high delivery failure rates for multiple days are subject to be disabled.

# FAQ

## Developer Portal

**Q: What is the relationship between a Developer Portal project, API keys, and a brand?**

A: Each Developer Portal project has settings that are applied to one or more sandbox and/or production API keys. These API keys offer data access to the brand associated with the project. Based on the project settings, configured by [Developer Support](#section/Contact-Us), this access can be restricted to only certain functions so that security is maintained.

**Q: I (or Developer Support) invited a new user to my project. Why isn't the acceptance link in their invite email working?**

A: The invite expires after one week. Please request a new invite from [Developer Support](#section/Contact-Us).

**Q: How do I change or add another Project Owner?**

A: A project owner can assign or unassign another user as a project owner through the "Project Users" tab of the project.

**Q: I currently have an Exploration project (for use only with the Kitchen Sink test brand). How can I get access to real brand data?**

A: You'll need to contact your Olo Customer Success representative to make sure all the necessary details are sorted out. Once done, they will reach out to [Developer Support](#section/Contact-Us) to create your new project and API credentials.

**Q: How can I get Production API credentials?**

A: You'll need to contact your Olo Customer Success representative to request this access. You will then generally be required to go through Olo's certification process before [Developer Support](#section/Contact-Us) can enable Production access.

**Q: How can I get API keys generated in my On-Demand Environment (ODE)?**

A: You'll need to contact your Olo Customer Success representative to request this access. You will then generally be required to go through Olo's certification process before [Developer Support](#section/Contact-Us) can enable Production access.

**Q: How can I invite more people on my team to have access to our project's API keys?**

A: On the Projects page, select the project you're working on and then click on the "Project Users" tab. Existing project users can be viewed on this page. Project Owners can then add new users by clicking on the "Invite to Join" button and filling out the form. This requires a unique email address and mobile number for two-factor identification.

**Q: Do you have a list of common Olo terminology?**

A: Yes, this is located within our Olo Help Center, [Olo Terms for Partners](https://olosupport.zendesk.com/hc/en-us/articles/360031083251-Olo-Terms-for-Partners).


## PCI Compliance

**Q: What is PCI Compliance?**
A: PCI Compliance refers to the Payment Card Industry Data Security Standard (PCI DSS) that is designed to protect cardholder data. Every company that accepts credit card payments must be PCI compliant.


**Q: What do I need to know about PCI Compliance with Olo?**
A: Olo is PCI Compliant, which means our white label ordering platforms (web, mobile, apps) are PCI Compliant. [This matrix outlines PCI responsibilities for Olo vs. our clients](#section/Security/PCI-Compliance). This covers all Olo clients, not just those building a custom application on the Olo API.

Brands that build or engage a third party to build a custom application on the Olo API are responsible for ensuring PCI compliance of their application. Olo is not able or qualified to advise a third party on PCI scope. If a brand is looking to assess or understand PCI scope, Olo suggests working with a PCI Qualified Security Assessor (QSA). [Click here for a list available QSAs](https://www.pcisecuritystandards.org/assessors_and_solutions/qualified_security_assessors).

If a brand is looking for a Third Party recommendation from Olo to handle payment in a PCI Compliant way, other Olo brands have worked with PCI Proxy. Olo does not have an official partnership with them but we are happy to provide introductions as a courtesy.

**Q: How do I ensure my Third Party Ordering API project is PCI compliant?**
A: Olo is not in the position to advise third parties on how to address PCI compliance. The third party and the brand hold this responsibility. Olo cannot advise on whether a particular approach or third party is compliant, but we have had other partners use the following approaches successfully:

* Third Party agency can become PCI compliant, if they are not already.
  * If a brand is looking to assess or understand PCI scope, Olo suggests working with a PCI Qualified Security Assessor (QSA). [Click here for a list available QSAs](https://www.pcisecuritystandards.org/assessors_and_solutions/qualified_security_assessors).
* Third Party can outsource handling of credit card payment data to a PCI compliant third party.
    * There are vendors that offer solutions to capture cardholder data and pass that cardholder information along to the Olo API on behalf of the brand.
    * If a brand chooses to work with a third party vendor, the front-end developer and third party will need to work together to ensure that the final basket submission is completed via the Order Submission API endpoint, with full payment data from the customer (not a token).

## General

**Q: How do I get started with the API? How does it function, broadly speaking, and how are the endpoints categorized?**

A: There are several groupings of API operations/endpoints, some of which work together. Conceptually, it flows as follows:

* *Restaurant & Product:* These endpoints allow you to retrieve detailed information about restaurants, their menus, products within those menus, and options/modifiers within those products.
* *Basket:* This is where building an order (or group order) happens. Broadly speaking, a basket is created, products are added to it, a pickup (or delivery) time is set, delivery or Dispatch is specified, and coupons are applied. Lastly, the basket is validated and then submitted. Once successfully submitted, an order is generated and its initial status is returned in the response.
* *Orders:* These endpoints allow you to make adjustments, edit, and cancel orders. You can also get an order's current status along with its related details.
* *User:* These endpoints allow users to create accounts, authenticate accounts, modify accounts, manage passwords, find recent orders, retrieve available billing accounts, and save and retrieve their favorite baskets and restaurants.
* *Export:* Vendor Export offers complete restaurant and menu data in XML format on a per restaurant basis. Order Exports offer detailed closed order history that generally updates daily.

**Q: Where can I view the object structure for the request and response of each API endpoint?**

A: You can get this in the [API Reference](#tag/retrieveConfiguration). If an endpoint uses a request body its fields and their description will be present under the *REQUEST BODY SCHEMA* section, and there will also be a sample structure. Each endpoint will have a *Responses* section. If the endpoint returns a response object it will be within the green *200 Success!* response (click the dropdown arrow), and there will also be a sample structure.

Regarding the order of fields within the response, the [JSON specification](https://www.rfc-editor.org/rfc/rfc7159.txt) defines an object as an unordered collection of fields. Do not rely on the response to be in any specific order. This includes the order of fields being displayed within the *REQUEST BODY SCHEMA*, sample structures or as received within API responses. The order of fields can change at any time while field names and their casing will remain constant.

**Q: Can I get a comprehensive list of possible error responses to each API endpoint?**

A: No. Most of the errors that propagate up to the client are built dynamically based on a myriad of variables, therefore the list of error message possibilities is massive and in a frequent state of a change.

For a list of Olo Error Numbers and their general descriptions, please [click here](#section/Usage-Basics/Olo-Error-Numbers).

**Q: What does error number 3, "Unrecognized API key", mean?**

A: This error generally means that the API key doesn't exist in the environment you are trying to send a request to. If you see this error, verify you have the right environment in the request URL for that key. For more information, click here.

If you're seeing this error when the environment is correct, please reach out to [Developer Support](#section/Contact-Us) for assistance.

**Q: What does error number 10, "Please try this operation again or restart your application", mean?**

A: Error number 10 generally appears as a catch-all general error message. The most common reason for seeing this is inaccurate or malformed JSON in the request body. This error can also occasionally occur when submitting unexpected or non-existent field values.

If you're still seeing this error after verifying everything in the request body is formatted correctly and that any provided ids and/or field values are valid, please reach out to [Developer Support](#section/Contact-Us) for assistance.

**Q: How long do baskets last before expiring?**

A: Generally one week.

**Q: What does it mean when the API Reference says a response parameter is "optional"?**

A: It conveys that the property is not required to return a value -- i.e. it can be null. Required properties can be assumed to return a non-null value, although that value could still be an empty string.

## Dispatch

**Q: How is the estimated delivery time for an ASAP Dispatch order determined?**

Olo uses internal logic that factors in a number of variables -- lead time, item prep time, driver availability, capacity management, etc. -- to calculate the earliest possible time an order can be delivered. The delivery estimate is reflected in the `earliestreadytime` field on the basket as well as the `readytime` field in the basket validation response.

**Q: Why can't the order be delivered by the selected time wanted?**

There are several reasons this could be happening, one being that the desired delivery time is earlier than the earliest ready time calculated by Olo. Several factors define the earliest ready time, such as the prep time of the basket and the delivery lead time provided to us by the Delivery Service Providers (DSPs).

**Q: Are there any considerations a brand should take into account if they're transitioning from whitelabel to custom front end and utilizing Dispatch?**

The Ordering API partner will need to build a custom Dispatch status tracker. Please reference the "Monitoring the status of a Dispatch delivery" section in the [Dispatch tutorial](#section/Tutorials/Dispatch) for details. If the brand uses Olo's order confirmation emails, the email template will need to be updated by Olo with the custom Dispatch status tracker URL.

**Q: How does coverage work?**

Each Delivery Service Provider (DSP) configures its own coverage. Olo refreshes this information every 6 hours.

**Q: How is a restaurant's Dispatch delivery range determined?**

Each Delivery Service Provider (DSP) has their own logic to determine delivery coverage. Dispatch reads the coverage *per DSP* through its own service and translates that for the Ordering API.

**Q: Why am I getting an error that a restaurant can't deliver to an address when it worked earlier?**

There are a number of reasons this could be happening:

* One or more of the Delivery Service Providers (DSPs) the restaurant works with is experiencing a technical issue or outage.
* The quotes returned are longer and/or more expensive than before and now exceed the restaurant's maximum limits.
  * A longer transit time could be due to road closures, traffic, lack of drivers in the area, etc.
  * Increased delivery fees could be due to a price increase during busy times (sometimes referred to as "surge pricing").
* One or more of the DSPs the restaurant works with do not have any drivers available.

**Q: Why do I keep getting invalid phone number errors for Dispatch orders?**

 Dispatch performs stricter phone number validation logic than other handoff modes. The validation is provided by Google's **libphonenumber** library and applies to both the restaurant (pickup) and customer (dropoff) phone numbers. It does not apply to the driver's phone number. Phone numbers must match the E.164 international phone number format. An example valid number to use for testing is (505) 555-5555. If you are sure the customer phone number you are providing is valid, it's possible that the restaurant configuration needs to be updated with a valid phone number..

## Restaurants

**Q: What is the difference between "store_number" and "restaurant_id"? What does the term "vendor" refer to?**

A: In conversation between Olo and partners, the words 'store', 'restaurant', and 'vendor' are often used interchangeably, however we generally refer to all of these as just 'restaurant'. The one notable exception to this is with regard to "store_number", which is a restaurant's external reference as generally defined by the brand/chain. The "restaurant_id" or "vendor id" is Olo's reference for a restaurant.

**Q: Is there a restaurant 'health check' endpoint? How can I check POS availability for a restaurant? What does the "isavailable" flag mean?**

A: There isn't a dedicated endpoint for restaurant health/availability, but you can find out if a restaurant is available for online ordering via the "isavailable" field on the restaurant object. This field is true when the following conditions are met:

* Vendor's POS is online
* Vendor is NOT temporarily disabled

## Product

**Q: [GET .../modifiers](#operation/RetrieveProductModifiersandOptions) and [.../options](#operation/RetrieveOptionChildren) What are the differences between minselect/maxselect, minchoicequantity/maxchoicequantity, and minaggregatequantity/maxaggregatequantity?**

A: See as follows:

* min/max selects: The number of options that must be selected from the option group.
* min/max choice quantity: The quantity for options within the option group.
* min/max aggregate quantity: The aggregate quantity of all selected options from the option group.

**Q: [GET .../modifiers](#operation/RetrieveProductModifiersandOptions) and [.../options](#operation/RetrieveOptionChildren)  What does the "mandatory" field mean?**

A: If "true", you must select one and only one option from the option group. In effect: true means radio buttons, false means checkboxes.

## Basket

**Q: What's the quickest way to add a product with single-quantity options to a basket?**

A: This scenario is where [POST /baskets/\{basketGuid\}/products](#operation/AddSingleProducttoBasket) really shines. Simple JSON example:

```
{
    "productid": 12345678,
    "quantity": 1,
    "options":"11111,22222,33333"
}
```

**Q: How do I add a product to a basket with an option/choice quantity greater than 1, or multiple different products to a basket with one call?**

A: The 'Add Product to Basket' endpoint won't be of use here. Instead you'll want to use the 'Add Multiple Products to Basket' endpoint, [POST /baskets/\{basketGuid\}/products/batch](#operation/AddMultipleProductstoBasket). Simple JSON example:

```
{
    "products": [
    {
    "productid": 12345,
    "quantity": 1,
    "choices": [
    {
        "choiceid":11111,
        "quantity": 3
    },
    {
        "choiceid":22222,
        "quantity": 2
    }]
    }]
}
```

**Q: What is Dispatch?**

A: Dispatch is an Olo service that allows baskets to reach out to one or more third party Delivery Service Providers (DSPs) to compete with each other for the best delivery quote possible. To learn more, please check out our official Dispatch website: <a href="http://olodispatch.readme.io/" target="blank">Dispatch - Delivery Ordering API</a>.

**Q: What's the difference between Dispatch and Delivery?**

A: Dispatch integrates with several third party Delivery Service Providers (DSPs) and will find the lowest delivery price to offer the customer. "Delivery" means the brand has its own in-house delivery fleet.

**Q: How can Dispatch be activated on a particular restaurant?**

A: The first step is having it switched on at the restaurant level. This is to be done by your Olo Customer Success representative. Once the restaurant is Dispatch-enabled it can be utilized in the API. This is accomplished by simply setting the Dispatch Address via [PUT /baskets/\{basketGuid\}/dispatchaddress](#operation/SetBasketDispatchAddress).

**Q: [PUT .../timewanted](#operation/SetTimeWanted) What does "manualfire" mean and what value should I give it?**

A: Manual Fire orders only get submitted to the POS after they are explicitly told to via [POST /orders/\{orderref\}/manualfire](#operation/SubmitManualFireOrderbyExternalReference). For most clients this flag should always be set to "false".

**Q: What are Custom Fields and how are they used?**

A: These are extra fields that can be configured on a per-restaurant basis by your Olo Customer Success representative. These will often be used on the ordering page for a customer to fill in values for (e.g. for curbside pickup orders, a restaurant might ask for the car's make and model). Once set up for a restaurant, the API can be used to submit values for each predefined custom field id.

**Q: [POST .../submit](#operation/SubmitOrderwithSinglePayment) What are the available "billingmethod" options?**

A: 

* cash
* creditcard
* creditcardonfile
* creditcardtoken
* billingaccount
* storedvalue
* prepaid

**Q: [POST .../submit](#operation/SubmitOrderwithSinglePayment) What are the available "usertype" options?**

A:

* guest
* user

**Q: [POST .../submit](#operation/SubmitOrderwithSinglePayment) How do I submit an order with a gift card?**

A: Here are a few things to remember:

* Set the "billingmethod" to "storedvalue"
* Set the "billingschemeid" to the integer that is associated with the gift card to use (can be retrieved from [GET /billingschemes](#operation/RetrieveAllBillingSchemesandAccounts))
* Set the "billingfields" with the gift card number and, if needed, the PIN. Example JSON:

```
"billingfields": [  
{  
    "name": "number",  
    "value": "1234567890"  
},  
{  
    "name": "pin",  
    "value": "1234"  
}]
```
        
**Q: How do I submit an order with multiple payment types and attach specific amounts to each one?**

A: [POST /baskets/{basketGuid}/submit/multiplepayments](#operation/SubmitOrderwithMultiplePayments)

This endpoint operates in much the same way as the standard basket submit endpoint. The big difference is that, with multiple payments, you can submit an array of "billingaccounts" and provide a specific "amount" and "tipportion" for each one.

## Orders

**Q: How can I edit a submitted order?**

A: [POST /orders/{orderGuid}/edit](#operation/EditOrder)

This endpoint works by generating a new basket from the items in the order, thus allowing you to modify and submit a new order. Once the new order has been created, the old one will be automatically canceled.

> This will only work if the "iseditable" field is true.

**Q: Where can I find the current status of my order? What are the possible order status values?**

A: [GET /orders/\{orderGuid\}](#operation/CheckOrderStatus) or [GET /orders/byref/\{reference\}](#operation/CheckOrderStatusbyExternalReference)

Here are the possible order "status" values:

* In Progress: The order is being prepared or delivered.
* Scheduled: Waiting until the scheduled time nears before getting transferred to the POS (provided the restaurant is configured this way).
* Pending Manual Fire: Waiting until a Manual Fire request tells the order to be transmitted to the POS.
* Transmitting: In the process of being transmitted to the POS.
* Canceled: The order has been canceled.
* Completed: The order has reached its estimated handoff time and is considered complete.

**Q: How can I find out which Delivery Service Provider (DSP) will be delivering the order?**

A: Once a Dispatch order has been submitted, you can find more details about the delivery via [POST /orders/\{orderGuid\}/deliverystatus](#operation/CheckOrderDispatchStatus). This will provide the delivery status, driver name, driver phone number, and the DSP itself.

**Q: Are Olo Order Ids provisioned in sequential order?**

A: As of March 1, 2021, Olo Order Ids, `oloid` field, will no longer be issued in sequential order but will remain unique. Any functionality that relies on sequential Ids for sorting, should be updated to use an order's `timeplaced` field.

## User

**Q: What is an authtoken and how do I get one?**

A: An Olo authentication token, or "authtoken", is a unique 'key' associated with an Olo user. With an authtoken one can get that user's contact information, favorite locations & products, delivery address, recent orders, billing accounts, saved billing accounts, and more. The authtoken can also be tied to a new basket or provided during basket submission so that the order is tied to that user and their information.

An authtoken is initially generated and returned when a user is created via [POST /users/create](#operation/CreateOloUser) or [POST /users/getorcreate](#operation/CreateorGetSSOLinkedOloUser). A new authtoken for an existing Olo user can be generated via [POST /users/authenticate](#operation/AuthenticateOloUser). 

> Authtokens do not automatically expire after any time period. The only way they can be deactivated is via [DELETE /users/\{authtoken\}](#operation/DisableUserAuthenticationToken).

**Q: How do I add a credit card to a user's account?**

A: The only way to save a credit card to a user's account is during checkout via [POST /baskets/\{basketGuid\}/submit](#operation/SubmitOrderwithSinglePayment) or [POST /baskets/\{basketGuid\}/submit/multiplepayments](#operation/SubmitOrderwithMultiplePayments). This is done by setting the "billingmethod" to "creditcard" or "creditcardtoken" and setting "saveonfile" to "true".

**Q: How can we link a user account from a login provider to an Olo user account?**

A: This can be done via [POST /users/getorcreate](#operation/CreateorGetSSOLinkedOloUser). For information about becoming your own login provider within Olo's system, please reach out to your Olo Customer Success representative.

**Q: [GET .../recentorders](#operation/RetrieveUserRecentOrders) How many recent orders does this endpoint return? Can this number be changed? Can a date range be provided?**

A: Last five orders, no, and no.

## Export

**Q: What are Order Exports?**

A: Think 'Order History'. These endpoints allow you to retrieve the details of all closed orders prior to the current day.

> Order Exports can only be retrieved from API credentials that have [Server Authorization](#section/Authentication/Server-Authorization-(Server-to-Server)) enabled.

**Q: How do I use the Order Export endpoints together?**

A: They work together in the following order:

* [GET /orderexports](#operation/RetrieveAllOrderBatches): Retrieves a list of "order batches". Each batch (i.e. a collection of closed orders) has a batch id and the date in which that batch was generated. The very first/earliest batch(es) in the list will contain all closed order history up to the point when Order Exports are enabled. From there, each batch will contain the closed orders between the last batch and the cutoff time for the current batch. 

  > There are circumstances where multiple batches can be generated within a single day (e.g. massive order count) or days when no batches are generated (e.g. the batch service got delayed, which is rare). In the latter case, the "missed" orders will always appear the next time one or more batches successfully generate.
* [POST /orderexports/\{batchId\}](#operation/RetrieveDownloadRedirectforOrderBatch): This will return a HTTP redirect to a URL of the export ZIP file. This is a temporary, signed URL that will only be accessible for 5 minutes. Inside this ZIP file is an XML file (orderbatch.xml) containing the order and customer data. 

  > [API Reference](#section/API-Reference) does not support the download operation, so you'll have to use your own REST client to test.
* [DELETE /orderexports/{batchId}](#operation/MarkOrderBatchasProcessed): Once sure you do not need to access the data in a particular batch anymore (e.g. you've imported the data into your own database), this endpoint will remove the file from the download list.

Example orderbatch.xml file contents:

```
<?xml version=""1.0"" encoding=""utf-8""?>
<exportbatch xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"">
    <orders>
    <order>
        <oloRef></oloRef>
        <posRef></posRef>
        <storeName></storeName>
        <storeRef></storeRef>
        <storeUtcOffset></storeUtcOffset>
        <customer>
          <oloRef></oloRef>
          <firstName></firstName>
          <lastName></lastName>
          <emailAddress></emailAddress>
          <allowEmail></allowEmail>
          <isGuest></isGuest>
          <phoneNumber></phoneNumber>
          <loginProviders>
            <provider>
              <name></name>
              <slug></slug>
            </provider>
          </loginProviders>
        </customer>
        <handoffMethod method="""">
          <customFields>
            <customField label="""" value=""""/>
          </customFields>
        </handoffMethod>
        <subtotal></subtotal>
        <discount></discount>
        <tax></tax>
        <tip></tip>
        <deliveryFee></deliveryFee>
        <customFeeTotal></customFeeTotal>
        <total></total>
        <timePlaced></timePlaced>
        <timeClosed></timeClosed>
        <timeWanted></timeWanted>
        <timeEstimate></timeEstimate>
        <source></source>
        <viewport></viewport>
        <orderingProvider>
          <name></name>
          <slug></slug>
        </orderingProvider>
        <externalReference></externalReference>
        <orderedFromFave></orderedFromFave>
        <products>
          <orderProduct name="""" quantity="""" baseCost="""" posRef="""">
            <modifiers>
              <modifier name="""" quantity="""" baseCost="""" posRef="""">
                <modifiers>
                  <modifier name="""" quantity="""" baseCost="""" posRef=""""/>
                </modifiers>
              </modifier>
            </modifiers>
          </orderProduct>
        </products>
        <fees>
          <internalName></internalName>
          <description></description>
          <amount></amount>
        </fees>
        <coupon>
          <couponCode></couponCode>
          <description></description>
          <amount></amount>
        </coupon>
        <handoff></handoff>
        <deliveryAddress>
          <streetAddress></streetAddress>
          <building></building>
          <city></city>
          <state></state>
          <zipcode></zipcode>
        </deliveryAddress>
        <clientPlatform></clientPlatform>
        <billingMethods>
          <string></string>
        </billingMethods>
        <payments>
          <payment>
            <amount></amount>
            <description></description>
            <brand></brand>
            <suffix></suffix>
            <tip></tip>
            <type></type>
            <address>
              <streetAddress></streetAddress>
              <building></building>
              <city></city>
              <state></state>
              <zipcode></zipcode>
            </address>
          </payment>
        </payments>
        <deliveries>
          <delivery>
            <deliveryService>
              <name></name>
            </deliveryService>
          </delivery>
        </deliveries>
        <handoffEvents>
          <handoffEvent>
            <comment></comment>
            <eventFireTime></eventFireTime>
            <eventType></eventType>
          </handoffEvent>
        </handoffEvents>
        <standingOrderTemplateName></standingOrderTemplateName>
        <standingOrderTemplateId></standingOrderTemplateId>
      </order>
    </orders>
</exportbatch>
```

Order export field descriptions:

* **oloRef**: (int64) Olo OrderId
* **posRef**: (string) POS reference for the order. These values are specific to POS type and originate from the POS. This number could be the POS checkId however, contact your CSM for details on what these numbers represent
* **storeName**: (string) Restaurant name
* **storeRef**: (string) External reference of the restaurant
* **storeUtcOffset**: (float) UTC offset for this restaurant
* **customer**
	* **oloRef**: (int64) Olo userId
	* **firstName**: (string) Customer's first name
	* **lastName**: (string) Customer's last name
	* **emailAddress**: (string) Customer's email address. If Rails, this could be a marketplace email address
	* **allowEmail**: (boolean) Whether or not the customer wants to receive marketing emails, possible values "true" or "false"
	* **isGuest**: (boolean) If the customer checked out as a guest, possible values "true" or "false"
	* **phoneNumber**: (string) Customer's phone number
	* **loginProviders**: Describes how the customer logged in. If this is empty or missing, the customer did not log in and is considered a guest user
		* **provider**
			* **name**: (string) Name of the login provider
			* **slug**: (string) Slug of the login provider
* **handoffMethod**
    * **method**: (string) Handoff method used for the order. Possible values are CounterPickup, CurbsidePickup, Dispatch, DriveThru, DineIn, Delivery
* **customFields**
    * **customField** 
	    * **label**: (string) Description of the custom field
	    * **value**: (string) Value of the custom field
* **subtotal**: (double) Subtotal of all products and modifiers in the order
* **discount**: (double) Total sum of all discounts applied to the order
* **tax**: (double) Amount of the tax
* **tip**: (double) Amount of the tip
* **deliveryFee**: (double) Fee charged for delivery
* **customFeeTotal**: (double) Total sum of all custom fees
* **total**: (double) Total cost of the order
* **timePlaced**: (string) Local date and time when the order was placed, in the format "yyyymmdd hh:mm"
* **timeClosed**: (string) Local date and time when the order was closed, in the format "yyyymmdd hh:mm"
* **timeWanted**: (string ) Local date and time when the order was wanted by the customer, in the format "yyyymmdd hh:mm". If blank, no time wanted was specified indicating the order was submitted as ASAP or manual fire.
* **timeEstimate**: (int32) Estimate, in minutes, of when the order may be completed
* **source**: (string) Integration where the order was submitted, possible values Web, MobileWeb, SMS, API, CallCenter
* **viewport**: (string) If order was placed on Serve, this will be the device's viewport, possible values Mobile, Tablet, Desktop
* **orderingProvider**
	* **name**: (string) This will be the ordering provider name for orders placed by a Developer Portal project integration.
	* **slug**: (string) This will be the ordering provider slug, if valued, for orders placed by a Developer Portal project integration.
* **externalReference**: (string) Order reference in the calling system
* **orderedFromFave**: (boolean) Whether or not the order was created from a favorite, possible values "true" or "false"
* **products**
	* **orderProduct**
		* **name**: (string) Name of the product
		* **quantity**: (int32) Quantity of the products ordered
		* **baseCost**: (double) Base cost of the product
		* **posRef**: (string) POS reference of the product
	* **modifier**
		* **name**: (string) Name of the modifier
		* **quantity**: (int32) Quantity of modifiers ordered
		* **baseCost**: (double) Base cost of the modifier
		* **posRef**: (string) POS reference of the modifier
* **fees**
	* **internalName**: (string) Olo name of the fee
	* **description**: (string) Description of the fee
	* **amount**: (double) Amount of the fee
* **coupon**
	* **couponCode**: (string) Coupon code entered by the customer
	* **description**: (string) Description of the coupon 
	* **amount**: (double) Coupon discount amount 
* **handoff**: (string) Handoff or delivery method used for the order. Possible values are CounterPickup, CurbsidePickup, Dispatch, DriveThru, DineIn and Delivery
* **deliveryAddress**
	* **streetAddress**: (string) Delivery street address
	* **building**: (string) Delivery address building
	* **city**: (string) Delivery address city
	* **state**: (string) Delivery address state
	* **zipcode**: (string) Delivery address zipcode
* **clientPlatform**: (string) The client platform associated with the API key used to place the order
* **billingMethods**
	* **string**: (string) Type of payment used to pay for the order. Possible values are Visa, Mastercard, Amex, Prepaid, Paid on location, etc.
* **payments**
	* **amount**: (double) Amount paid with this payment type
	* **description**: (string) Description of the payment type
	* **brand**: (string) Brand of credit card if payment was made with a credit card. Possible values are Visa, Mastercard, Amex and Discover
	* **suffix**: (string) Last 4 digits of credit card if payment was made with a credit card
	* **tip**: (double) Amount of tip
	* **type**: (string) Type of payment, some possible values are "CreditCard", "Prepaid", "PassThrough", "GiftCard", "Paytronix", etc
	* **address**
		* **streetAddress**: (string) Billing street address
		* **building**: (string) Building of the billing address
		* **city**: (string) Billing address city
		* **state**: (string) Billing address state
		* **zipcode**: (string) Billing address zipcode
* **deliveries**
	* **deliveryService**
		* **name**: (string) Name of the delivery service provider
* **handoffEvents**
	* **handoffEvent**
		* **eventType**: (string) Type of event. Possible values are OrderPlaced, Arrived or PickedUp.
		* **comment**: (string) Optional comment about the event.
		* **eventFireTime**: (string) Local date and time when the event occurred, in the ISO 8601 format of "yyyy-mm-ddThh:mm:ss.sss".
* **standingOrderTemplateName**: (string) Template name for the standing order
* **standingOrderTemplateId**: (int64) Template id for the standing order


> Order Exports can only be retrieved from API credentials that have [Server Authorization](#section/Authentication/Server-Authorization-(Server-to-Server)) enabled.

**Q: What is the difference and purpose of the Vendor Export endpoint in relation to the Restaurant & Menu endpoints?**

A: Think of Vendor Export as a complete collection of data returned from the Restaurant & Menu endpoints on a per restaurant basis.

Vendor Export is a bit slower to download and process and should primarily be used to ingest data into your own system. You can use the [GET /vendorexport/status](#operation/RetrieveVendorExportStatus) endpoint to limit the restaurants to only those that need to be updated, which cannot be done with the Restaurant & Menu endpoints.

The Restaurant & Menu endpoints offer more agility in getting the most up-to-date data for a particular restaurant, product, and/or modifier. These should be used primarily for retrieving data dynamically as the customer needs it while building an order.

> Vendor Export can only be retrieved from API credentials that have [Server Authorization](#section/Authentication/Server-Authorization-(Server-to-Server)) enabled.

## Feedback

**Q: What does this endpoint do?**

A: Allows customers to submit feedback directly to the brand. The email address this feedback is sent to is specified by the brand and configured by your Olo Customer Success representative.


# Quick Start Guide
The following guide provides an introduction to the basic concepts and features of the Ordering API, and should be used in conjunction with the full Ordering API documentation.

## Quick Start Guide: Select a restaurant

### Purpose
Select a vendor (restaurant location).

### Behavior
There are several ways to accomplish this through the API: for example, you can [find nearby restaurants](#operation/FindNearbyParticipatingRestaurants), or [retrieve a restaurant by its brand-specific store number](#operation/RetrieveSingleRestaurantInformationbyBrandSpecificStoreNumber) (the brand's store number for the vendor). View all the Restaurant endpoints [here](#tag/retrieveConfiguration).

The restaurant response payload contains vendor details needed to successfully place an order. For example: whether or not the vendor offers delivery, and what payment methods are accepted.

### Considerations
- Vendors may support a variety of handoff modes; one vendor may offer delivery, while another supports dispatch and curbside pickup.
<br/>

- A vendor's ability to accept online orders may change unexpectedly, for example, if there is a power outage. For this reason, you'll always want to confirm the `isavailable` field is `true`. This specifically means:
  - the vendor is **not** temporarily disabled (such as closed for inclement weather), and 
  - the vendor's POS is online and ready to accept orders.  
<br/>

Many integrations leverage the [Vendor Export](#tag/vendorExport) feature to retrieve and cache a complete collection of each vendor's restaurant and menu information, including the configurations mentioned above. Olo provides [vendor update webhooks](/docs/load/webhooks#tag/vendorEvents) that will notify of vendor changes.
<br/>

> #### Follow Along
> - Make requests to a few of the restaurant endpoints, and try some of the endpoints' optional request params to see how that affects your results. Make note of a vendor ID to use when viewing the menu and creating a basket.

## Quick Start Guide: View the menu

### Purpose
Display the vendor's menu to the customer.

### Behavior
Use the [retrieve restaurant menu](#operation/RetrieveRestaurantMenu) to view the menu products.

The menu response payload organizes the products by category. Most menu products have at least one modifier (see the [retrieve product modifiers and options endpoint](#operation/RetrieveProductModifiersandOptions)), which is a grouping of options applicable to the product. Options may have their own nested modifiers. Here are a few basic examples:

Product | Modifier | Options 
---|---|---
Lunch Combo | Choose Two Items | Tomato Soup<br/>Broccoli Cheddar Soup<br/>Turkey Melt<br/>Veggie Wrap
Cobb Salad | Pick a Dressing | Ranch<br/>Honey Mustard
Banana Split Sundae | Select Size | Small<br/>Medium<br/>Large 

### Considerations
- The menu is vendor-specific because availability and pricing can vary from location to location.  
<br/>

- Products may be limited by time of day, or only available specific days. Check the `availability` object for these details, and note the `description` field can be used as a customer-friendly explanation of product availability.  
<br/>

- Brands may opt to hide products that are not available due to the time of day (for example, products in the Breakfast category don't appear in the response payload after 10:30 a.m.).  
<br/>

- Certain products may not be ordered with certain handoff types. For example, a brand may opt to disable ice cream cones for delivery orders. Check the `unavailablehandoffmodes` for these details.  
<br/>

- If a vendor has 86'd an item, it will not display in the restaurant response (unless you request the menu with the `includedisabled` query param set to `true`).  
<br/>

- Each of the products and options has an `id` field, and most integrations use this when adding items to the basket. The `id` is vendor-specific, but each product and option is linked to the company menu using the chain ID: `chainproductid` or `chainoptionid`, respectively. These chain IDs are the same across vendors, and the API has endpoints that support adding products to the basket by this ID.  
<br/>

Many integrations leverage the [Vendor Export](#tag/vendorExport) feature to retrieve and cache a complete collection of each vendor's restaurant and menu information. Olo provides [menu events webhooks](/docs/load/webhooks#tag/menuEvents) that will notify when new exports are available or if products are 86'd/68'd.  
<br/>

> #### Follow Along
> - Request [retrieve restaurant menu](#operation/RetrieveRestaurantMenu) to see products and their prices. Select an item and use its `id` to [retrieve product modifiers and options](#operation/RetrieveProductModifiersandOptions).  

## Quick Start Guide: User login
*This step is not needed for a guest ordering experience.*

### Purpose
Access a registered user's contact information, favorite locations and products, delivery addresses, recent orders, saved billing accounts, and more.

### Behavior
Olo uses an `authtoken` to identify users in the Ordering API. There are three ways to get an authtoken:
1. For brands utilizing Olo as a login provider, generate a new user's authtoken via the [create Olo user endpoint](#operation/CreateOloUser).
2. Generate an authtoken for an existing Olo user via the [authenticate Olo user endpoint](#operation/AuthenticateOloUser).
3. For brands utilizing a Single Sign On login provider (i.e. loyalty providers, Google), generate an authtoken using the [create or get SSO-linked Olo user endpoint](#operation/CreateorGetSSOLinkedOloUser).

### Considerations
- Many endpoints used in an ordering flow accept the authtoken value either as a path param or within the request payload.  
<br/>

- If the basket was created before user login, the `basketid` may be included when creating or authenticating a user.  This will link the basket to the user, this cannot be undone or modified.
<br/>

> #### Follow Along
> - Use the [create Olo user endpoint](#operation/CreateOloUser) to create a user account in your Exploration project. Use the `authtoken` when creating and submitting your basket.
> - Explore the other User endpoints to see how they might support your integration.

## Quick Start Guide: Create a basket

### Purpose
Generate a "shopping cart" in which to store the customer's selected menu items and order preferences, such as handoff method and time wanted. 

### Behavior
Use the [create basket endpoint](#operation/CreateBasket) to initialize a basket.

The basket holds data points necessary for placing and fulfilling an order, including:
- Products the customer wants
- How the customer wants to receive their order
- When the customer wants to receive their order
- How soon the vendor can have the order ready
- Applicable discounts, totals, taxes, and fees
- And more
  
### Considerations
Just as abandoned carts in your local grocery store could negatively impact your shopping experience, abandoned baskets introduce unnecessary burden on the Olo system and affect reporting metrics. Please follow these guidelines when working with baskets:
- Baskets should only be created if the customer has expressed an intent to order (by clicking an "Add to Order" button, for example). The menu should be made available to browse outside the context of the basket.
<br/>

- Baskets are valid for about seven days. Some integrations save in-progress basket IDs in local storage in case the customer returns to complete their order at a later time.
<br/>

- Baskets may be associated with the user:
  - when the user account is created or authenticated (see [user login step](#section/Quick-Start-Guide/Quick-Start-Guide:-User-login) above)
  - when a basket is created
  - when a basket is submitted  
  
<br/>

- Baskets should almost never be duplicated as part of a single order flow. Basket details and products may easily be updated or transferred to a different vendor using the API. [Drop us a note](#section/Contact-Us) if you aren't sure how to make a change without duplicating the basket. We're here to help!
<br/>

> #### Follow Along
> - Use the [create basket endpoint](#operation/CreateBasket) to initialize a basket, and be sure to include the `authtoken` if you've logged in. Notice the default values for `deliverymode` and `timemode`.  

## Quick Start Guide: Set the basket handoff method

### Purpose
Indicate how the customer would like to receive their order.

### Behavior
Change the handoff method by using the [set basket handoff method endpoint](#operation/SetBasketHandoffMethod). This updates the basket's `deliverymode` property to the provided value.

### Considerations
- Supported handoff methods may vary from vendor to vendor, so be sure to check the restaurant response payload when presenting handoff options to your customer (`canpickup` and `supportsdinein` are two examples of restaurant properties to reference).  
<br/>

- Here is a list of the possible handoff modes:
  - `delivery` indicates the vendor will deliver the order to the customer (in-house delivery). Requires the customer's `deliveryaddress` to be set on the basket.
  - `dispatch` indicates the order will be delivered to the customer by a third-party delivery service provider (DSP). Requires the customer's `deliveryaddress` to be set on the basket.
  - `curbside` indicates the vendor will bring the order to the customer outside the restaurant.
  - `pickup` most often indicates the customer will accept their order inside the restaurant, however it could indicate a courier service will pick up the order if the vendor uses the Olo Rails product.
  - `dinein` indicates the vendor will bring the order to the customer in the dining room.
  - `drivethru` indicates the vendor will give the order to the customer at the drive-thru window.

<br/>

> #### Follow Along
> - Use the [set basket handoff method endpoint](#operation/SetBasketHandoffMethod) to change the `deliverymode`. 
> - [Set basket delivery address](#operation/SetBasketDeliveryAddress) or [set basket dispatch address](#operation/SetBasketDispatchAddress) to set the `deliveryaddress` and `deliverymode` with one API request.  

## Quick Start Guide: Set the basket time wanted

### Purpose
Indicate when the customer would like to receive their order.

### Behavior
Change the time wanted by using the [set time wanted endpoint](#operation/SetTimeWanted). This updates the basket's `timewanted` property to the provided value.

### Considerations
- Here's a quick look at each time property:
   - `earliestreadytime` provides an an estimate of the earliest time the order can be prepared and delivered.
   - `leadtimeestimateminutes` provides an estimate of how many minutes until the order is prepared and delivered.
   - `timemode` indicates whether the order is for now or a later time; some configurations at the brand, vendor, and even product level will require the `advance` time mode.
   - `timewanted` is when the customer would like to receive their order if `timemode` is `advance` (for `asap` orders, this field will be null).

<br/>

- Be aware that the `earliestreadytime` and `leadtimeestimateminutes` properties are dynamic, and may change as your customer adds products to the basket.  
<br/>

> #### Follow Along
> - Change the basket to an advance order by using the [set time wanted endpoint](#operation/SetTimeWanted), or change it to ASAP using the [set time mode to ASAP endpoint](#operation/SetBasketTimeModetoASAP).  

## Quick Start Guide: Add products to the basket

### Purpose
Indicate the items the user would like to receive in their order.

### Behavior
There are two ways to add products to the basket:
1. To add one item, use the [add single product to basket](#operation/AddSingleProducttoBasket).
     - There is a similar endpoint that will allow you to add a product using the `chainproductid`: [add single product by chain ID](#operation/AddSingleProductbyChainIDtoBasket).
2. To add more than one item, use the [add multiple products to basket](#operation/AddMultipleProductstoBasket). This endpoint is helpful as it includes an `errors` array in the response payload indicating if certain products could not be added to the basket.
   - There is a similar endpoint that will allow you to add multiple products by the `chainproductid`: [add multiple products by chain ID](#operation/AddMultipleProductsbyChainIDtoBasket).

These endpoints update the basket's `products` array to include the provided menu items.

### Considerations 
- When adding a product to the basket, include both the product ID and any option IDs. The modifier IDs should not be included.  

<!-- Wrapping in div for formatting -->
<div style="padding-left: 5%"> 
For example, to add the below selection to the basket,  

Product | Modifier | Option 
---|---|---
Fries<br/>id: 10857701 | Choose Size:<br/>id: 171794174 | Large<br/>id: 990779712  

request [add single product to basket](#operation/AddSingleProducttoBasket) with the following payload:  
`{ "productid": 10857701, "quantity": 1, "options": "990779712" }` 
</div>
<br/>

- Some products have `unavailablehandoffmodes` and may not be applied to the basket based on the handoff method.  
<br/>

> #### Follow Along
> - Pick an item from the menu and [add single product to basket](#operation/AddSingleProducttoBasket). You may need to [retrieve product modifiers and options](#operation/RetrieveProductModifiersandOptions) to select the options.
> - Select multiple items from the menu and [add multiple products to basket](#operation/AddMultipleProductstoBasket). Note the `errors` array in the response payload will indicate if any items could not be added.  

## Quick Start Guide: Validate the basket

### Purpose
Confirm the order can be processed.

### Behavior
The [validate basket endpoint](#operation/ValidateBasketagainstthePOS) calls out to the vendor POS to
- Obtain final tax and total amounts
- Verify products are still available for ordering
- Confirm order can be ready by the time wanted
- Check that loyalty rewards can be redeemed
- And more

The validate response body provides the final total for the basket in its current state. 

### Considerations
- Validation is a **crucial step** in the ordering flow. It should be the last call made before [submitting the order](#section/Quick-Start-Guide/Quick-Start-Guide:-Submit-the-order).
<br/>

- If the user navigates away from checkout and makes changes to the basket, then is again ready to pay, re-validate again before proceeding. This ensures the order can still be processed with the updates.
<br/>

- Errors returned from the validate call will generally have a user-friendly error message. The [Olo Error Numbers](#section/Usage-Basics/Olo-Error-Numbers) guide provides a list of errors and suggested actions for resolving common issues.  
<br/>

> ##### Follow Along
> - Confirm your basket is ready to submit by requesting the [validate basket endpoint](#operation/ValidateBasketagainstthePOS).  

## Quick Start Guide: Submit the order

### Purpose
Send the order to the vendor so it can be prepared for the customer.

### Behavior
The [submit order endpoint](#operation/SubmitOrderwithSinglePayment) handles payment information and sends basket details to the vendor's POS.

The order response includes:
- Status of the order
- Order handoff mode
- Relevant customer contact information
- Time the order was placed, and when it will be ready
- Products the customer ordered
- And more
  
### Considerations
- The reqest payload accepts an `authtoken`. This field is required *if the customer is a registered user* so that the order details may be saved in user history and, if the user wishes (and the vendor configuration permits), they may save their billing method on file (using the `saveonfile` property). See the [user login step](#section/Quick-Start-Guide/Quick-Start-Guide:-User-login) for more details on how to get the `authtoken`.
<br/>

- Once the basket has been successfully submitted, it becomes an order, and none of the basket endpoints will return a successful response. Reference the order using the `id` or `oloid` returned in the response payload.
<br/>

Note: The [Credit Card Submission Frame workflow](#section/Tutorials/Credit-Card-Submission-Frame) does **not** use the submit endpoint. You will [request the CCSF token](#operation/request-ccsf-payment-token) and then submit via the CCSF iFrame.  
<br/>

> #### Follow Along
> - You may use [submit order with single payment](#operation/SubmitOrderwithSinglePayment) or [submit order with multiple payments](#operation/SubmitOrderwithMultiplePayments) to submit your order. Reference our [Credit Card Simulation](#section/Testing/Credit-Card-Simulation) tips for submitting orders in the sandbox environment.
> - View, modify, or cancel the order using the [modification, retrieval, & delivery status endpoints](#tag/modificationRetrievalDeliveryStatus).  
> - Congrats, you've submitted your first order! 🎉 Find more Ordering API information in the documentation below. We're here to help if you have questions!


# Tutorials

## Terminology
Words and phrases commonly used in the Ordering API.

| Term | Definition |
---|---
 Authtoken | A token that identifies a registered user in the Ordering API. Used to access a user's contact information, favorite products, delivery addresses, recent orders, and more.  
 Basket | The starting point for an order. Analagous to a shopping cart, but contains additional details necessary to fulfill the order, such as delivery information and what time the customer wants their order.  
 Brand  | The restaurant company, ex: Shake Shack. 
 Choice | A selection within a modifier. This term may be used interchangeably with "option."  
 Delivery mode | How the customer will receive the order, ex. delivery, curbside. This term may be used interchangeably with "handoff mode."  
 Dispatch | An Olo feature that allows orders to be delivered to customers via a delivery service provider (DSP). The DSP is most often a third-party service.  
 Guest | An end-user that does not have a user account.  
 Handoff mode | How the customer will receive the order, ex. delivery, curbside. This term may be used interchangeably with "delivery mode."  
 Login provider | A system that grants user access to a brand's ordering integration. Brands may utilize Olo, a SSO login provider (such as a loyalty program, Facebook, or Google), or a combination of providers.  
 Modifier | An option group, ex: "Choose a Dressing". Products and options may have multiple modifiers, or none at all.  
 Option | A selection within a modifier, ex: "Honey Mustard Dressing" or "Add Bacon". This term may be used interchangeably with "choice."  
 Order | A basket that has been submitted to the vendor for processing.  
 Product | An item on the menu.  
 User | An end-user that is registered with a user account.  
 Vendor | An individual restaurant location.  


## Forgot Password - Olo Login Provider

### Summary  

If you are using Olo as a login provider, this tutorial can be used as a guide for implementing a custom forgot password process. This tutorial does not apply to SSO and 3rd party login providers. Implementing a custom forgot password flow will require your Developer Portal project to have access to the [Unauthorized endpoints](#tag/unauthorized). The integration must demonstrate specific security capabilities outlined within each Unauthorized endpoint.

> To enable Unauthorized endpoints, please reach out to your Olo Customer Success Manager for steps on certifying your integration in Sandbox that demonstrates these security capabilities.

Please reference the <a target="_blank" href="https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html">OWASP Forgot Password Cheat Sheet</a> for guidelines on building a secure forgot password process.

### Usage Workflow

1. Verify user identity.
2. Determine user existence and retrieve Olo user GUID.
3. Change the user's password.

#### Verify User Identity

It is advised to verify the identity of the user attempting to reset a password. OWASP has recommended methods of verifying a user, <a target="_blank" href="https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html#methods">Verification Methods</a>.

#### Determine User Existence

Once a user has been verified you can retrieve the Olo user GUID that will be used to change their password.  *Do not use the Olo user GUID value as the URL token to verify a user.*

You can obtain the user's Olo user GUID by calling:

**[Determine User Existence](#operation/DetermineUserExistence)** - *If your API credentials have been granted access to Unauthorized endpoints and if the user exists, an Olo user GUID will be returned.*

> Do not store the Olo user GUID or send it as part of the email verification step. The Olo user GUID is immutable and if compromised can allow changes to a user account without verification.

#### Change the User's Password

With the Olo user GUID you can then reset the user's password by calling:

**[Change Password for Olo User by User Guid](#operation/ChangePasswordforOloUserbyUserGuid)** - *Changes an Olo user's password.*

## Dispatch

Dispatch is a feature in Olo that allows orders to be delivered to customers via third party delivery service providers (DSPs). A Dispatch order placed through the Ordering API will collect bids from DSPs and automatically select the best one based on the restaurant's configuration. Olo's Dispatch network covers over 90% of the US population and is a great way for brands to offer delivery without having to manage their own delivery fleet.

> To learn more about delivery with Olo, please see the [Olo Help Center](https://olosupport.zendesk.com/hc/en-us/articles/115000835946-Dispatch-Overview).

### Quotes

Quotes are essential to the Dispatch ordering process. A quote is simply a bid for a delivery provided by a DSP. Ordering API integration partners do not need to worry about requesting or accepting quotes manually, though understanding the quote retrieval process is helpful for designing customer friendly flows and troubleshooting errors.

#### High Level Quote Retrieval Process

1. When a customer wants to place a Dispatch order, Olo will request quotes from the restaurant's participating DSPs.
  * The quote request includes the pickup address (the restaurant's address as configured in Olo), the delivery address, the order cost, and the desired pickup/delivery time for the order.
2. Each DSP will then return either a quote indicating that they can handle the delivery or a response that they cannot make the delivery.
  * Successful quotes returned to Olo include a delivery fee, an estimated pickup/delivery time, and an expiration time.
3. Olo then compares all successful quotes and chooses the best one based on the restaurant's configuration.
  * Restaurants can choose to set a maximum delivery fee and/or a maximum transit time. Olo will automatically discard any quotes that exceed these limits.
  * If there are multiple quotes that meet the restaurant's criteria, we select one based on the restaurant's preference - cheaper fee or faster delivery.

#### After A Quote is Chosen

The chosen quote is held by Olo and will trigger an update to the following basket fields:

* `customerhandoffcharge`: Delivery fee for the basket.
* `total`: The delivery fee will be factored into the total.
* `leadtimeestimateminutes` and `earliestreadytime`: The delivery time will be factored into both of these fields.
* `deliveryaddress`: Customer's delivery address.
* `allowstip`: Some restaurants do not allow tips for Dispatch and some DSPs do not accept tips, so this field may change after the quote has been selected.

> You can find more documentation about these fields in the basket response model [here](#operation/RetrieveBasket).

#### Accepting a Quote

The quote will be accepted if the customer successfully places their order before the quote expiration. If the quote expires before the customer places their order or if the quote parameters (address, time wanted, order total, etc.) change, Olo will request new quotes and repeat the quote selection process. This will result in one of the following outcomes:

* A DSP is available to make the delivery with the same fee/transit time as before.
  * From the Ordering API integration's perspective, nothing will look different about the basket.
* A DSP is available to make the delivery, but the delivery fee and/or transit time have changed.
  * Ordering API integrations will need to communicate these changes to the customer so that they can decide if they are OK with the new delivery fee/estimated delivery time.
* No DSPs are available to make the delivery for the updated quote request.
  * This could include the following scenarios:
    * The delivery can't be made by the customer's desired time
    * The fee/estimated transit time of the new quotes are not within the restaurant's settings
    * DPSs don't have available drivers to make the delivery.
  * The customer can try setting a later wanted time to resolve the issue, but it is possible that DSPs may not be available for their newly chosen time.

With that in mind, the following sections will walk you through how to implement the various components of Dispatch ordering into your flow.

### Ensuring restaurants are set up to use Dispatch

Brands that have opted in to use Dispatch can toggle support on and off at each location, so you must first verify if the customer's desired restaurant supports Dispatch. To do so, please reference the `supportsdispatch` field on the restaurant response model. This will be returned by any of the restaurant retrieval endpoints listed [here](#tag/retrieveConfiguration).

> Please note that the `candeliver` field on the restaurant response model refers to in-house delivery and not Dispatch. If a given restaurant should have Dispatch enabled but currently does not, please reach out to your Olo Customer Success representative to request that it is enabled.

Additionally, restaurants are able to restrict the available Dispatch ordering hours separately from other handoff modes. If you are retrieving restaurants via the [GET /restaurants/near](#operation/FindNearbyParticipatingRestaurants) endpoint, you can include the query string parameters `calendarstart` and `calendarend` to have restaurant hours included in the response. Otherwise, you will need to send a separate request to [GET /restaurants/{restaurant_id}/calendars](#operation/RetrieveRestaurantOperatingHours). If there are hour ranges with type "dispatch", please reference these. If there are not, please reference the hour ranges with type "business".

### Checking if a restaurant can deliver to the customer's address

Once you have found a Dispatch enabled restaurant, you can verify if a delivery can be made to the customer by sending a request to [POST /restaurants/{restaurant_id}/checkdeliverycoverage](#operation/CheckRestaurantDelivery). If you wish to start the delivery flow by prompting the customer for their address and finding the closest restaurant that can deliver, the following flow should be implemented:

1. Prompt the customer for their address and the time they want their order, either ASAP or a specific time in the future.
2. Geocode the customer's address to get the lat/long coordinates.
3. Send a request to [GET /restaurants/near](#operation/FindNearbyParticipatingRestaurants) passing in the lat/long of the customer's address and a search radius. Pick a search radius that would result in a reasonable delivery time. The brand and their Olo Customer Success representative should be able to provide guidance on a reasonable search radius if you are not sure.
4. Filter the result set from [GET /restaurants/near](#operation/FindNearbyParticipatingRestaurants) to only those that have `supportsdispatch` and `isavailable` set to true.
5. Sort the filtered results by `distance` ascending as restaurants that are closer to the customer's address have a higher likelihood of supporting the delivery.
6. Loop through the closest restaurants, sending a request to [POST /restaurants/{restaurant_id}/checkdeliverycoverage](#operation/CheckRestaurantDelivery). You'll need to provide the customer's address and desired wanted time from step 1.
7. If the response indicates that a delivery can be made for the customer’s address, select the restaurant and proceed. Otherwise, continue to loop through the restaurants.

> Please note that the behavior of the [POST /restaurants/{restaurant_id}/checkdeliverycoverage](#operation/CheckRestaurantDelivery) endpoint can vary depending on how the brand is configured in Olo. A single request sent to this endpoint may trigger multiple quote requests to DSPs, so please do not send excessive requests to this endpoint. If you intend to use this endpoint as part of your ordering flow, please reach out to your Olo Customer Success representative to discuss further.

### Setting a basket to Dispatch

Once a basket has been created, you can set the basket to use the Dispatch handoff method (displayed in the basket `deliverymode` field) as well as set the customer's delivery address in a single call to [PUT /baskets/{basketGuid}/dispatchaddress](#operation/SetBasketDispatchAddress). There are two ways to apply an address to a basket:

* If the customer has previously saved delivery addresses to their account, these can be retrieved via [GET /users/{authtoken}/userdeliveryaddresses](#operation/GetUserDeliveryAddresses). Once the customer has selected their address, simply send the corresponding address id in the `id` field in the request body to [PUT /baskets/{basketGuid}/dispatchaddress](#operation/SetBasketDispatchAddress). The other request body fields can be omitted.
  * If the customer would like to change one of their previously saved addresses, you will need to delete the address and re-add the updated address. To delete a previously saved address, please send a request to [DELETE /users/{authtoken}/userdeliveryaddresses/{addressId}](#operation/DeleteUserDeliveryAddress).
* If the customer does not have any previously saved delivery addresses or the customer does not have a registered account, prompt the customer for the address details and provide these in the address fields. Please do not send the `id` field in the request body. The new address will be automatically saved to the customer's account if they have one.

If the customer wishes to switch the basket to use another handoff method, this can be done by sending a request to [PUT /baskets/{basketGuid}/deliverymode](#operation/SetBasketHandoffMethod). This will also remove the previously set delivery address from the basket.

### Adding products to a Dispatch basket

Adding products to a Dispatch basket is largely the same as any other handoff method, though please make sure to hide, gray out, or mark any products that are unavailable for Dispatch. Each product returned in the [GET /restaurants/{restaurant_id}/menu](#operation/RetrieveRestaurantMenu) response will have an array of `unavailablehandoffmodes`. If this array contains the value "dispatch", then the product cannot be included in a Dispatch order.

### Submitting a Dispatch order

When the customer is ready to checkout, proceed to validate and submit the basket as usual. If the original Dispatch quote has expired, Olo will retrieve an updated quote at this time. If there are any differences in the new quote, you may receive [Olo error num 200](#section/Usage-Basics/Olo-Error-Numbers) with one of the following messages:

* Delivery Fee may have changed. Please reconfirm if you would like to proceed with the revised quote.
* Trip Duration has increased from X to Y mins. Please reconfirm if you would like to proceed with the revised quote.

You should present this error to the customer and allow them to decide if they are OK with the new delivery fee/estimated ready time. If they are, simply resend the request that failed and proceed with the rest of the ordering flow.

### Monitoring the status of a Dispatch delivery

Dispatch delivery status can be monitored in two different ways depending on how the status is being checked and how it is being relayed to the customer:

* [GET /orders/{orderGuid}/deliverystatus](#operation/CheckOrderDispatchStatus) - Returns the current status of all deliveries for the order. This should be used if you wish to display the current delivery status to the customer on an order summary page. This endpoint should only be requested on behalf of a customer, it is not acceptable to poll on a regular frequency.
* [DispatchStatusUpdate webhook](/docs/load/webhooks#operation/dispatchStatusUpdate) - Receive a webhook event via HTTPS whenever the Dispatch delivery status is updated in Olo. This should be used if you wish to build a custom Dispatch order tracker or to provide notifications to the customer when the status changes (ex. in-app push notifications, SMS, etc).

Each delivery will start in the "Pending" status and will progress through the following in order: "PickupInProgress", "DeliveryInProgress", and "Delivered". If the delivery is canceled, the status will be "Canceled".

> Please note that the frequency of Dispatch delivery status updates in Olo can vary depending on the DSP that is handling the delivery. Some provide more frequent notifications while others only notify us of major status events.

### Testing Dispatch orders

In Olo's sandbox and production environments, there is a special mock DSP that brands can use to assist with testing. The mock DSP elicits different responses based on the address zip code and is a great way to verify functionality and test error handling logic. The "Zip Code Behaviors" table at the bottom of the [Dispatch Testing Guide in the Olo Help Center](https://olosupport.zendesk.com/hc/en-us/articles/360028534451-Dispatch-Testing-Guide) explains the various scenarios that can be tested.

Please contact Olo Help if you wish to test with the mock DSP.

### Dispatch Error Handling

There are several common Dispatch related errors you may run into, all of which will return [Olo error num 200](#section/Usage-Basics/Olo-Error-Numbers). Below is a table outlining the various error scenarios and whether the messages are [customizable](https://olosupport.zendesk.com/hc/en-us/articles/360001561072-Customizing-Dispatch-Error-Messages-) or not:

| Customizable? | Message | Resolution |
|---|---|---|
| Yes | Only orders above %MinDeliveryAmount% can be delivered. Your order was not placed and you will not be billed. | The customer will need to either add additional items to their order to meet the minimum delivery amount or choose a different handoff mode. |
| Yes | Only orders below %MaxDeliveryAmount% can be delivered. Your order was not placed and you will not be billed. | The customer will need to either remove items to their order to stay under the maximum delivery amount or choose a different handoff mode. |
| No | A valid phone number is required to process this order for delivery. Please update the contact information, and try again. | The customer will need to provide a valid number to proceed. |
| Yes | No delivery services are available to handle this order at this time. | The customer may be able to place their order at a later time or may need to choose a different handoff mode. |
| No | Delivery Fee may have changed. Please reconfirm if you would like to proceed with the revised quote. | Display the message to the customer along with the updated delivery fee. If they are ok with the updated fee, then proceed with the order. |
| No | Trip Duration has increased from X to Y mins. Please reconfirm if you would like to proceed with the revised quote. | Display the message to the customer along with the updated estimated time. If they are ok with the updated time, then proceed with the order. |

### Sample Dispatch ordering flow

The following flow illustrates how a simple ASAP Dispatch order could be placed for a guest user without a registered account. Depending on your requirements, this flow may need to be altered to support additional features like advance orders, user account registration/login, loyalty, etc.

1. Customer enters address to find a restaurant that can deliver to them.
  * [GET /restaurants/near](#operation/FindNearbyParticipatingRestaurants) - Find nearby restaurants
  * [POST /restaurants/{restaurant_id}/checkdeliverycoverage](#operation/CheckRestaurantDelivery) - Check if restaurant can deliver to customer's address
    ```
    {
      "handoffmode": "dispatch",
      "timewantedmode": "asap",
      "street": "26 Broadway",
      "city": "New York",
      "zipcode": "10004"
    }
    ```
2. Customer confirms restaurant and starts ordering process
  * [POST /baskets/create](#operation/CreateBasket) - Create basket
    ```
    {
      "vendorid": 12345
    }
    ```
  * [PUT /baskets/{basket_id}/dispatchaddress](#operation/SetBasketDispatchAddress) - Set Dispatch address
    ```
    {
      "streetaddress": "26 Broadway",
      "city": "New York",
      "zipcode": "10004",
      "phonenumber": "5055551234"
    }
    ```
3. Customer looks at menu and adds products to shopping cart
  * [GET /restaurants/{restaurant_id}/menu](#operation/RetrieveRestaurantMenu) - Retrieve restaurant menu
  * [POST /baskets/{basket_id}/products/batch](#operation/AddMultipleProductstoBasket) - Add multiple products to basket
    ```
    {
      "products": [
        {
          "productid": 123,
          "quantity": 1
        },
        {
          "productid": 456,
          "quantity": 2
        }
      ]
    }
    ```
4. Customer proceeds to checkout
  * [POST /baskets/{basket_id}/validate](#operation/ValidateBasketagainstthePOS) - Validate basket
5. Customer enters payment information and checks out
  * [POST /baskets/{basket_id}/submit](#operation/SubmitOrderwithSinglePayment) - Submit basket
    ```
    {
      "usertype": "guest",
      "firstname": "Ronald",
      "lastname": "Idaho",
      "emailaddress": "ron.idaho@olo.com",
      "contactnumber": "5055551234",
      "cardnumber": "4111111111111111",
      "expiryyear": 2025,
      "expirymonth": 10,
      "cvv": "123",
      "zip": "10004"
    }
    ```
6. Customer monitors order and delivery status
  * [GET /orders/{orderGuid}](#operation/CheckOrderStatus) - Check order status
  * [GET /orders/{orderGuid}/deliverystatus](#operation/CheckOrderDispatchStatus) - Check order Dispatch status

## Credit Card Submission Frame

### Summary  
  
Olo exposes a PCI scope management solution called *Olo Credit Card Submission Frame (CCSF)* that allows 3rd party Ordering API consumers to avoid submitting Credit Card PAN and CVV information directly through their servers to ours when submitting an order. The CCSF can be used to replace the [Submit Order with Single Payment](#operation/SubmitOrderwithSinglePayment) or [Submit Order with Multiple Payments](#operation/SubmitOrderwithMultiplePayments) in your workflow, leaving the rest of your calls as-is.

Prior to using CCSF, contact your Customer Success Manager (CSM) to retrieve a Brand Access Id. This id allows you to bootstrap CCSF on your website. You will need to know the domains you wish to host CCSF on when setting up the Brand Access Id.

### Usage Workflow

1. Request a CCSF Payment Token from the Ordering API.
2. Using Olo's CCSF JavaScript library, render the CCSF iFrame on your ordering site.
3. When ready to submit the basket, use the CCSF JavaScript library to submit the basket through the iFrame.
4. Process the response.

#### Request CCSF Payment Token

This can be done by calling the Request [CCSF Payment Token endpoint](#operation/request-ccsf-payment-token).

#### Bootstrap CCSF Payment Frame

When loading your checkout page, make sure to include a reference to the CCSF JavaScript library:

```
//Sandbox
<script src="https://olocdnsandbox.s3.amazonaws.com/web-client/checkout-web-client/2.3.1/checkout.js"></script>

//Production
<script src="https://static.olocdn.net/web-client/checkout-web-client/2.3.1/checkout.js"></script>
```

On page load, initialize a new instance of the CCSF frame, where `cardElement` and `cvvElement` represent the class names for the HTML elements you want to inject the iFrames into:

```
var checkoutFrame = new Olo.CheckoutFrame({
  cardElement: "credit-card-info-div",
  cvvElement: "cvv-info-div"
});
```

After creating the frames, once you're ready to display them, call the initialize function with the Brand Access ID supplied by Olo, and a `basketGuid` for an existing basket.

```
checkoutFrame.initialize({
  brandAccessId: "_d2maVsTBJXb7VygDG1M_J1oIyJ5itr8",
  basketGuid: "6E6C13EB-C128-A539-A911-EEE25A024BA2"
});
```

You should now see the credit card form fields rendered in the html-area you supplied to the function.

**Adding Custom Styles**

To apply custom CSS to the card and CVV fields, use the following format when calling the initialize function on the `checkoutFrame`.

```
checkoutFrame.initialize({
  brandAccessId: "_d2maVsTBJXb7VygDG1M_J1oIyJ5itr8",
  basketGuid: "6E6C13EB-C128-A539-A911-EEE25A024BA2",
  styles: {
    "cardNumber": "border-color: green; border-bottom: 5px solid red;",
    "cvv": "border-color: green;"
  },
  cardNumber: {
    placeholder: "Credit Card"
  },
  cvv: {
   placeholder: "Cvv"
 }
});
```

Use the `cardNumber` property on the `styles` object to apply styles for the Credit Card Number field, and the `cvv` property to apply styles for the CVV field. Separate each CSS property "name:value" pair. See below for the full list of currently acceptable CSS properties. Other property names will be ignored. 

**Updating Styles**

Should you want to restyle the frames after the initial load, you can use the `setStyles` function.  

```
checkoutFrame.setStyles({
  "cardNumber": "border-color: green; border-bottom: 5px solid red;",
  "cvv": "border-color: green;"
});
```

#### Submit the Basket

> It is recommended that you complete a [Basket Validation call](#operation/ValidateBasketagainstthePOS) before this step, and proceed when you have validated the basket successfully.

When ready for checkout, gather the checkout information and pass along to the `submit` method on the `checkoutFrame` you created. The CCSF frame will then initiate an AJAX request to the checkout domain to submit the order.

```
checkoutFrame.submit({
  id: "",
  accessToken: "lkjnsadf02nkjnsadf9o8h2ij83kar9=",
  firstName: "John",
  lastName: "Smith",
  emailAddress: "john.smith@gmail.com",
  userType: "guest",

  //… Other fields omitted for brevity, see below for full field list.
});
```

#### Respond to Events

Once submitted, you can listen for and respond to events to usher your user through the rest of the ordering process.  

**Events**

`success`  
If an order is successfully submitted, Olo will emit a `success` event with the contents of the order as the argument to a callback. Full details of the order object provided below:

```
checkoutFrame.on("success", function (order) {
  console.log(order.id);
  // full order field list below
});
```

`error`  
When an order fails to submit for any reason, Olo will emit an `error` event. The argument to the failure callback is an array of error objects with the following shape:

```
{
  code: 234,
  description: 'First name is required.'
}
```


```
checkoutFrame.on("error", function (errors) {
  errors.forEach(error => {
    console.log(error.code);
    console.log(error.description);
  });
});
```

Error codes mirror the codes specified by our Ordering API in the [Olo Errors Numbers](#section/Usage-Basics/Olo-Error-Numbers) documentation.

`ready`  
Once the iFrames have finished loading, Olo emits a `ready` event with a parameter-less constructor.

```
checkoutFrame.on("ready", function (result) {
  console.log(result);
});
```

`focus`  
When a user has set focus on either the card number or `cvv` field, we'll emit a `focus` event to allow for custom styling or separate event handling:

```
checkoutFrame.on("focus", function (evt) {
  console.log(evt);
});
```

The focus event has the following shape. The value for `field` will be either `cardNumber` or `cvv`.

```
{
  "field": "cardNumber"
}
```

### Basket Submission Fields

#### Basket

| Name | Description |
| --- | --- |
| id | Unique Basket GUID |
| accessToken | GUID Token received from the Ordering API endpoint prior to loading the iframe. |
| firstName | First Name of the customer. | 
| lastName | Last Name of the customer. |
| emailAddress | Email Address |
| contactNumber | 11 digit user phone number |
| reference | User external reference |
| guestOptIn | Guest opt in to extra marketing |
| orderRef | Order reference in the calling system. |
| billingAccounts | An array of billing accounts (see "Billing Accounts" table below) |

#### Billing Accounts

| Name | Description |
| --- | --- |
| amount | Total amount to apply to this billing account. number.
| tipPortion | Portion of amount to apply towards tip. number.
| billingMethod | "cash", "creditcard", "storedvalue"
| billingAccountId | Billing Account Id if using a card on file.
| billingSchemeId | Billing Scheme Id if using storedvalue.
| billingFields | An array of billing fields (see "Billing Fields" table below)
| streetAddress | Billing Street Address
| streetAddress2 | Billing Street Address Line 2
| city | Billing City
| state | Billing State
| zip | Billing Zip
| country | Billing Country, possible values "US" and "CA"
| expiryMonth | Expiration Month
| expiryYear | Expiration Year
| saveOnFile | If a logged in user wants to save the card on file.

#### Billing Fields  

"Name:value" pairs generally used when submitting a gift card as a form of payment.  

| Name | Description |
| ----------- | ----------- |
| name | Description of the field. Usually "number" or "pin". 
| value | String value for the field described by the "name" property.   

For a more detailed description of field necessity and limits, see the [Basket Submit endpoint](#operation/SubmitOrderwithSinglePayment).

### Example Submission Request

```
{
  id: "0e62426c-d579-4df5-be66-fe395d44c3f8",
  accessToken: "e-qfElHsZDMnC4E-wXtOih3FgiSmo0vn",
  billingAccounts: [
  {
      amount: 2.10,
      billingMethod: "creditcard",
      city: "New York",
      expiryMonth: "1",
      expiryYear: "2024",
      state: "NY",
      streetAddress: "26 Broadway",
      streetAddress2: "",
      zip: "10004",
      tipPortion: 0
  },
  {
      amount: 0.10,
      billingMethod: "cash",
      tipPortion: 0
  },
  {
      amount: 0.29,
      billingFields: [
      {
        name: "number",
        value: "6000000000000123"
      },
      {
        name: "pin",
        value: "123"
      }],
      billingMethod: "storedvalue",
      billingSchemeId: "1",
      tipPortion: 0
   }],
  contactNumber: "5555551212",
  emailAddress: "john.smith@olo.com",
  firstName: "John",
  guestOptIn: false,
  lastName: "Smith",
  userType: "guest"
}
```

### Example Submission Response

```
{
  arrivalstatus: null,
  contextualpricing: null,
  customerhandoffcharge: 0,
  customfields: [],
  deliveryaddress: null,
  deliverymode: "curbside",
  discount: 0,
  discounts: [],
  fees: [],
  id: "aee03ffa-1b72-eb11-a98e-125d37a10dca",
  iseditable: false,
  mode: "orderahead",
  oloid: "12345",
  orderref: "q_wpzyr8jUuPANYJAnFGoA",
  posreferenceresponse: "",
  products: [
    {
      choices: [],
      name: "Coffee Special",
      quantity: 1,
      specialinstructions: "",
      totalcost: 0.99
    }
  ],
  readytime: "20210218 15:03",
  salestax: 0,
  status: "In Progress",
  subtotal: 0.99,
  taxes: [
    {
      label: "Estimated Tax",
      tax: 0
    }
  ],
  timemode: "asap",
  timeplaced: "20210218 15:03",
  tip: 0,
  total: 0.99,
  totalfees: 0,
  vendorextref: null,
  vendorid: 9525,
  vendorname: "Vendor Name"
}
```

### Supported CSS Properties

```
background-color
border-bottom-color
border-bottom
border-bottom-left-radius
border-bottom-right-radius
border-bottom-style
border-bottom-width
border-image-outset
border-image-repeat
border-image-slice
border-image-source
border-image-width
border-left-color
border-left-style
border-left-width
border-right-color
border-right-style
border-right-width
border-top-color
border-top-left-radius
border-top-right-radius
border-top-style
border-top-width
color
display
font-family
font-size
font-style
font-weight
height
letter-spacing
line-height
margin
margin-bottom
margin-left
margin-right
margin-top
overflow-x
overflow-y
padding
padding-left
padding-right
padding-top
padding-bottom
text-transform
width
```

### Supported Browser Versions

| Browser | macOS | Windows | Android | iOS 
| ------- | ------- | ------- | ------- | ------- |
| Chrome | All | All | All | All
| Firefox | All | All | All | All
| Edge | All | All | All | All
| Safari | All | Not Supported | N/A | All
| Internet Explorer | Not Supported | 10 | N/A | N/A

## Customer Arrival Notifications

[Customer arrival notifications](#operation/SubmitCustomerArrivalNotification) allow a customer who has placed an order to signal to the restaurant that they have arrived, so that a restaurant employee can bring the order out to the customer. The primary use case for the feature is for curbside orders, but it is not limited to curbside handoff specifically, and can be utilized for other handoff modes such as pickup as well.

The notifications show up on the Expo device. After handing the order to the customer, the restaurant employee can mark the order as delivered using Expo. Ensure the brand is using Olo Expo prior to implementation.

### Implementation

First, check the order status. If the order is ineligible to use [Arrival Notifications](#operation/SubmitCustomerArrivalNotification), the arrivalstatus will be null. If the order is eligible, the arrivalstatus will be 

* **Order Placed**: the order has been placed and is eligible for arrival notifications
* **Arrived**: the customer has indicated that they have arrived
* **Picked Up**: the restaurant employee has indicated that the food has been handed off

When the customer signals their intent to notify the restaurant of arrival:

[POST /orders/{orderGuid}/arrival](#operation/SubmitCustomerArrivalNotification)

The request body can include an optional message string with a maximum of 128 characters. For example, if you wish to allow the guest to send their parking spot number to the recipient inside the restaurant.

The [/arrival](#operation/SubmitCustomerArrivalNotification) endpoint returns an OrderStatus object with the arrivalstatus set to the current status.

Prior to testing the feature, the brand’s Customer Success contact will have to enable the desired handoff method (e.g. curbside pickup, pickup) for the desired restaurant. At that point, orders placed for the enabled handoff methods will become eligible for Arrival Notifications.

# Changelog

**12/13/2021**

#### Coupon Information for Order Export

Updated Order Exports to include coupon information including coupon code, description and discounted amount. Details on each field can be found in the [Export FAQ](#section/FAQ/Export) section. 

**How to Use**: The new fields `couponCode`, `description` and `amount` will be returned with each Order Export batch file downloaded from the [Retrieve Download Redirect for Order Batch](#operation/RetrieveDownloadRedirectforOrderBatch) endpoint.

**Action Required**: Any system processing Order Export batches will need to take into account the new fields if you would like to track coupon information.

**11/15/2021**

* **Documentation Update**: Added a new [Quick Start Guide](#section/Quick-Start-Guide) to provide a high-level overview of the Ordering API.

**11/08/2021**

* **Documentation Update**: Added the attribute `containsAlcohol` to the `Category` and the attribute `alcoholStatus` to the `Product` in order to get back the appropriate alcohol status in the [Menu](#section/RetrieveRestaurantMenu)

**10/28/2021**

* **Documentation Update**: Fixed an incorrect link in the [Basket FAQ](#section/FAQ/Basket) question "How can Dispatch be activated on a particular restaurant?"

**10/22/2021**

* **Documentation Update**: Updated description of [Cancel Order](#operation/CancelOrder). Removed cancellation dependency on `iseditable` field.

**10/19/2021**

* **Documentation Update**: Marked `isdisabled` as deprecated within the [Vendor Export XSD](#operation/DownloadRestaurantMenuData). This value does not accurately represent the product's availability.

**10/15/2021**

* **Documentation Update**: Fixed descriptions of ordering provider `name` and `slug` fields for **Order export field descriptions** within the [Export FAQ](#section/FAQ/Export) section.

* **Documentation Update**: Updated formatting of expected `arrivalstatus` values for [Customer Arrival Notifications tutorial](#section/Tutorials/Customer-Arrival-Notifications) and within the response of the following endpoints:
  * [Submit Customer Arrival Notification](#operation/SubmitCustomerArrivalNotification)
  * [Submit Manual Fire Order by External Reference](#operation/SubmitManualFireOrderbyExternalReference)
  * [Submit Manual Fire Order](#operation/SubmitManualFireOrder)
  * [Check Order Status](#operation/CheckOrderStatus)
  * [Check Order Status by External Reference](#operation/CheckOrderStatusbyExternalReference)
  * [Cancel Order](#operation/CancelOrder)
  * [Retrieve User Recent Orders](#operation/RetrieveUserRecentOrders)
  * [Retrieve User Recent Orders by External Reference](#operation/RetrieveUserRecentOrdersbyExternalReference)

* **Documentation Update**: Updated [Add Multiple Products to Basket](#operation/AddMultipleProductstoBasket) endpoint. Within the response body, `optionid` within `errors` array is nullable.

**10/8/2021**

* **Documentation Update**: The `"prepaid"` billing method is not supported by the [Submit Order with Multiple Payments](#operation/SubmitOrderwithMultiplePayments) endpoint and has been removed.
* **Documentation Update**: "Legacy" properties have been marked as `Deprecated`.

**10/4/2021**

#### Include 86'd Menu Items

Added ability to include 86'd menu items in menu-related APIs response.  This now allows developers to return items that are currently unavailable (i.e. 86'd). Common use cases would include items that are currently out of stock at a location.

**How to Use**: A new field `isdisabled` and a new query string parameter of `includedisabled` have been added to the following endpoints:

* [Retrieve Restaurant Menu](#operation/RetrieveRestaurantMenu)
* [Retrieve Product Modifiers and Options](#operation/RetrieveProductModifiersandOptions)
* [Retrieve Top-Level Product Modifiers and Options](#operation/RetrieveToplevelProductModifiersandOptions)
* [Retrieve Option Children](#operation/RetrieveOptionChildren)

**Action Required**: No action is required, the default behavior will be the same unless the query parameter is used to include 86'd items in the response.

**9/2/2021**

* Updated Credit Card Submission Frame version to v2.3.1.

**8/26/2021**

* Updated Credit Card Submission Frame version to v2.3.0.
* Corrected the error shape example to be an array.

**7/30/2021**

* Added OrderDonation
* Updated ResponseOrderStatus to include donations. Donations is a list of OrderDonation

**7/13/2021**

* Added a new [Dispatch tutorial](#section/Tutorials/Dispatch) to assist partners with placing Dispatch orders via the Ordering API.

**6/29/2021**

* Endpoints that retrieve an order will now return a more accurate error message for invalid order ids.

**6/16/2021**

* Added a new `billingmethod` option called "creditcardtoken".
* Updated [Basket Submit Request](#operation/SubmitOrderwithSinglePayment) to accept `token`, `cardtype`, and `cardlastfour` properties. These properties are required when the `billingmethod` is set to "creditcardtoken".
* Updated the `billingaccounts` property on [Submit Order with Multiple Payments](#operation/SubmitOrderwithMultiplePayments) to accept `token`, `cardtype`, and `cardlastfour` properties. These properties are required when the `billingmethod` is set to "creditcardtoken".
* Updated [Billing Options](#tag/billingOptions) to include `supportstokens`. This property indicates whether the billing scheme supports payment tokens.

**6/8/2021**

* Updated [Credit Card Submission Frame](#section/Tutorials/Credit-Card-Submission-Frame) version to 2.2.0, which includes `basketGuid` argument for `.initialize()`.

**5/25/2021**

* Updated Ordering error code 3 with the accurate information for clarity.

**5/4/2021**
* Updated [Credit Card Submission Frame](#section/Tutorials/Credit-Card-Submission-Frame) tutorial; separate 'validate' function no longer in use

**4/30/2021**

* Updated recommendations for delivery address apartment/suite numbers. These should be provided in the `building` request field rather than part of the `streetaddress` field.
* Marked `posreferenceresponse` field on basket validation response model and order status response model as deprecated. This field will never have a value assigned.

**4/20/2021**

* Updated `readytime` field on [basket validation endpoint](#operation/ValidateBasketagainstthePOS) to mention ASAP Order Throttling feature.

**3/16/2021**

* Added Vendor Export XSD document to description in [Vendor Export](#operation/DownloadRestaurantMenuData) section.

**3/15/2021**

* Added [Forgot Password Tutorial](#section/Tutorials/Forgot-Password-Olo-Login-Provider).

**3/5/2021**

* Updated [Restaurant Response](#operation/FindNearbyParticipatingRestaurants) to include `supportedarrivalmessagehandoffmodes`. 
  This property contains an array of handoff modes that have been configured to accept a message when sending an arrival notification.

**3/2/2021**

* Updated [Basket Submit Request](#operation/SubmitOrderwithSinglePayment) to accept an optional `receivinguser` property.

**2/24/2021**

* Updated [Credit Card Submission Frame](#section/Tutorials/Credit-Card-Submission-Frame) version to 2.0.0.

**2/19/2021**

* Updated [Credit Card Submission Frame](#section/Tutorials/Credit-Card-Submission-Frame) submission response example.

**1/13/2021**

* Updated order `oloid` field to clarify Olo Order Ids non-sequential 64-bit integers. Please reference [Order FAQ - Are Olo Order Ids provisioned in sequential order?](#section/FAQ/Orders) for more information.
* Added `calendarstart` and `calendarend` query parameters to [Find Nearby Participating Restaurants](#operation/FindNearbyParticipatingRestaurants) and [Find Nearby Participating Restaurants with In-House Delivery](#operation/FindNearbyParticipatingRestaurantswithInHouseDelivery) endpoints, which when provided will return a `calendars` array for each restaurant.

**1/12/2021**

* Made some adjustments to the [Credit Card Submission Frame](#section/Tutorials/Credit-Card-Submission-Frame) tutorial.
* Minimum password length will be increased from 7 to 8 for new passwords on June 30, 2021. This affects [Create Olo User](#operation/CreateOloUser), [Create Olo User from Guest Order](#operation/CreateOloUserfromGuestOrder), [Authenticate Olo User](#operation/AuthenticateOloUser), [Change Password for Olo User](#operation/ChangePasswordforOloUser) and [Change Password for Olo User by User Guid](#operation/ChangePasswordforOloUserbyUserGuid).
* The [/restaurants](#operation/RetrieveAllParticipatingRestaurants) endpoint has been deprecated. Integrations should either use the scoped restaurant search endpoints (e.g. retrieving restaurants near a location) or Vendor Exports if you need a full list of restaurants for a brand.

**12/22/2020**

* Add Credit Card Submission Frame documentation. This allows partners to mitigate their PCI scope for server integrations.

**12/17/2020**

* Added new HTTP header requirements for custom website Ordering API integrations. This is required for all sites by June 30, 2021.
* Added details on the optional JavaScript bot management for custom website Ordering API integrations. This is optional but may be required if our security team detects that your integration is sending a significant amount of API traffic identified as a security risk.
* Added details on the optional SDK bot management for mobile app Ordering API integrations. This is optional but may be required if our security team detects that your integration is sending a significant amount of API traffic identified as a security risk.

**12/9/2020**

* Created new changelog section.

# Contact Us

**Official Developer Support Hours:**

**M-F, 9am - 8:00pm ET (6am - 5:00pm PT)**

 After you've thoroughly reviewed all of our Ordering API documentation, please feel free to get in touch with Olo's responsive Developer Support team. Your engineering team can reach us via email at developersupport@olo.com. 

Lastly, for all questions related to restaurant and/or menu configuration, or other miscellaneous questions, please reach out to our Olo Help team at help@olo.com.

When submitting support tickets, please always remember to include the detail necessary to help us reproduce the error. In particular, please include as much of the following information as possible:

* **Error Message/Number:** These can be found within the response to your Olo API request. Please include both the message and the number included in the "num" field.
* **Environment:** Which Olo environment the request was made in, i.e. Sandbox, Production, or a specific ODE (On-Demand Environment).
* **Endpoint:** The specific Olo API endpoint that was called, e.g. /restaurants. For security purposes, please remember to omit any full API credentials.
* **Basket ID:** For requests that require a basket id, please send it to us! It helps us search our logs significantly faster and will result in much quicker ticket responses.
* **Request Body (JSON):** If available, this helps us attempt to reproduce the error you are seeing more precisely. Please remember to omit any non-testing PII.
* **Project Name:** The name of the Developer Portal project that contains the API credentials you are using.
* **Other:** Any additional details regarding the context of the request that you feel may help us investigate and/or reproduce the problem more quickly.

We will do our best to address your question(s) as soon as possible! Please allow for a 24-hour response time within the business week (note: not an SLA) for most incoming technical questions. Tickets better suited for other Olo support teams will be reassigned.

# Authentication

To successfully submit requests to Olo's Ordering API they must be properly authorized or they will result in error. There are different authorization requirements depending on which API features you need access to and the platform(s) from which you are sending API requests. How your Developer Portal project is configured, as guided by the information you provided to our Customer Success team prior to gaining access, will determine the kind of authorization our API expects from you. There are two modes of authorization that are possible:

* **Client Authorization (a.k.a. client-to-server):** Olo expects all incoming requests to be originating directly from a mobile device -- i.e. not proxied through a server -- each with its own unique IP address. Developer Portal projects requiring this kind of authorization will generally have "Mobile Ordering" within their name. Utilizes an API key for authorization.
* **Server Authorization (a.k.a. server-to-server):**  Olo expects all incoming requests to be originating from one or more servers. Developer Portal projects with ordering access that require this kind of authorization will generally have "Ordering" within their name. Also required for Order Exports, Vendor Exports, and other specialized API functionality (listed below). Utilizes a calculated OloSignature in a header for authorization.

> **Important!** When creating, modifying, and submitting baskets, all API calls must come from the same API credentials. More specifically, the API credentials used to create a basket must be the only credentials used to perform all operations on that basket, including submission. Attempts to mix API credentials in this way can result in serious integration problems for brands. For example, baskets may be profiled as fraudulent and blocked from submission. Using a single key for a given basket provides Olo with the best ability to profile baskets and helps to ensure stability and reliability for brands. If you have questions pertaining to PCI compliance, please reference the Security section below.

The sections below outline the details of when each authorization method should be used as well as how to successfully send API requests with each. **Please be absolutely sure you provided Olo accurate information about how your project will be sending Ordering API requests or you risk having those requests blocked and flagged as a fraud risk.**

## Client Authorization (Client-to-Server)

> Please be sure to follow the security requirements [outlined here](#section/Security/Mobile-Apps).

This authorization method is only to be used for projects where all incoming API requests will originate *directly* from a mobile device with an Android/iOS app -- i.e. not proxied through a server -- each with its own unique IP address. This authorization method requires the use of an API key, which can be found within the 'API Keys' tab of your Developer Portal project.

### via header

Example Sandbox API URL:

https://ordering.api.olosandbox.com/v1.1/restaurants

Example of how to include the API key via an "Authorization" header:

`Authorization: OloKey {ApiKey}`

> The key of the header should be "Authorization" and its value should be "OloKey {ApiKey}" -- this should be without quotes; \{ApiKey\} is a token placeholder for your actual API key value.

## Server Authorization (Server-to-Server)

> For custom websites, please be sure to follow the security requirements [outlined here](#section/Security/Websites).

This authorization method is to be used for projects where all incoming API requests will originate from one or more servers. Generally used for non-mobile Ordering projects such as websites. Also required to utilize the following functions (and related endpoints) within the Olo API:

* Order Exports
* Vendor Exports
* User Recent Orders (via User Reference)
* Platform Transfer
* Prepaid Order Submissions

This authorization method can be used either with an API key or by utilizing a Client ID/Client Secret combination, both of which can be found within the 'API Keys' tab of your Developer Portal project, although only the Project Owner can view the latter combo.

**Important!** When sending API requests, you must also pass along the end-user's IP address in the **X-Forwarded-For** HTTP header. Omitting this step may put your API requests at risk of being blocked and flagged as a fraud risk. This step is only required for Server Authorization, not Client Authorization.

### via headers

Example Sandbox API URL:

https://ordering.api.olosandbox.com/v1.1/restaurants

Example of how to include the required "Authorization" and "Date" headers:

`Authorization: OloSignature {ClientId}:{Signature}`

`Date: Wed, 28 Dec 2016 15:27:30 GMT`

The Signature is a calculated hash value that utilizes the Client ID and Client Secret for authorization rather than an API key (see below for details on how to generate it). The Client ID and Secret can both be found in the 'API Keys' tab of your Developer Portal project, although the Secret can only be seen by the owner of your project.

We will enforce that the timestamp falls within +/- 5 minutes from our server time. The timestamp must be formatted exactly as seen here (RFC1123 format). 

> The implementation of RFC1123 that our API uses requires that the full 4-digits must be used for the year and that 2-digits must be used for the day (i.e. a preceding zero is required when the day would otherwise be a single digit).

> The keys of the headers should be "Authorization" and "Date" with the values "OloSignature {ClientId}:{Signature}" and the formatted date, respectively. The values should not be contained within quotes; {ClientId} and {Signature} are both token placeholders.

*Pseudocode for determining the Signature:*

```
stringToSign = string.Join("\n", 
                            ClientId, 
                            HttpVerb,
                            HttpContentType, 
                            Base64(SHA256(HttpBody)), 
                            UriPathAndQuery, 
                            Timestamp)
signature = Base64(HMAC-SHA256(ClientSecret, UTF8(stringToSign)))
```

The Client ID and Client Secret are always associated with a related API key and its respective environment and client platform setting.

If there is no content type or body for the request (such as for a GET request), send in an empty string for both.

*Example Postman pre-request script to calculate the signature:*

```
function replaceVariables(templateString) {
    let tokens = _.uniq(templateString.match(/{{\w*}}/g))
    
    _.forEach(tokens, t => {
       let variable = t.replace(/[{}]/g, '') 
       let value = environment[variable] || globals[variable]
       templateString = templateString.replace(new RegExp(t,'g'), value)
    });
    
    return templateString
}

const clientId = postman.getEnvironmentVariable('ClientId');
const clientSecret = postman.getEnvironmentVariable('ClientSecret');
const method = request.method.toUpperCase()
const contentType = request.headers['content-type']
const requestDate = new Date().toGMTString()
// have to do manual substitution; variables don't get substituted by Postman until after this script runs
const pathAndQuery = replaceVariables(request.url.trim()).replace(/https?:\/{2}[^\/]+\//i, '/')
const payload = _.isEmpty(request.data) ? '' : replaceVariables(request.data);
const body = CryptoJS.SHA256(payload).toString(CryptoJS.enc.Base64);
 
const stringToSign = [clientId, method, contentType, 
                      body, pathAndQuery, requestDate].join('\n');
 
console.log(`string to sign:\n${stringToSign}`);
const signature = CryptoJS.HmacSHA256(stringToSign, clientSecret).toString(CryptoJS.enc.Base64);
postman.setEnvironmentVariable('signature', signature);
postman.setEnvironmentVariable('date', requestDate);
```

Please see section below ([Creating a Signed Authorization Header](#section/Authentication/Creating-a-Signed-Authorization-Header)) for more information on creating an SHA256 HMAC signature for your Server Authorization header.

## Creating a Signed Authorization Header

> This section only applies to Server Authorization (see above section).

Olo requires the signing of each API request using a base64-encoded HMAC SHA256 signature contained within an Authorization header, along with an RFC1123-format Date header for the request. This section will provide a general walkthrough for creating a request with these headers with code samples in C#, PHP, and Java to cover some of the differences between each language.

> The implementation of RFC1123 that our API uses requires that the full 4-digits must be used for the year and that 2-digits must be used for the day (i.e. a preceding zero is required when the day would otherwise be a single digit).

### Creating the message to be signed

In order to generate the signature to be contained within the Authorization header, you'll need to put together the information for the message that will be hashed into the signature. The message to be signed will include a newline* separated list of values:

```
ClientId
HttpVerb
ContentType
Base64(SHA256(HttpBody))
PathAndQuery
Timestamp
```

> Newlines in the above message must be the character `\n` and not `\r\n`, or any other variation. Make sure, if your environment creates carriage returns using `\r\n` that you are replacing them in your message with only the `\n` character to prevent issues with the Ordering API interpreting your authorization signature.

> The below examples use a vendorId of 1234, be sure to use a valid vendorId for your environment. Executing a GET request on `/restaurants/` will return a list of valid vendorIds for your environment.

**C#**

```
var clientId = Environment.GetEnvironmentVariable("clientId");
var httpVerb = "POST";
var contentType = "application/json; charset=utf-8"; // see note later about content types
var httpBody = "{\"vendorid\":1234}";
var pathAndQuery = "/v1.1/baskets/create/";
var timeStamp = DateTime.UtcNow.ToString(DateTimeFormatInfo.InvariantInfo.RFC1123Pattern);

var messageToSign = CreateMessageToSign(
    clientId,
    httpVerb,
    contentType,
    httpBody,
    pathAndQuery,
    timeStamp);

...

private string CreateMessageToSign(
    string clientId,
    string httpVerb,
    string contentType,
    string httpBody,
    string pathAndQuery,
    string timeStamp)
{
    return string.Join("\n",
        clientId,
        httpVerb,
        contentType,
        HashRequestBody(httpBody), // body content gets SHA256 hashed
        pathAndQuery,
        timeStamp);
}

private string HashRequestBody(string body)
{
    using (var sha256Hasher = SHA256.Create())
    {
        var bytes = Encoding.UTF8.GetBytes(body);
        var hashBytes = sha256Hasher.ComputeHash(bytes);
        return Convert.ToBase64String(hashBytes);
    }
}
```

**PHP**

```
$clientId = getenv("clientId");
$pathAndQuery = "/v1.1/baskets/create/";
$contentType = "application/json; charset=utf-8";
$httpMethod = "POST";

$stringBody = json_encode(array('vendorid' => 829));
$stringBodyBytes = utf8_encode($stringBody);
$hashedBody = base64_encode(hash('sha256', $stringBodyBytes, true));

$timestamp = gmdate("D, d M Y H:i:s T"); // see note later about RFC1123 timestamp

$messageToSign = "$clientId\n$httpMethod\n$contentType\n$hashedBody\n$pathAndQuery\n$timestamp";
```

**Java**

```
String clientId = System.getenv("clientId");
String requestMethod = "POST";
String contentType = ContentType.APPLICATION_JSON.toString();
String hashedBody = HashMessageBody("{\"vendorid\":1234}");
String pathAndQuery = "/v1.1/baskets/create/";
String timeStamp = String timeStamp = DateTimeFormatter.ofPattern("EEE, dd MMM yyyy HH:mm:ss O").format(ZonedDateTime.now(ZoneOffset.UTC));

String messageToSign = CreateMessageToSign(
    clientId, 
    pathAndQuery, 
    requestMethod, 
    contentType, 
    hashedBody, 
    timeStamp);
...

private String HashRequestBody(String body) {
    String hashedBody = "";
    try {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        hashedBody = Base64.getEncoder().encodeToString(digest.digest(body.getBytes()));     
    } catch (NoSuchAlgorithmException e) {
        e.printStackTrace();
    }
    return hashedBody;
}

private String CreateMessageToSign(
    String clientId, 
    String pathAndQuery, 
    String requestMethod, 
    String contentType,
    String hashedBody, 
    String timeStamp) {
        String messageToSign = String.join("\n", 
            new String[] {
                clientId, 
                requestMethod, 
                contentType, 
                hashedBody, 
                pathAndQuery, 
                timeStamp});
        return messageToSign;
}
```

**Ruby**

```
timestamp = Time.now.httpdate
vendor_id = "1234"
path_and_query = "/v1.1/baskets/create/"
method = "POST"
body = "{\"vendorid\":#{vendor_id}}"
content_type = "application/json; charset=utf-8"

message_to_sign = create_message_to_sign(method, content_type, path_and_query, body, timestamp)

...

def create_message_to_sign(http_verb, content_type, path_and_query, body, timestamp)
    [
        (ENV['CLIENT_ID']).to_s,
        http_verb.to_s.upcase,
        content_type || '',
        encode_body(body).to_s,
        path_and_query,
        timestamp
    ].join("\n")
end

def encode_body(body)
    OpenSSL::Digest::SHA256.base64digest(body.to_s || '')
end
```

**Python**

```
clientId = os.getenv("ClientId")
pathAndQuery = "/v1.1/baskets/create/"
httpVerb = "POST"
contentType = "application/json"
timeStamp = formatdate(timeval=None, localtime=False, usegmt=True)
requestBody = {'vendorid':1234}
jsonFormattedBody = json.dumps(requestBody)

def hashRequestBody(body=""):
    hashedBody = hashlib.sha256(body.encode('UTF-8')).digest()
    hashedEncodedBody = base64.b64encode(hashedBody)
    return hashedEncodedBody.decode('UTF-8')
	
	
messageToSign = "\n".join([
    clientId,
    httpVerb,
    contentType,
    hashRequestBody(jsonFormattedBody), 
    pathAndQuery, 
    timeStamp
])
```

Each of the above snippets should output a `messageToSign` string that looks similar to this (with your `clientId` and `hashedBody`):

```
{clientId}
POST
application/json; charset=utf-8
{hashedHttpBody}
/baskets/create/
Fri, 09 Feb 2018 23:47:57 GMT
```

It's important that you have structured this string and its lines to be exactly the same as the properties of your HTTP request to the Ordering API, i.e. the `Date` header timestamp string on your outgoing HTTP request **must** be exactly the same as the `timeStamp` in the above string. The `ContentType` header on your outgoing HTTP request headers **must** be exactly the same as the above `contentType` string of `application/json; charset=utf-8`. If you're having problems authenticating with the API, it is likely that there is a mismatch between your outgoing request's properties and what has been created in the above string.

### Signing the message

Once you have created a correct message format to be HMAC SHA256 signed for your `Authorization` header, you can now employ the language of your choice to actually sign the message with your Client Secret. Below are language-specific examples. You can find more here.

**C#**

```
var clientSecret = Environment.GetEnvironmentVariable("clientSecret");
var signedMessage = CreateSignature(messageToSign, clientSecret);

...

private string CreateSignature(string messageToSign, string secret)
{
    secret = secret ?? "";
    var encoding = new UTF8Encoding();
    byte[] keyByte = encoding.GetBytes(secret);
    byte[] messageBytes = encoding.GetBytes(messageToSign);
    using (var hmacsha256 = new HMACSHA256(keyByte))
    {
        byte[] hashmessage = hmacsha256.ComputeHash(messageBytes);
        return Convert.ToBase64String(hashmessage);
    }
}
```

**PHP**

```
$clientSecret = getenv("clientSecret");
$signedMessage = base64_encode(hash_hmac('sha256', $messageToSign, $clientSecret, true));
```

**Java**

```
String clientSecret = System.getenv("clientSecret");
String signedMessage = SignMessage(clientSecret, messageToSign);

...

private String SignMessage(String clientSecret, String messageToSign) {
    String hash = "";
    try {
        Mac sha256_HMAC;
        sha256_HMAC = Mac.getInstance("HmacSHA256");
        SecretKeySpec secret_key = new SecretKeySpec(clientSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        sha256_HMAC.init(secret_key);
        hash = Base64.getEncoder().encodeToString(sha256_HMAC.doFinal(messageToSign.getBytes(StandardCharsets.UTF_8)));
    } catch (NoSuchAlgorithmException e) {
    e.printStackTrace();
    } catch (InvalidKeyException e) {
    e.printStackTrace();
    }
    return hash;
}
```

**Ruby**

```
signed_message = create_signature(message_to_sign)

...

def create_signature(message_to_sign)
    Base64.strict_encode64(
        OpenSSL::HMAC.digest(
            'SHA256',
            ENV['CLIENT_SECRET'],
            message_to_sign
        )
    )
end
```

**Python**

```
clientSecret = os.getenv("ClientSecret")

def createSignature(clientSecret, messageToSign):
    hash = hmac.new(
        clientSecret.encode('UTF-8'),
        messageToSign.encode('UTF-8'),
        hashlib.sha256)
    return base64.b64encode(hash.digest()).decode('UTF-8')
	
signature = createSignature(clientSecret, messageToSign)
```

### Adding the Authorization and Date headers to the HTTP request

Now that you've created the signature to be added as a header to your HTTP request, you can now create a new request in your language of choice and add this header in the format required by the Platform API.

The two headers that are always required by the API are the `Authorization` and the `Date` headers. They will be formatted like this:

`Authorization: OloSignature {ClientId}:{Signature}`
`Date: Wed, 28 Dec 2016 15:27:30 GMT`

Here are some examples of how to do so in our example languages:

**C#**

With C#, it is helpful to have a custom `DelegateHandler` that can be added to your `HttpClient` instance. This way the request can be passed through your pipeline and have the appropriate headers added for every request. We'll include an example of this later in this document, but for now we'll do it in-line.

```
ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12; // TLS 1.2 or higher
using (var client = HttpClientFactory.Create(new HttpClientHandler()))
{
    var baseUrl = @"https://ordering.api.olosandbox.com";
    var url = new Uri($@"{baseUrl}/v1.1/baskets/create/");

    var request = new HttpRequestMessage(HttpMethod.Post, url);
    request.Content = new StringContent("{\"vendorid\":1234}", Encoding.UTF8, "application/json");
    request.Headers.Authorization = new AuthenticationHeaderValue("OloSignature", $"{clientId}:{signedMessage}"); // add Authorization header
    request.Headers.Add("Date", timeStamp); // add Date header as timeStamp string

    var response = await client.SendAsync(request);
    // do something with response
}
```

**PHP**

Our PHP example uses PHP's cURL library.

```
$baseUrl = "https://ordering.api.olosandbox.com";
$pathAndQuery = "/v1.1/baskets/create/";
$url = $baseUrl . $pathAndQuery;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $stringBody);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Content-Type: application/json; charset=utf-8",
    "Authorization: OloSignature $clientId:$signedMessage",
    "Date: $timestamp"
));

$response = curl_exec($ch);
// do something with $response
```

**Java**

Our Java example uses Apache HttpClient.

```
String baseUrl = "https://ordering.api.olosandbox.com";
String pathAndQuery = "/v1.1/baskets/create/";
String url = baseUrl + pathAndQuery;

CloseableHttpClient httpClient = HttpClients.createDefault();
HttpPost request = new HttpPost(url);
request.addHeader("Date", timeStamp);
request.addHeader("Authorization", String.format("OloSignature %1s:%2s", clientId, signedMessage));
request.setEntity(new StringEntity(body, ContentType.APPLICATION_JSON));

try {
    HttpResponse response = httpClient.execute(request);
    // do something with response           
} catch (ClientProtocolException e) {
    e.printStackTrace();
} catch (IOException e) {
    e.printStackTrace();
}
```

**Ruby**

Our Ruby example uses rest-client.

```
timestamp = Time.now.httpdate
vendor_id = "1234"
base_url = "https://ordering.api.olosandbox.com"
path_and_query = "/v1.1/baskets/create/"
method = "POST"
body = "{\"vendorid\":#{vendor_id}}"
content_type = "application/json; charset=utf-8"

message_to_sign = create_message_to_sign(method, content_type, path_and_query, body, timestamp)

signed_message = create_signature(message_to_sign)

headers = {
  "Authorization": "OloSignature #{(ENV['CLIENT_ID']).to_s}:#{signed_message}",
  "Date": timestamp,
  "Content-Type": content_type
}

begin
  response = RestClient.post("#{base_url}#{path_and_query}", body, headers)
rescue RestClient::ExceptionWithResponse => e
  response = e.response
end

# do something with response
```

**Python**

```
clientId = os.getenv("ClientId")
clientSecret = os.getenv("ClientSecret")
baseUrl = "https://ordering.api.olosandbox.com"
pathAndQuery = "/v1.1/baskets/create/"
httpVerb = "POST"
contentType = "application/json"
timeStamp = formatdate(timeval=None, localtime=False, usegmt=True)
requestBody = {'vendorid': 1234}
jsonFormattedBody = json.dumps(requestBody)

signature = createSignature(clientSecret, messageToSign)

headers = {
    "Content-Type": contentType,
    "Authorization": "OloSignature {}:{}".format(clientId, signature),
    "Date": timeStamp
}

response = requests.request(
    httpVerb,
    "{0}{1}".format(baseUrl, pathAndQuery),
    data=jsonFormattedBody,
    headers=headers
	)
	
# do something with response
```

### GET Requests

HTTP GET requests are a bit different from the above POST example in that the request will have an empty body and content type. In the signature, you should hash the empty `httpBody` and include an empty string for the `contentType`. The `messageToSign` will look like this:

```
{clientId}
GET

{hashedHttpBody}
/restaurants/1234/menu
Sat, 10 Feb 2018 20:22:34 GMT
```

**C#**

```
ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12; // TLS 1.2 or higher
var vendorId = "1234";
var baseUrl = "https://ordering.api.olosandbox.com"
var url = new Uri($@"{baseUrl}/v1.1/restaurants/{vendorId}/menu");

var clientId = Environment.GetEnvironmentVariable("clientId");
var httpVerb = "GET";
var contentType = "";
var httpBody = "";
var pathAndQuery = url.PathAndQuery;
var timeStamp = DateTime.UtcNow.ToString(DateTimeFormatInfo.InvariantInfo.RFC1123Pattern);

var messageToSign = CreateMessageToSign(
    clientId,
    httpVerb,
    contentType,
    httpBody,
    pathAndQuery,
    timeStamp);

var clientSecret = Environment.GetEnvironmentVariable("clientSecret");
var signedMessage = CreateSignature(messageToSign, clientSecret);

using (var client = HttpClientFactory.Create(new HttpClientHandler()))
{
    var request = new HttpRequestMessage(HttpMethod.Get, url);
    request.Headers.Authorization = new AuthenticationHeaderValue("OloSignature", $"{clientId}:{signedMessage}");
    request.Headers.Add("Date", timeStamp);

    var response = await client.SendAsync(request);
}
```

**PHP**

```
$clientId = getenv("clientId");
$clientSecret = getenv("clientSecret");

$vendorId = "1234";
$baseUrl = "https://ordering.api.olosandbox.com";
$pathAndQuery = "/v1.1/restaurants/$vendorId/menu";
$url = $baseUrl . $pathAndQuery;

$httpBody = "";
$contentType = "";
$httpBodyBytes = utf8_encode($httpBody);
$hashedBody = base64_encode(hash('sha256', $httpBodyBytes, true));
$httpMethod = "GET";

$timestamp = gmdate("D, d M Y H:i:s T");

$messageToSign = "$clientId\n$httpMethod\n$contentType\n$hashedBody\n$pathAndQuery\n$timestamp";
$signedMessage = base64_encode(hash_hmac('sha256', $messageToSign, $clientSecret, true));

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Authorization: OloSignature $clientId:$signedMessage",
    "Date: $timestamp"
));
$response = curl_exec($ch);
// do something with response
```

**Java**

```
String clientId = System.getenv("clientId");
String clientSecret = System.getenv("clientSecret");

String baseUrl = "https://ordering.api.olosandbox.com";
String pathAndQuery = "/v1.1/restaurants/1234/menu";
String url = baseUrl + pathAndQuery;
String requestMethod = "GET";
String contentType = "";

String body = "";
String hashedBody = HashRequestBody(body);

// Can't use RFC_1123_DATE_TIME here as it's not the same as C# (Java uses d instead of dd for day)
String timeStamp = DateTimeFormatter.ofPattern("EEE, dd MMM yyyy HH:mm:ss O").format(ZonedDateTime.now(ZoneOffset.UTC));

String messageToSign = CreateMessageToSign(clientId, pathAndQuery, requestMethod, contentType, hashedBody, timeStamp);
String signedMessage = SignMessage(clientSecret, messageToSign);
System.out.println(messageToSign);

CloseableHttpClient httpClient = HttpClients.createDefault();
HttpGet request = new HttpGet(url);
request.addHeader("Date", timeStamp);
request.addHeader("Authorization", String.format("OloSignature %1s:%2s", clientId, signedMessage));

try {
    HttpResponse response = httpClient.execute(request);
    HttpEntity entity = response.getEntity();
    // do something with response         
} catch (ClientProtocolException e) {
    e.printStackTrace();
} catch (IOException e) {
    e.printStackTrace();
}
```

**Ruby**

```
timestamp = Time.now.httpdate
vendor_id = "1234"
base_url = "https://ordering.api.olosandbox.com"
path_and_query = "/v1.1/restaurants/#{vendor_id}/menu"

message_to_sign = create_message_to_sign("GET", "", path_and_query, "", timestamp)

signed_message = create_signature(message_to_sign)

headers = {
  "Authorization": "OloSignature #{(ENV['CLIENT_ID']).to_s}:#{signed_message}",
  "Date": timestamp
}

begin
  response = RestClient.get("#{base_url}#{path_and_query}", headers)
rescue RestClient::ExceptionWithResponse => e
  response = e.response
end

# do something with response
```

**Python**

```
clientId = os.getenv("ClientId")
clientSecret = os.getenv("ClientSecret")
baseUrl = "https://ordering.api.olosandbox.com"
pathAndQuery = "/v1.1/restaurants/1234/menu"
httpVerb = "GET"
contentType = ""
timeStamp = formatdate(timeval=None, localtime=False, usegmt=True)
requestBody = ""
jsonFormattedBody = "" if requestBody == "" else json.dumps(requestBody)

messageToSign = "\n".join([
    clientId,
	httpVerb,
	contentType,
	hashRequestBody(jsonFormattedBody),
	pathAndQuery,
	timeStamp
])

signature = createSignature(clientSecret, messageToSign)

headers = {
    "Authorization": "OloSignature {}:{}".format(clientId, signature),
    "Date": timeStamp
}

response = requests.request(
    httpVerb,
    "{0}{1}".format(baseUrl, pathAndQuery),
	data=jsonFormattedBody,
    headers=headers)
	
# do something with response
```

### ContentType considerations

A common place where you might run into trouble with header-based authorization is the `ContentType` header accidentally being mismatched with the content type string in your message signature. Most languages provide constants such as (with C#) `request.Content = new StringContent("{\"vendorid\":1234}", Encoding.UTF8, "application/json");`. The actual header produced by this class will be `ContentType: application/json; charset=utf8`. If your newline-separated "message to sign" says that your content type is `application/json` this will result in a `Signature is not valid for this request` error from the API.

Make sure to inspect your outgoing `HttpRequest` that is created by your language of choice to make sure that you are signing the correct value for Content Type in your signature.

#### ContentType with an empty-bodied request

You'll notice in our GET request example above that the `ContentType` headers are always set as an empty string and/or allowed to be null by the language being used. If the API endpoint does not contain a body, like in a GET request or a body-less POST request, the `ContentType` header **must** be empty string in your signature and empty/null in your request header.

### Timestamp considerations

The Platform API requires the timestamp in both the request `Date` header and the signature to be in RFC1123 format. Many languages provide constants that can be passed into a DateTime formatter that would indicate that they represent this RFC1123 formatting. For example, Java has `RFC_1123_DATE_TIME` and PHP has `DateTime::RFC1123`. Neither of these will match the API's accepted DateTime formatting and you will get a `Signature is not valid for this request` if you use them. A better way is to define your own custom DateTime formatting in the way that your language allows. For example:

**Java**

```
String timeStamp = DateTimeFormatter.ofPattern("EEE, dd MMM yyyy HH:mm:ss O").format(ZonedDateTime.now(ZoneOffset.UTC));
```

**PHP**

```
$timestamp = gmdate("D, d M Y H:i:s T");
```

**Ruby**

```
timestamp = Time.now.httpdate
```

**Python**
```
from email.utils import formatdate
timeStamp = formatdate(timeval=None, localtime=False, usegmt=True)
```

This will ensure that your timestamps have a format that is equal to this:

`Wed, 28 Dec 2016 15:27:30 GMT`

Also note that the implementation of RFC1123 that our API uses requires that the full 4-digits must be used for the year and that 2-digits must be used for the day (i.e. a preceding zero is required when the day would otherwise be a single digit).

Overall, any issues that you might have with sending a valid signature to be authorized by the Platform API will likely come from the outgoing request's headers and body not matching the strings that you have constructed to be signed in your authorization header. Make sure you double check that there is a perfect match between these values:

```
ClientId
HttpVerb
ContentType
Base64(SHA256(HttpBody))
PathAndQuery
Timestamp
```

And those contained in your language's outgoing `HttpRequest` values.

### C# SignatureHandler HTTP DelegateHandler example

As mentioned above, we can take advantage of the request pipeline offered by `System.Net.Http.HttpClient` and create a custom `DelegateHandler` that adds the necessary `Authorization` and `Date` headers to an outgoing request:

```
public class SigningHandler : DelegatingHandler
{
    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request,
        CancellationToken cancellationToken)
    {
        var clientId = Environment.GetEnvironmentVariable("clientId");
        var clientSecret = Environment.GetEnvironmentVariable("clientSecret");
        var pathAndQuery = request.RequestUri.PathAndQuery;
        var requestMethod = request.Method.Method;

        string contentType = string.Empty;
        string body = string.Empty;
        if (request.Content != null)
        {
            contentType = request.Content.Headers.ContentType.ToString();
            body = await request.Content.ReadAsStringAsync();
        }

        var timeStamp = DateTime.UtcNow.ToString(DateTimeFormatInfo.InvariantInfo.RFC1123Pattern);

        var messageToSign = CreateMessageToSign(
            clientId,
            requestMethod,
            contentType,
            body,
            pathAndQuery,
            timeStamp);

        var signedMessage = CreateSignature(messageToSign, clientSecret);

        request.Headers.Authorization =
            new AuthenticationHeaderValue("OloSignature", $"{clientId}:{signedMessage}");
        request.Headers.Add("Date", timeStamp);

        return await base.SendAsync(request, cancellationToken);
    }

    private string HashRequestBody(string body)
    {
        using (var sha256Hasher = SHA256.Create())
        {
            var bytes = Encoding.UTF8.GetBytes(body);
            var hashBytes = sha256Hasher.ComputeHash(bytes);
            return Convert.ToBase64String(hashBytes);
        }
    }

    private string CreateMessageToSign(
        string clientId,
        string method,
        string contentType,
        string body,
        string pathAndQuery,
        string timeStamp)
    {
        return string.Join("\n",
            clientId,
            method,
            contentType,
            HashRequestBody(body),
            pathAndQuery,
            timeStamp);
    }

    private string CreateSignature(string message, string secret)
    {
        secret = secret ?? "";
        var encoding = new UTF8Encoding();
        byte[] keyByte = encoding.GetBytes(secret);
        byte[] messageBytes = encoding.GetBytes(message);
        using (var hmacsha256 = new HMACSHA256(keyByte))
        {
            byte[] hashmessage = hmacsha256.ComputeHash(messageBytes);
            return Convert.ToBase64String(hashmessage);
        }
    }
}
```

With this class, we can include it in the request handling pipeline, running the request through the `SigningHandler` and then to the `HttpClientHandler` inner handler, making our request-sending code much more simple:

**HTTP POST**

```
ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12; // TLS 1.2 or higher
var baseUrl = "https://ordering.api.olosandbox.com";
var url = new Uri($@"{baseUrl}/v1.1/baskets/create/");

var bodyJson = JsonConvert.SerializeObject(new { vendorid = 1234 });
var body = new StringContent(bodyJson, Encoding.UTF8, "application/json");

using (var client = HttpClientFactory.Create(
    new HttpClientHandler(),
    new SigningHandler()))
{
    var response = await client.PostAsync(url, body);
}
```

**HTTP GET**

```
ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12; // TLS 1.2 or higher
var vendorId = "1234";
var baseUrl = "https://ordering.api.olosandbox.com";
var url = new Uri($@"{baseUrl}/v1.1/restaurants/{vendorId}/menu");

using (var client = HttpClientFactory.Create(
    new HttpClientHandler(),
    new SigningHandler()))
{
    var result = await client.GetAsync(url);
}
```
