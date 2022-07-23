export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function changeImageSize(path: string, images: any, groupname: string) {
  if (images && images.length > 0) {
    const dektopImage: any = images.find(
      (obj: any) => obj.groupname === groupname,
    );
    if (dektopImage) {
      return dektopImage.filename;
    } else {
      return path;
    }
  } else {
    return path;
  }
}

export function checkProductAvailability(item: any, orderType: any) {
  return (
    !item.unavailablehandoffmodes.includes(orderType.toLowerCase()) &&
    !item.availability.isdisabled &&
    item.availability.now
  );
}

export function generateDeviceId() {
  return 'id' + Math.random().toString(16).slice(2);
}

export const tacoMatchArray = [
  'original fish taco®',
  'original fish taco',
  'salsa verde shrimp taco',
  'blackened mahi taco',
  'gg shrimp taco',
  'taco 1',
  'taco 2',
  'taco® 1',
  'taco® 2',
];

export function checkTacoMatch(name: string, isdefault: boolean) {
  if (!isdefault) {
    return false;
  }
  const filterTaco = tacoMatchArray.filter((text: string) => {
    return name.toLowerCase().includes(text);
  });

  return filterTaco.length > 0;
}

export function removeTestingStores(restaurants: any) {
  let filterRestaurants = [];
  const confRoomPilotId = process.env.REACT_APP_CONF_ROOM_PILOT_ID || '';
  const devDemoId = process.env.REACT_APP_DEV_DEMO_ID || '';

  filterRestaurants = restaurants.restaurants.filter((rest: any) => {
    return (
      rest.id.toString() !== confRoomPilotId && rest.id.toString() !== devDemoId
    );
  });
  return {
    restaurants: filterRestaurants,
  };
}
