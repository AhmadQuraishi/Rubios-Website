import { FeeType } from "enums"

export interface DeliveryFeeTier {



    feetype: FeeType,
    // description: Type of fee.

    amount: number,
    // Amount of the fee.

    subtotalminimum: number
    // Minimum value of the order subtotal for the fee to be in effect.

}