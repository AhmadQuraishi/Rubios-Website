import { ScopeOfOrderEnum } from "./olo-api.enums";

interface BasketCustomField {


    id: number,
    //Unique id for the restaurant custom field.

    label: string,
    // Description of what the custom field is used for.

    value?: string,
    // Value of the custom field.

    isrequired: boolean,
    //Whether or not the custom field value is required.

    validationregex?: string,
    // Regular expression used to validate the value of the field.

    scope: ScopeOfOrderEnum
    //Which types of orders the custom field applies to.

}
