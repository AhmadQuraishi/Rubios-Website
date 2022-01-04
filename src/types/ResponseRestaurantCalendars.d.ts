import { RestaurantCalendar } from "./RestaurantCalendar";

export interface ResponseRestaurantCalendars {

    calendar: RestaurantCalendar[]
    // List of calendars (ie. store hour categories) associated with restaurant for the provided date range.

}
