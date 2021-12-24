# Introduction to Webhooks

**Overview**

A webhook (also called a web callback or HTTP push API) is a way for Olo to send event-driven information to our integration partners. Events are delivered via HTTP POST to an HTTPS endpoint provided by the partner. Webhooks deliver event data to subscribers close to when the event occurs, generally within seconds. ***While webhook events will generally be delivered promptly, this is not guaranteed and we do not recommend relying on webhooks as part of a time sensitive process.***

Partners that utilize webhooks gain an efficient way to respond to events without needing to query Olo's systems for changes. Typical use cases may include keeping internal systems in sync with Olo, responding to issues or outages, monitoring trends, or maintaining mailing lists.

**Confidentiality**

The contents of this document are confidential and under NDA. The information herein may only be used by the intended audience and for the purposes of integration with Olo.

# How to Subscribe

Webhook subscriptions are managed by the brand, via the [self-service webhooks tool](https://olosupport.zendesk.com/hc/en-us/articles/360061153692-Self-Service-Webhooks) within Dashboard. This enables brands to easily manage webhook settings so that Olo sends the right events to the Developer Partner or In-house development team.

To ensure the brand is able to create the webhook successfully, Developer Partners and In-house development teams should follow these steps:

1. Configure the Destination URL. This is the single HTTPS endpoint to which webhook event data should be `POST`ed. _Note, plain HTTP and ports other than 443 are not supported._
   
2. Ensure your webhook consumer service is ready to receive and respond to the [Test Event](#operation/test) with an HTTP 200 response. The brand will not be able to complete the webhook configuration process without a successful response from the Test Event webhook.
   
3. Provide the brand with the Destination URL. 
   
4. If your integration is using OAuth for webhook authorization, also provide the brand with the Authorization URL, Client Id, Client Secret, and Authorization Scope (if required).
   
5. During the webhook creation process, the brand will be prompted to provide you with a 64-character shared secret. This value is used to calculate the [X-Olo-Signature header](#section/HTTP-Headers) and may be used to verify messages were sent from Olo.

6. Once the webhook has been published by the brand, you will start to receive webhook event messages. Reference [At-Least Once Delivery](#section/At-Least-Once-Delivery) for further details about message delivery.

Questions about this process? Reach out to Developer Support (developersupport@olo.com). We're here to help!

> The events you subscribe to must all be sent to the same Destination URL, and that only one webhook is allowed per environment for each approved brand (or per Rails partner). A different Destination URL can be provided for different brands, but not for different events from the same brand.

# Message Format

All payloads are JSON serialized (Content-Type: application/json). Subscribers should not depend on the order of fields or objects or any JSON formatting specifics such as whitespace or indentation.

Please note that all IDs contained within the payload are Olo internal identifiers only.

# Event Acknowledgement

Webhook listeners should acknowledge webhook events with an HTTP 200 response when successfully received in order to prevent timeouts and duplicate delivery attempts. Subscribers should build their webhook listener logic in a way that the acknowledgement of a webhook delivery is either done before the processing of the event or is not dependent on the completion of the event processing (e.g. in a separate thread).

# At-Least Once Delivery

If a webhook call results in an HTTP error in the 5xx range (e.g. a gateway timeout or server error) Olo will retry the message up to 50 times over a 24 hour period before giving up. Messages may therefore be received multiple times by a subscriber. It is up to the subscriber to ignore duplicates by checking the X-Olo-Message-Id header.

# HTTP Headers

**X-Olo-Event-Type**
Webhook event type (e.g. OrderPlaced or UserSignedUp)

**X-Olo-Message-Id**
A unique identifier for the message which may optionally be used for duplicate prevention.

**X-Olo-Timestamp**
Olo's server time when the message was sent. This field is represented in UTC ticks (the number of 100-nanosecond intervals since midnight on January 1, 0001). Please note that this field does not relate to the timing of the underlying event.

**X-Olo-Signature**
A HMAC-SHA256 signature calculated on (without parentheses):

```
(DestinationUrl)\n(Body)\n(MessageId)\n(Timestamp)
```

in UTF8, using the shared secret key provided by Olo (upon the creation of the webhook) and converted to Base64. This signature may optionally be used to verify that the message was sent by Olo.

(See the FAQ section below for a detailed breakdown on how to compute the signature.)

Payload Header Examples (you will see different values):

`POST /receive HTTP/1.1`

```
Content-Type: application/json
X-Olo-Event-Type: OrderPlaced
X-Olo-Message-Id: f8dac5dd-d3b2-w76c-b969-a668c699637c
X-Olo-Timestamp: 635616089149791951
X-Olo-Signature: GZTBDbSm7Wd0clQTiIQHCSvT06fM7uMkptGAM0oVSZE=
```

# Supported TLS/SSL Ciphers

Since we require HTTPS for your destination URL, please ensure that you support at least one of the ciphers mentioned below. If you are unsure of which ciphers you currently support, you can check your supported ciphers at https://www.ssllabs.com/ssltest/analyze.html and entering your webhook's destination hostname. If you do not support at least one of the ciphers mentioned below we will be unable to successfully send webhook events to your destination URL. 

* TLS_DHE_RSA_WITH_AES_256_GCM_SHA384
* TLS_DHE_RSA_WITH_AES_128_GCM_SHA256
* TLS_RSA_WITH_RC4_128_SHA
* TLS_RSA_WITH_AES_128_CBC_SHA256
* TLS_RSA_WITH_AES_128_CBC_SHA
* TLS_RSA_WITH_AES_256_CBC_SHA256
* TLS_RSA_WITH_AES_256_CBC_SHA
* TLS_RSA_WITH_3DES_EDE_CBC_SHA
* TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256_P256
* TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256_P384
* TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA_P256
* TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA_P384
* TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA_P256
* TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA_P384
* TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256_P256
* TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256_P256
* TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384_P384
* TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384_P384
* TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA_P256
* TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA_P384
* TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA_P256
* TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA_P384
* TLS_DHE_DSS_WITH_AES_128_CBC_SHA256
* TLS_DHE_DSS_WITH_AES_128_CBC_SHA
* TLS_DHE_DSS_WITH_AES_256_CBC_SHA256
* TLS_DHE_DSS_WITH_AES_256_CBC_SHA
* TLS_DHE_DSS_WITH_3DES_EDE_CBC_SHA

# Testing

A Dashboard user with the [Developer Tools](https://olosupport.zendesk.com/hc/en-us/articles/115001427843-Dashboard-Permissions) permission can verify that a webhook is configured correctly by sending a [Test Event](#operation/test). This will ensure that the webhook listener acknowledges webhook events with an HTTP 200 response when successfully received. If OAuth information is provided, an Authorization header will also be included in the request.

# FAQ

**Q: I'm having trouble generating the X-Olo-Signature. Can you please provide a more detailed breakdown of the steps to generate it?**

Sure! First, let's define all the variables at work:

**Url:** The full HTTPS Destination URL that Olo was provided by the requester to send webhook events to.

**Body:** The raw, **_unformatted_** body of the webhook payload.

**Message ID:** The value of the X-Olo-Message-Id header from the webhook payload.

**Timestamp:** The value of the X-Olo-Timestamp header from the webhook payload.

**Shared Secret Key:** This key will be provided to you upon creation of the webhook.

> This key has no relation to API keys

Noting the variables above, the following pseudocode breaks down the steps to generate the signature:

```
stringToSign = url + "\n" + body + "\n" + messageId + "\n" + timestamp;

utfStringToSign = stringToSign.ToUTF8();
utfSecret = sharedSecretKey.ToUTF8();

hmac = new HMACSHA256(utfSecret);
hash = hmac.ComputeHash(utfStringToSign);

signature = hash.ToBase64();
// example: GZTBDbSm7Wd0clQTiIQHCSvT06fM7uMkptGAM0oVSZE=
```

**Q: Is the string-to-sign for the calculated signature delimited by the environment's newline character, or only the "\n" newline character?**

The environment's newline character should not be used (as some systems interpret a newline as "\r\n") -- always use just "\n" as the delimiter. Note that "\n" here refers to a line feed character and should not be inserted as a string literal (i.e. you should not see \n appear as literal characters within the string when printing it out).

**Q: I noticed that there is a webhook for Cancelled Orders. I have an order that has been rescheduled but I didn't see that it was included in the Cancelled Orders webhook. How do I get information on rescheduled orders?**

Orders are automatically canceled and replaced whenever they are modified. Our Cancelled Orders webhook will only publish events where an order is cancelled by a user or by the system. We intentionally do not publish a webhook for orders that are cancelled due to modifications as our system refers to those orders as 'rescheduled' orders.

Rescheduled Orders (a.k.a. Replaced Orders) will generate an OrderPlaced webhook event where the "isReplacement" property will be true and the "replacementDetails" will be filled.

**Q: What is the difference between VendorAvailabilityChanged and VendorTemporarilyDisabled?**

A: VendorAvailabilityChanged is strictly POS focused and has a 5 minute delay in firing due to some POS self correcting measures. These include issues with connectivity where a POS goes offline and back online in a short period of time or where a POS may reboot to self correct any errors. This event is self sensed by Olo and is not initiated by the vendor via Dashboard.

VendorTemporarilyDisabled is anything bigger than a POS issue such as a vendor being disabled due to remodeling, store damage, or anything else that prevents a store from servicing customers. This is triggered via a setting in Dashboard that requires user input.

Neither of these events take into account a vendor's hours of availability, however they both have an impact on the "isavailable" property returned from the GET /restaurants/{restaurantId} and similar endpoints as part of the Ordering API.

# Changelog

This list is a log of fields added to existing webhooks (does not include new webhook events added). The Changelog was introduced on September 9, 2019, and does not reflect changes made to webhooks prior to this date.

In order to provide context for newly added fields, existing object or array property names may also be listed. In such cases, the newly added fields are emboldened.

**11/9/2021**

* **Documentation Update:** Added [Update User Communication Preferences](/docs/load/ordering-api#operation/UpdateUserCommunicationPreferences) as an Ordering API endpoint that will trigger [User Updated](#operation/userUpdated) webhook.

**10/29/2021**

* **Documentation Update:** Updated the [How To Subscribe](#section/How-to-Subscribe) information to reflect the self-service webhook process.

**10/22/2021**

#### New CustomerArrived Event added

The new CustomerArrived event enables creation of notifications via 3rd party POS or KDS systems when a customer has arrived to pick up their order. The primary use case for this webhook is for curbside orders, but it is not limited to curbside handoff specifically, and can be utilized for other handoff modes such as pickup as well.

Event type documentation can be found [here](#operation/customerArrived). 

**Action Required**: Permissioned users can enable this event via Dev Tools in Dashboard. 

**10/20/2021**

* **Documentation Updated**: Added [Supported TLS/SSL Ciphers](#section/Supported-TLSSSL-Ciphers) section detailing the ciphers Olo supports. If you are implementing webhooks, you must support at least one of the mentioned ciphers.

**7/9/2021**

* Updated Order and Dispatch events to include new `orderIdString` field. *We strongly encourage migration to this new field, especially in javascript listeners.*

**6/1/2021**

* Updated `DispatchStatusUpdate` enum to include new return statuses: `ReturnInitiated`, `ReturnInProgress`, `Returned`, `ReturnCanceled`.

**2/8/2021**
* *Events:* Test
* *Field:* New Event Type added

**1/13/2020**

* Updated webhook event layout. Added detailed field descriptions for all events.

**3/24/2020**

* *Events:* BasketSubmitFailed
* *Field:* New Event Type added
* *Updated by:* Kenneth Marks

**3/2/2020**

* *Events:* UserUpdated
* *Field:* modifiers: [{"allowMarketingSms"}]
* *Updated by:* Kenneth Marks

**2/11/2020**

* *Events:* FAQ section
* *Field:* 'Q: What is the difference between VendorAvailabilityChanged and VendorTemporarilyDisabled?'
* *Updated by:* Kenneth Marks

**10/15/2019**

* *Events:* OrderAdjusted
* *Field:* Adjustment: [{"**adjustmentCustomFeeTotalAmount**"}]
* *Updated by:* Kenneth Marks

**10/1/2019**

* *Events:* OrderPlaced, OrderClosed, OrderCancelled, ScheduledOrderFailed, ScheduledOrderFired
* *Field:* modifiers: [{"**modifierquantity**"}]
* *Updated by:* Kenneth Marks

**9/9/2019**
* *Events:* OrderPlaced, OrderClosed, OrderCancelled, ScheduledOrderFailed, ScheduledOrderFired
* *Field:* **"customFees": [{"amount", "internalName", "description"}],** totals: **{"feesTotal"}**
* *Updated by:* Kenneth Marks

# Contact Us

**Official Developer Support Hours:**

**M-F, 9am - 8:00pm ET (6am - 5:00pm PT)**

Any technical questions not addressed in this guide should be directed to Developer Support (developersupport@olo.com), Rails Support (rails-support@olo.com) for Rails partners, or Dispatch Support (dispatch-devsupport@olo.com) for Dispatch partners.

We will do our best to address your question(s) as soon as possible! Please allow for a 24-hour response time within the business week (note: not an SLA) for most incoming technical questions. Tickets better suited for other Olo support teams will be reassigned.
