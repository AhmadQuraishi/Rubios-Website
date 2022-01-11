

interface RequestCreateGroupOrder {

    restaurantid: number,                      //format: int64 // Olo restaurant id (a.k.a. vendor id).
    basketid?: string,                        //format: uuid// description: Olo basket guid.
    deadline: string,                         //format: date-time //description: Group order deadline, in "yyyymmdd hh:mm" format.
    note?: string                             // Note to display to group order participants.


}

