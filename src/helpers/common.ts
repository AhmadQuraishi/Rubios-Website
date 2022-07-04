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

export function checkProductAvailability (item: any, orderType: any) {
  return (
    !item.unavailablehandoffmodes.includes(orderType.toLowerCase()) &&
    !item.availability.isdisabled &&
    item.availability.now
  );
};
