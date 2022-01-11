import { HandOffModeEnum } from '../enums';
import { CustomFieldValue } from './CustomFieldValue';

interface RequestManualFireOrder {

    handoffmode: HandOffModeEnum,    //Handoff mode for the order. // To Do
    //If the brand has required choose handoff at checkin, this value must be sent in the request.

    customfieldvalues: CustomFieldValue[]
    // Updates to any related Custom Fields.

}
