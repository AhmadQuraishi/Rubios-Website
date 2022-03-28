import { CouponTypeEnum } from './olo-api.enums';

interface RequestApplyCoupon {

    couponcode: string,                      // Coupon code to apply to the basket. ,  example: Take20
    coupontype?: CouponTypeEnum,                      //For Aloha POS with use of Open Dollar Comp.  nullable: true
    compamount?: number                      // For Aloha POS with use of Open Dollar Comp. Amount of the comp.  nullable: true example: 2.25
}

