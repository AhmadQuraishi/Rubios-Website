import { Category } from "./Category";

interface ResponseMenu {


    imagepath?: string,
    //the base path to be used in the construction of an image's full URL. // required but also nullable: true
    //example: https://menu-images.com/

    categories: Category[]
    //type: array
    //description: List of product categories on the menu.

}
