
interface CustomField {



    id: number,
    //the id of the custom field.

    isrequired: boolean,
    // Whether or not the option custom field is required. If "true", any attempt to add the option without the custom field will result in an error.

    label: string,
    // Label for the option custom field.
    //example: Personalized message.

    maxlength: number
    // Max length for the custom field value.

}
