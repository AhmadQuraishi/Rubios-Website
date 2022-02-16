import { ResponseRestaurantCalendars } from '../types/olo-api';
import { HoursListing, CalendarTypeEnum } from './hoursListing';

export function GetUserFriendlyHours(
  hours: ResponseRestaurantCalendars,
  type: CalendarTypeEnum,
): HoursListing[] {
  const selectedStoreHours = hours?.calendar.find((x) => x.type === type);
  let newHoursArray: HoursListing[] = [];
  if (selectedStoreHours) {
    selectedStoreHours.ranges.forEach((item, index) => {
      if (newHoursArray.length == 0) {
        newHoursArray.push({
          label: item.weekday.substring(0, 1),
          start: getTimeFormat(item.start),
          end: getTimeFormat(item.end),
          isOpenAllDay: isTimeSame(item.start, item.end),
        });
      } else {
        if (
          !isTimeSame(selectedStoreHours.ranges[index - 1].start, item.start) ||
          !isTimeSame(selectedStoreHours.ranges[index - 1].end, item.end)
        ) {
          newHoursArray.push({
            label: item.weekday.substring(0, 1),
            start: getTimeFormat(item.start),
            end: getTimeFormat(item.end),
            isOpenAllDay: isTimeSame(item.start, item.end),
          });
        } else {
          newHoursArray[newHoursArray.length - 1].label =
            newHoursArray[newHoursArray.length - 1].label
              .split('-')[0]
              .substring(0, 1) +
            '-' +
            item.weekday.substring(0, 1);
        }
      }
    });
    return newHoursArray;
  } else {
    return [];
  }
}

const isTimeSame = (fTime: string, sTime: string): boolean => {
  return fTime.split(' ')[1] === sTime.split(' ')[1];
};

const getTimeFormat = (date: string) => {
  var dateObj = new Date();
  var newDate = new Date(
    dateObj.getUTCFullYear() +
      dateObj.getUTCMonth() +
      1 +
      dateObj.getUTCDate() +
      ' ' +
      date.split(' ')[1],
  );
  return newDate
    .toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    .replaceAll(':00', ' ')
    .replaceAll(' ', '');
};
