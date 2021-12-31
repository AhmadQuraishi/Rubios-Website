import { Image } from "./Image"

export interface MenuItemLabel {


    name: string,
    //Name of the menu item label.
    //example: Sodium

    code: string,
    //Code for the menu item label.
    //example: HighSodium

    images: Image[]
    //List of images for the menu item label.

}