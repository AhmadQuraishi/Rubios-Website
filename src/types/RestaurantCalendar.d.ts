import { CalendarType } from "enums"

export interface RestaurantCalendar {


    label?: string
    //Display label for the calendar.
    // nullable: true
    //example: Curbside Pickup Hours
    type: CalendarType
    //Type of calendar. This list is not exhaustive as other calendar types may be added in the future.

    ranges: string[]
    //Time ranges the calendar applies to.
    // items:
    // $ref: '#/TimeRange'
}