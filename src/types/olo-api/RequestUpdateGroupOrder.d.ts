

interface RequestUpdateGroupOrder {

    grouporderid: string,                      //format: uuid // Olo group order guid.
    deadline: string,                         //format: date-time //description: Group order deadline, in "yyyymmdd hh:mm" format.
    note?: string                             // Note to display to group order participants.


}
