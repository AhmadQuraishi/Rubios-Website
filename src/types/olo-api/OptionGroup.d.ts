import { MenuItemAvailability } from "./MenuItemAvailability"
import { MetadataItem } from "./MetadataItem"
import { Option } from "./Option"

interface OptionGroup {



    id: number,
    // Olo option group id (a.k.a. modifier id).

    chainmodifierid: number,
    // Olo's chain wide option group id. This id is not to be used in any Ordering API call.

    description: string,
    //Description of the option group.

    mandatory: boolean,
    // Whether or not one and only one option from the option group must be selected.

    options: Option[],
    // List of options in the option group.

    parentchoiceid?: string,
    //his is a legacy property that should be ignored.

    minselects?: string,
    //Minimum number of options that must be selected from the option group.

    maxselects?: string,
    // Maximum number of options that may be selected from the option group.

    minaggregatequantity?: string,
    //Minimum aggregate quantity of all selected options from the option group.

    maxaggregatequantity?: string,
    //Maximum aggregate quantity of all selected options from the option group.

    minchoicequantity?: string,
    //Minimum quantity for options within the option group.

    maxchoicequantity?: string,
    //Maximum quantity for options within the option group.

    supportschoicequantities: boolean,
    //Whether or not the option group supports options with quantities greater than 1. Please note that this field determines the relevancy of the other quantity fields.

    choicequantityincrement: string,
    //Quantity increment for options in the option group. For example, if an option group has a choicequantityincrement of 2, option quantities can only be selected in multiples of 2 (2, 4, 6, etc).

    availability: MenuItemAvailability,

    metadata: MetadataItem[],
    //List of customizable key-value pairs associated with the option group. If you would like to configure metadata for option groups, please reach out to your assigned Customer Success representative.

    explanationtext: string,
    // Explanation text for the option group.
    // example: 'Please choose a side:'

    hidechoicecost: boolean
    // Whether or not the restaurant wants to hide option costs when displaying the menu to customers.

}
