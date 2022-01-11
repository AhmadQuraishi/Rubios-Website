import { Image } from './Image';
import { MetadataItem } from './MetadataItem';
import { ProductAvailability } from './ProductAvailability';
import { CaloriesSeparatorEnum } from './olo-api.enums';

interface Product {
  id: number,
  // Olo product id.

  chainproductid: number,
  //Olo's chain wide product id.

  name: string,
  // Name of the product.
  //example: Sandwich

  description?: string,
  // Description of the product.

  cost: number,
  // Cost of the product.

  basecalories?: string,
  //If the restaurant has decided to show calories (denoted by the `showcalories` field on the `restaurant` model),
  // this will be the base calories of the product.

  maxcalories?: string,
  //If the restaurant has decided to show calories (denoted by the `showcalories` field on the `restaurant` model),
  //this will be the max calories of the product, if a value has been defined.

  caloriesseparator?: CaloriesSeparatorEnum,
  //If the restaurant has decided to show calories (denoted by the `showcalories` field on the `restaurant` model),
  //this will be the separator between the base and max calories.

  displayid?: string,
  //Legacy field.
  // nullable: true
  //deprecated: true

  starthour: number,
  // Legacy field. Currently set to always return 0.

  endhour: number,
  // Legacy field. Currently set to always return 24.

  imagefilename?: string,
  //Legacy field. Points to default image filename.

  maximumquantity?: string,
  //Maximum quantity for an individual product in a basket.
  //For the total maximum quantity of the product that can be added to the basket,
  //please reference the `maximumbasketquantity` field.

  minimumquantity: string,
  // Minimum quantity for an individual product in a basket.
  //Please note that for values above zero this does not mean that the product is required to be in every basket.
  //Instead it means that if it is added to a basket,
  //it must have a quantity greater than or equal to the minimum quantity.

  maximumbasketquantity?: string,
  // Total maximum quantity of the product that can be in a single basket.

  minimumbasketquantity?: string,
  //Total minimum quantity of the product that must be in a single basket.
  //Please note that for values above zero this mean that the product is required to be in every basket.

  quantityincrement: string,
  //Quantity increment for the product if it is ordered.
  //For example, if a product has quantityincrement of 2, it can only be ordered in multiples of 2(2, 4, 6, etc).

  shortdescription?: string,
  //Short description of the product.

  metadata: MetadataItem[],
  //List of customizable key-value pairs associated with the product.
  //If you would like to configure metadata for products,
  //please reach out to your assigned Customer Success representative.

  alcoholstatus: AlcoholStatus,
  // The alcohol status of the product.
  //For example, FoodAndAlcohol would indicate a combo meal with both required food and alcohol items.

  images: Image[],
  //List of images for the product.

  availability: ProductAvailability,

  unavailablehandoffmodes: string[]
  // List of unavailable handoff modes for the product.
  //Attempting to order a product with an unavailable handoff mode will result in an error.
  //example: drivethru

}
