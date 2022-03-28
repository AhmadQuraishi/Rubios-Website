import { MenuItemAvailability } from "./MenuItemAvailability"

interface OptionAvailability {

    //allOf: MenuItemAvailability,

    always: boolean,
    //Whether or not the menu item is always available.
    // Please note that this does not consider when a menu item is temporarily unavailable(86'd).

    now: boolean,
    //Whether or not the menu item is currently available.
    //If this is "false", any attempts to add the menu item to a basket, basket validation calls,
    //and basket submit calls will result in an error.
    //Please note that this does not consider when a menu item is temporarily unavailable(86'd).

    description?: string,
    //'A human-readable description of when the menu item is available.
    // If it''s always available the description will be blank.Example A: "through October 30".
    //Example B: "Tuesdays from 4pm to 6pm." Example C: "Tuesdays from 9am to 6pm through October 10."'
    //example: Tuesdays from 4pm to 6pm.

    startdate?: string,
    // If availability date ranges are used and a start date has been set, the first day the product is available.
    //Otherwise null.Datetime in "yyyymmdd" format.

    enddate?: string
    // If availability date ranges are used and an end date has been set, the last day the product is available.
    //Otherwise null.Datetime in "yyyymmdd" format.

    isdisabled: boolean
    // Whether or not the option is 86’d

}
