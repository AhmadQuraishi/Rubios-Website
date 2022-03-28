import { BatchProductChoiceCustomField } from "./BatchProductChoiceCustomField";

interface BatchProductChoice {

    choiceid: number,                                       //Olo option id as retrieved from the restaurant's menu.
    quantity?: number,                                       // Quantity selected of the option.
    customfields: BatchProductChoiceCustomField[]    //List of option custom fields.

}

