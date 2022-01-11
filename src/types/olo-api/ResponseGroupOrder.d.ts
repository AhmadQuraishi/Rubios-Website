import { ResponseBasket } from "./ResponseBasket"

interface ResponseGroupOrder {


    id: string,    ///Olo group order guid.

    deadline: string,
    //Deadline for group order participants to contribute to the group order in "yyyymmdd hh:mm" format.

    note?: string,
    //Note to display to group order participants.
    //nullable: true
    //example: Join our group order and skip the line.

    ownername: string,
    //Name of the group order owner.

    isopen: boolean,
    //Whether or not the group order is open. If true, items can still be added to the basket.

    basket: ResponseBasket

}
