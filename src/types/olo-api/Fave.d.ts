import { FaveProduct } from "./FaveProduct"

interface Fave {



    id: number,
    //: Unique fave id.

    name: string,
    //Name of the fave.

    vendorid: integer,
    //Restaurant id that the fave was created at.

    vendorname: string,
    // Name of the restaurant that the fave was created at.

    disabled: boolean,

    online: boolean,
    // Whether or not the fave is available to be ordered.

    isdefault: boolean,
    // Whether or not the fave is the user's default fave. A user can only have one default fave at a time.

    products: FaveProduct[]
    //List of products in the fave.

}
