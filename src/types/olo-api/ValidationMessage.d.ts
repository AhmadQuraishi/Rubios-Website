import { ValidationMessageTypeEnum } from "./olo-api.enums";

interface ValidationMessage {
    key: string,
    //Olo validation message key.

    message?: string,
    //Details of the validation issue.
    // Hamburgers not available for drivethru orders.

    category: ValidationMessageTypeEnum
    //The type of validation message.

}
