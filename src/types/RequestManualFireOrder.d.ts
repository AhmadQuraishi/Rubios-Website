import { HandOffModeEnum } from '../enums';

interface RequestManualFireOrder {

    handoffmode: HandOffModeEnum,    //Handoff mode for the order. // To Do
    //If the brand has required choose handoff at checkin, this value must be sent in the request.

    customfieldvalues: string[]
    // Updates to any related Custom Fields.
    //items: $ref: '#/CustomFieldValue'
}
