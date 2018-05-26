/**
 * Created by zerowolf Date: 2018/5/18 Time: 下午3:06
 */
import {fork, all} from "redux-saga/effects";
import {takeEvery} from "redux-saga";
import {
    watchCouponFetch, watchCouponPolling,
    watchCouponShowAllChange,
    watchCouponShowChange, watchCouponShowItemChange
} from "../containers/Coupon/reduce/sagaCoupon";
import {watchSettingBack2Main} from "../containers/Mine/pages/reduce/sagaSetting";
import {
    watchCouponRecord_Get,
    watchCouponRecord_Send
} from "../containers/Mine/couponRecord/reduce/sagaCouponRecord";

// import {watchCardList, watchLoginStatus} from "./saga";

function* rootSaga() {
    // yield fork(watchCouponShowChange)
    yield [

        fork(watchCouponFetch),
        fork(watchSettingBack2Main),
        fork(watchCouponShowAllChange),
        fork(watchCouponShowItemChange),
        fork(watchCouponPolling),

        fork(watchCouponRecord_Get),
        fork(watchCouponRecord_Send),
    ];
}


export default rootSaga
