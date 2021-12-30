import { TargetType, CategoryType } from "enums";


export interface RequestFeedback {

    target?: TargetType,                     //Target for the feedback. nullable: false
    category?: CategoryType,                 //Category for the feedback. nullable: false
    authtoken: string,                  //Olo user authentication token. nullable: false
    vendorid?: string,                  //Olo restaurant id the feedback is associated with. nullable: true
    basketid?: string,                 //Olo basket guid the feedback is associated with.
    orderid?: string,                  //Olo order guid the feedback is associated with.
    fullname: string,                  //Name of the feedback giver. nullable: false
    email: string,                     //Email of the feedback giver. nullable: false
    feedback: string,                  // Details of the feedback.
    date?: string[]                    //Customizable key value pairs to store. $ref: '#/Parameter'
}
