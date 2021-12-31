export enum HandoffMode {
  delivery = 'delivery',
  dispatch = 'dispatch'
}

export enum DesiredOrderTimeMode {
  asap = 'asap',
  advance = 'advance'
}

export enum CouponType {
  comp = 'comp',
}

export enum PromotionType {
  coupon = 'coupon',
  compcode = 'compcode'
}
export enum DeliveryMode {

  delivery = 'delivery',
  dispatch = 'dispatch',
  curbside = 'curbside',
  pickup = 'pickup',
  dinein = 'dinein',
  drivethru = 'drivethru'
}
export enum BillingMethod {

  creditcard = 'creditcard',
  creditcardonfile = 'creditcardonfile',
  creditcardtoken = 'creditcardtoken',
  billingaccount = 'billingaccount',
  cash = 'cash',
  storedvalue = 'storedvalue',
  prepaid = 'prepaid'
}

export enum UserType {
  user = 'user',
  guest = 'guest'
}

export enum Country {
  US = 'US',
  CA = 'CA'
}


export enum CardType {
  Amex = 'Amex',
  Visa = 'Visa',
  Discover = 'Discover',
  Mastercard = 'Mastercard'
}

export enum SaveOnFile {

  true = 'true',
  false = 'false'

}

export enum HandOffModeEnum {

  pickup = 'pickup',
  curbside = 'curbside',
  drivethru = 'drivethru'

}

export enum Optin {

  true = 'true',
  false = 'false'

}
export enum TargetType {

  app = 'app',
  service = 'service',
  food = 'food',
  other = 'other'

}

export enum CategoryType {

  compliment = 'compliment',
  issue = 'issue',
  question = 'question',
  suggestion = 'suggestion',
  none = 'none'
}

export enum TimeMode {
  asap = 'asap',
  advance = 'advance',
  manualfire = 'manualfire'
}

export enum TypeOfBillingScheme {

  giftcard = 'giftcard',
  payinstore = 'payinstore',
  creditcard = 'creditcard',
  external = 'external',
  prepaid = 'prepaid',

}


export enum OrderStatus {

  completed = 'completed',
  canceled = 'canceled',
  transmitting = 'transmitting',
  scheduled = 'scheduled',
  PendingManualFire = 'PendingManualFire',
  InProgress = 'InProgress',

}



export enum ArrivalStatus {

  OrderPlaced = 'OrderPlaced',
  Arrived = 'Arrived',
  PickedUp = 'PickedUp',

}

export enum MarketingSMS {

  true = 'true',
  false = 'false'

}
export enum UpSell {

  true = 'true',
  false = 'false'

}
export enum EmailReceipts {

  true = 'true',
  false = 'false'

}
export enum FollowUps {

  true = 'true',
  false = 'false'

}


export enum CalendarType {

  business = 'business',
  delivery = 'delivery',
  carryout = 'carryout',
  pickupwindow = 'pickupwindow',
  dinein = 'dinein',
  curbsidepickup = 'curbsidepickup',
  drivethru = 'drivethru',
  dispatch = 'dispatch',

}

export enum QualificationCriteria {

  AllOrders = 'AllOrders',
  DeliveryOrdersOnly = 'DeliveryOrdersOnly',
  CashOrdersOnly = 'CashOrdersOnly',
  CurbsidePickupOrdersOnly = 'CurbsidePickupOrdersOnly',
  DriveThruOnly = 'DriveThruOnly',
  DineInOrdersOnly = 'DineInOrdersOnly',
  CarryOutOnly = 'CarryOutOnly',
  CallCenterTimeWantedThreshold = 'CallCenterTimeWantedThreshold',
  CallCenterOrderAmountThreshold = 'CallCenterOrderAmountThreshold',
  CallCenterProductQuantityThreshold = 'CallCenterProductQuantityThreshold',
  CallCenterTimeWantedAndProductQuantityThreshold = 'CallCenterTimeWantedAndProductQuantityThreshold',
}


export enum FeeType {

  SubtotalPercent = 'SubtotalPercent',
  DispatchFee = 'DispatchFee',
  FixedFee = 'FixedFee',

}

export enum CaloriesSeparator {

  hyphen = '-',
  forwardslash = '/',


}

export enum AlcoholStatus {

  None = 'None',
  Alcohol = 'Alcohol',
  FoodAndAlcohol = 'FoodAndAlcohol',

}


export enum GroupName {

  desktop_menu = 'desktop-menu',
  desktop_customize = 'desktop-customize',
  mobile_app = 'mobile-app',
  mobile_app_large = 'mobile-app-large',
  marketplace_product = 'marketplace-product',
  mobile_webapp_menu = 'mobile-webapp-menu',
  mobile_webapp_customize = 'mobile-webapp-customize'

}


export enum ScopeOfOrder {

  AllOrders = 'AllOrders',
  DeliveryOrdersOnly = 'DeliveryOrdersOnly',
  CashOrdersOnly = 'CashOrdersOnly',
  CurbsidePickupOrdersOnly = 'CurbsidePickupOrdersOnly'

}


export enum DispatchDeliveryStatus {

  Pending = 'Pending',
  PickupInProgress = 'PickupInProgress',
  DeliveryInProgress = 'DeliveryInProgress',
  Delivered = 'Delivered',
  Canceled = 'Canceled',
  Scheduled = 'Scheduled'

}

export enum ValidationMessageType {

  error = 'error',
  warning = 'Warning'

}

export enum BillingFieldName {

  number = 'number',
  pin = 'pin'

}

export enum BillingFieldType {

  number = 'number',
  password = 'password'

}


export enum LoginProviderType {

  olo = 'olo',
  external = 'external'

}