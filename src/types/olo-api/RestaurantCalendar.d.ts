import { CalendarTypeEnum } from "./olo-api.enums"
import { TimeRange } from "./TimeRange";

interface RestaurantCalendar {


    label?: string,
    //Display label for the calendar.
    // nullable: true
    //example: Curbside Pickup Hours

    type: CalendarTypeEnum,
    //Type of calendar. This list is not exhaustive as other calendar types may be added in the future.

    ranges: TimeRange[]
    //Time ranges the calendar applies to.
}
