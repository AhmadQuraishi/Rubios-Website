export interface HoursListing {
  start: string;
  end: string;
  label: string;
  isOpenAllDay: boolean;
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
