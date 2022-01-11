import { FeeTypeEnum } from "./olo-api.enums"

interface DeliveryFeeTier {



    feetype: FeeTypeEnum,
    // description: Type of fee.

    amount: number,
    // Amount of the fee.

    subtotalminimum: number
    // Minimum value of the order subtotal for the fee to be in effect.

}
