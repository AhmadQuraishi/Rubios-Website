import { DesiredOrderTimeModeEnum, HandoffModeEnum } from './olo-api.enums';

interface RequestCheckDeliveryCoverage {
  // Handoff mode to check for delivery coverage. Use "delivery" for in-house delivery or "dispatch" for Dispatch (3rd party delivery).
  handoffmode: HandoffModeEnum,
  // Desired order time mode
  timewantedmode: DesiredOrderTimeModeEnum;
  // Time the user would like to receive their order formatted "yyyymmdd hh:mm". Only send if `timewantedmode` is "advance".
  timewantedutc?: Date,
  // Street of the delivery address.
  street: string,
  // City of the delivery address.
  city: string,
  // Zip code of the delivery address
  zipcode: string
}


