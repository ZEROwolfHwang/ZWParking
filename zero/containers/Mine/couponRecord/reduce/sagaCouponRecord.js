/**
 * Created by zerowolf Date: 2018/5/25 Time: 下午3:57
 */


import {fork, take, put, call, race, cancel} from "redux-saga/effects";
import {delay} from "redux-saga";
import ToastUtil from "../../../../utils/ToastUtil";
import {fetchRequest} from "../../../../utils/FetchUtil";
import {actions_conpon_record, TypesRecord} from "./reduceCouponRecord";


/**
 * 获取并分发领券记录
 * @param url
 * @returns {IterableIterator<CallEffect | *>}
 */
function* dealWithRecordGet(url) {
    try{

        let result = yield call(fetchRequest, url, 'GET');
        console.log(result);
        let couponRecordList = result.appHistoryCouponList;

        yield put(actions_conpon_record.putCouponRecord_Get(couponRecordList));


    }catch (err) {
        ToastUtil.showShort('获取领券记录数据发生错误'+err)
    }
}

/**
 * 发放优惠券记录
 * @param url
 * @returns {IterableIterator<CallEffect | *>}
 */
function* dealWithRecordSend(url) {
    try{

        let result = yield call(fetchRequest, url, 'GET');
        // let couponRecordList = result.appHistoryCouponList;
        //
        // yield put(actions_conpon_record.putCouponRecord_Get(couponRecordList));
        //

    }catch (err) {
        ToastUtil.showShort('发放记录数据获取错误'+err)
    }
}

/**
 * 监听拿到领券记录
 * @returns {IterableIterator<*>}
 */
export function* watchCouponRecord_Get() {
    // while (true) {
    while (true) {
        const {
            url
        } = yield  take(TypesRecord.COUPON_RECORD_GET_DATA_ENTER);
        yield fork(dealWithRecordGet,url)

    }
}
/**
 * 监听拿到领券记录
 * @returns {IterableIterator<*>}
 */
export function* watchCouponRecord_Send() {
    // while (true) {
    while (true) {
        const {
            url
        } = yield  take(TypesRecord.COUPON_RECORD_SEND_DATA_ENTER);
        yield fork(dealWithRecordSend,url)

    }
}
