import { GroupNameenum } from "./olo-api.enums"

interface Image {



    groupname: GroupNameenum,
    //The name of the group the image resides in.

    description?: string,
    //Description of the image.

    isdefault: boolean,
    //Whether or not this is a default image.

    filename?: string,
    //The filename of the image. Append it to the menu's "imagepath" field to construct the full URL.

    url?: string
    //Legacy field that can be ignored.

}
