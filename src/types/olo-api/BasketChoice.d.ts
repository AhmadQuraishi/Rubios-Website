import { ChoiceCustomFieldValue } from "./ChoiceCustomFieldValue";

interface BasketChoice {

    id: number,
    // Olo basket option id. This id is unique to each basket product.

    optionid: number,
    //Olo option id. This is the option id from the restaurant's menu.

    name: string,
    // Name of the option.

    metric: number,
    // Display order metric for options.

    indent: number,
    // Display indent-level for nested options (e.g. Light/Regular/Heavy).

    cost: number,
    //Cost of the option.

    quantity: number,
    //Quantity selected of the option.

    customfields: ChoiceCustomFieldValue[]
    // Any custom fields that were applied to the option.

}
