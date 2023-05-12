import moment from 'moment';
import { Product } from '../types/olo-api';

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
    }
    // else if (types.includes('administrative_area_level_2')) {
    //   address.address2 = address.address2 + value + '';
    // }
    else if (types.includes('administrative_area_level_1')) {
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

export function calculateTaxAndFee(basket: any) {
  let total = 0;
  if (basket) {
    if (basket.taxes) {
      total = basket.taxes.reduce((sum: number, tax: any) => sum + tax.tax, 0);
    }
    if (basket.totalfees) {
      total = total + basket.totalfees;
    }
  }
  return total.toFixed(2);
}

export async function sha256Method(message: any) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  // console.log('hashHex', hashHex);
  return hashHex;
}

export function isEmpty(val: any) {
  return val === undefined || val == null || val === '';
}

export function checkFeaturedProduct(item: Product) {
  let checkFeatured = false;
  if (
    item.categoryInfo?.name === 'FEATURED ITEMS' || item.categoryInfo?.name === 'SEASONAL MENU'
  ) {
    return checkFeatured;
  }
  if (item.metadata && item.metadata.length) {
    const result = item.metadata.find((meta: any) => meta.key === 'featured');
    if (result && result.value === 'true') {
      checkFeatured = true;
    }
  }
  return checkFeatured;
}

export function orderFees (basket: any)  {
  let fees = 0;
  if(basket?.fees?.length){
    const livingWage = basket.fees.filter((fee: any) => fee.description === 'UCSD Living Wage Surcharge')
    if(livingWage?.length){
      fees = livingWage[0].amount?.toFixed(2);
      return fees;
    }
  }   
  fees = basket?.totalfees?.toFixed(2) || 0;

  return fees;
}
