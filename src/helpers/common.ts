import moment from 'moment';

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
  return 'id_' + moment().unix();
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
  const restaurantIds: any =
    `${process.env.REACT_APP_TESTING_RESTAURANTS_IDS}` || '';
  if (restaurantIds == 'undefined') {
    return restaurants;
  }
  let filterRestaurants: any = [];
  const testingStores: any = JSON.parse(restaurantIds) || [];

  filterRestaurants = restaurants.filter((rest: any) => {
    return !testingStores.includes(rest.id.toString());
  });
  return filterRestaurants;
}

export function getAddress(place: any) {
  const address = {
    address1: '',
    address2: '',
    city: '',
    zip: '',
    state: '',
  };

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach((component: any) => {
    const types = component.types;
    const value = component.long_name;
    const svalue = component.short_name;

    if (types.includes('locality')) {
      address.city = value;
    } else if (types.includes('sublocality') && address.city === '') {
      address.city = value;
    } else if (types.includes('street_number')) {
      address.address1 = address.address1 + value + ' ';
    } else if (types.includes('route')) {
      address.address1 = address.address1 + value + '';
    } else if (types.includes('subpremise')) {
      address.address2 = address.address2 + value + ' ';
    } else if (types.includes('neighborhood')) {
      address.address2 = address.address2 + value + ' ';
    } else if (types.includes('administrative_area_level_2')) {
      address.address2 = address.address2 + value + '';
    } else if (types.includes('administrative_area_level_1')) {
      address.state = svalue;
    } else if (types.includes('postal_code')) {
      address.zip = value;
    }
  });

  if (address.address1 === '' || address.city === '' || address.zip == '') {
    return {
      address1: '',
      address2: '',
      city: '',
      zip: '',
      state: '',
    };
  }

  return address;
}
