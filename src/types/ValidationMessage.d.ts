import { ValidationMessageType } from "enums";

export interface ValidationMessage {



    key: string,
    //Olo validation message key.

    message?: string,
    //Details of the validation issue.
    // Hamburgers not available for drivethru orders.

    category: ValidationMessageType
    //The type of validation message.

}