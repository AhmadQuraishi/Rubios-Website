import { Image } from './Image';
import { MetadataItem } from './MetadataItem';
import { Product } from './Product';

interface Category {

  id: number,
  // Olo product category id.

  name: string,
  // Name of the product category.
  //example: Breakfast

  description?: string,
  /**
   * Description of the product category.
   * example: Breakfast products.
   * **/
  metadata: MetadataItem[],
  // List of customizable key-value pairs associated with the product category. If you would like to configure metadata for product categories, please reach out to your assigned Customer Success representative.

  containsalcohol: boolean,
  //Determines if all products within the category are alcoholic.

  images: Image[],
  // Images associated with the product category.'

  products: Product[]
  //Products in the category.

}
