import { BatchProductChoiceCustomField } from "./BatchProductChoiceCustomField"

interface NewBasketProductChoiceByChainId {




    chainchoiceid: number,
    // Olo chain wide option id as retrieved from the restaurant's menu.

    quantity: number,
    // Quantity selected of the option.

    customfields: BatchProductChoiceCustomField[],
    // List of option custom fields.

    choices: NewBasketProductChoiceByChainId[]
    //List of options (choices) nested under this option that apply to the product.
}
