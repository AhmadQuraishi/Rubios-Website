import { CaloriesSeparator } from "enums"
import { MetadataItem } from "./MetadataItem"
import { OptionGroup } from "./OptionGroup"

export interface Option {


    id: number,
    // Olo option id (a.k.a choice id).

    chainoptionid: number,
    // Olo's chain-wide option id.

    displayid?: string,
    // Legacy field.

    name: string,
    //Name of the option.

    isdefault: boolean,
    //Whether or not the option should be selected by default.

    cost: number,
    // Cost of the option in dollars, can be positive or negative. If "adjustsparentprice" is "true" this value is an adjustment. If "adjustsparentprice" is "false" this value is the option cost.

    children: boolean,
    //Whether or not the option has child option groups.

    modifiers: OptionGroup[],
    // List of child option groups.

    fields: string[],
    // List of custom fields applicable to the option.
    //items:
    // $ref: '#/CustomField'

    menuitemlabels: MetadataItem[],
    // List of menu item labels that apply to the option.

    basecalories?: string,
    // If the restaurant has decided to show calories, this will be the base calories of the option.

    maxcalories?: string,
    //If the restaurant has decided to show calories, this will be the max calories of the option.

    caloriesseparator?: CaloriesSeparator,
    // If the restaurant has decided to show calories, this will be the separator between the base and max calories.


    adjustsparentprice: boolean,
    //If "true", the value in the "cost" field will be an adjustment value. If "false", the value in the "cost" field will be the option cost.

    adjustsparentcalories: boolean,
    //Indicates that the modifier adjusts the calories of the product or a parent modifier. For example, the modifier's calories should be displayed as "+50" rather than "50".

    availability: string,
    //$ref: '#/OptionAvailability'

    metadata: MetadataItem[]
    //List of customizable key-value pairs associated with the option. If you would like to configure metadata for options, please reach out to your assigned Customer Success representative.

}