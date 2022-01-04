export interface TimeRange {


    start: string,
    //format: date-time
    //Start date time formatted "yyyymmdd hh:mm". This date time is local to the restaurant.
    //example: 20200315 08:00

    end: string,
    // End date time formatted "yyyymmdd hh:mm". This date time is local to the restaurant.

    weekday: string
    //Abbreviated day of the week.
    //example: Thu

}