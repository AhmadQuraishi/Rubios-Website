import { QualificationCriteriaEnum } from "./olo-api.enums"

interface RestaurantCustomField {



    id: number,
    // Unique id for the restaurant custom field.

    label: string,
    // Label for the restaurant custom field.

    required: boolean,
    //Whether or not the custom field is required to have a value set when placing an order at the restaurant.

    validationregex?: string,
    // Regular expression used to validate the value. If the desired custom field value does not match the validationregex, the API will return an error.
    // nullable: true
    //example: '[a-z]+'

    qualificationcriteria: QualificationCriteriaEnum
    //Which types of orders the custom field applies to.


}
