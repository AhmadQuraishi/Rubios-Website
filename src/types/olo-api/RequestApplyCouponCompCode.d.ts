import { PromotionTypeEnum } from './olo-api.enums';

interface RequestApplyCouponCompCode {

    code: string,                      // Coupon code or comp code to apply to the basket. ,  example: Take20
    secondarycode?: string               //Only used when type of promotion is 'compcode'.
    promotiontype: PromotionTypeEnum,     //Type of promotion.
}
