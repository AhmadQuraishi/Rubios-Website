export enum HandoffModeEnum {
  delivery = 'delivery',
  dispatch = 'dispatch'
}

export enum DesiredOrderTimeModeEnum {
  asap = 'asap',
  advance = 'advance'
}

export enum CouponTypeEnum {
  comp = 'comp',
}

export enum PromotionTypeEnum {
  coupon = 'coupon',
  compcode = 'compcode'
}

export enum DeliveryModeEnum {
  delivery = 'delivery',
  dispatch = 'dispatch',
  curbside = 'curbside',
  pickup = 'pickup',
  dinein = 'dinein',
  drivethru = 'drivethru'
}

export enum BillingMethodEnum {
  creditcard = 'creditcard',
  creditcardonfile = 'creditcardonfile',
  creditcardtoken = 'creditcardtoken',
  billingaccount = 'billingaccount',
  cash = 'cash',
  storedvalue = 'storedvalue',
  prepaid = 'prepaid'
}

export enum UserTypeEnum {
  user = 'user',
  guest = 'guest'
}

export enum CountryEnum {
  US = 'US',
  CA = 'CA'
}


export enum CardTypeEnum {
  Amex = 'Amex',
  Visa = 'Visa',
  Discover = 'Discover',
  Mastercard = 'Mastercard'
}

export enum SaveOnFileEnum {
  true = 'true',
  false = 'false'
}

export enum HandOffModeEnum {
  pickup = 'pickup',
  curbside = 'curbside',
  drivethru = 'drivethru'
}

export enum OptinEnum {
  true = 'true',
  false = 'false'

}

export enum TargetTypeEnum {
  app = 'app',
  service = 'service',
  food = 'food',
  other = 'other'
}

export enum CategoryTypeEnum {
  compliment = 'compliment',
  issue = 'issue',
  question = 'question',
  suggestion = 'suggestion',
  none = 'none'
}

export enum TimeModeEnum {
  asap = 'asap',
  advance = 'advance',
  manualfire = 'manualfire'
}

export enum TypeOfBillingSchemeEnum {
  giftcard = 'giftcard',
  payinstore = 'payinstore',
  creditcard = 'creditcard',
  external = 'external',
  prepaid = 'prepaid',
}


export enum OrderStatusEnum {
  completed = 'completed',
  canceled = 'canceled',
  transmitting = 'transmitting',
  scheduled = 'scheduled',
  PendingManualFire = 'PendingManualFire',
  InProgress = 'InProgress',
}


export enum ArrivalStatusEnum {
  OrderPlaced = 'OrderPlaced',
  Arrived = 'Arrived',
  PickedUp = 'PickedUp',
}

export enum MarketingSMSEnum {
  true = 'true',
  false = 'false'

}

export enum UpSellEnum {
  true = 'true',
  false = 'false'

}

export enum EmailReceiptsEnum {
  true = 'true',
  false = 'false'

}

export enum FollowUpsEnum {
  true = 'true',
  false = 'false'

}


export enum CalendarTypeEnum {
  business = 'business',
  delivery = 'delivery',
  carryout = 'carryout',
  pickupwindow = 'pickupwindow',
  dinein = 'dinein',
  curbsidepickup = 'curbsidepickup',
  drivethru = 'drivethru',
  dispatch = 'dispatch',

}

export enum QualificationCriteriaEnum {
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


export enum FeeTypeEnum {

  SubtotalPercent = 'SubtotalPercent',
  DispatchFee = 'DispatchFee',
  FixedFee = 'FixedFee',

}

export enum CaloriesSeparatorEnum {
  hyphen = '-',
  forwardslash = '/',
}

export enum AlcoholStatusEnum {
  None = 'None',
  Alcohol = 'Alcohol',
  FoodAndAlcohol = 'FoodAndAlcohol',
}

export enum GroupNameenum {
  desktop_menu = 'desktop-menu',
  desktop_customize = 'desktop-customize',
  mobile_app = 'mobile-app',
  mobile_app_large = 'mobile-app-large',
  marketplace_product = 'marketplace-product',
  mobile_webapp_menu = 'mobile-webapp-menu',
  mobile_webapp_customize = 'mobile-webapp-customize'
}

export enum ScopeOfOrderEnum {
  AllOrders = 'AllOrders',
  DeliveryOrdersOnly = 'DeliveryOrdersOnly',
  CashOrdersOnly = 'CashOrdersOnly',
  CurbsidePickupOrdersOnly = 'CurbsidePickupOrdersOnly'

}

export enum DispatchDeliveryStatusEnum {
  Pending = 'Pending',
  PickupInProgress = 'PickupInProgress',
  DeliveryInProgress = 'DeliveryInProgress',
  Delivered = 'Delivered',
  Canceled = 'Canceled',
  Scheduled = 'Scheduled'
}

export enum ValidationMessageTypeEnum {
  error = 'error',
  warning = 'Warning'
}

export enum BillingFieldNameEnum {
  number = 'number',
  pin = 'pin'

}

export enum BillingFieldTypeEnum {
  number = 'number',
  password = 'password'

}


export enum LoginProviderTypeEnum {
  olo = 'olo',
  external = 'external'

}
