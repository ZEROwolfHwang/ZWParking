/**
 * Created by zerowolf on 2017/12/6.
 */

import {combineReducers} from 'redux';
import {nav} from './Navigators';
import {globalInfo} from "../reduces/globalReduce";
import {coupon} from "../containers/Coupon/reduce/reducesCoupon";
import {setting} from "../containers/Mine/pages/reduce/reduceSetting";
import {coupon_record} from "../containers/Mine/couponRecord/reduce/reduceCouponRecord";

export default AllReducers = combineReducers({
    nav: nav,
    globalInfo:globalInfo,
    coupon:coupon,
    setting:setting,
    coupon_record:coupon_record,

});
