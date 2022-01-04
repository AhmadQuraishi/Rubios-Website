import { UpsellItem } from "./UpsellItem"

export interface UpsellGroup {



    title: string,
    // Name of the upsell group.
    //example: Desserts

    items: UpsellItem[]
    // Products in the upsell group.

}