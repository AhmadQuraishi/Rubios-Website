import { ResponseOrderStatus } from "./ResponseOrderStatus";

interface ResponseManualFireResult {

    success: boolean,
    //Whether or not the manual fire order was placed successfully.

    message: string,
    //Gives more details about the status of the firing. This may contain error messages if any errors occurred.
    //example: Order submitted.

    order: ResponseOrderStatus

}

