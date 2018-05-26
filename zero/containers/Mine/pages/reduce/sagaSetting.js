/**
 * Created by zerowolf Date: 2018/5/23 Time: 下午2:52
 */



/**
 * Created by zerowolf Date: 2018/5/18 Time: 下午3:06
 */
/**
 * Created by zerowolf Date: 2018/5/11 Time: 下午6:09
 */

import {fork, take, put, call} from "redux-saga/effects";
import ToastUtil from "../../../../utils/ToastUtil";
import {Types} from "./reduceSetting";


/**
 * 网络请求通过过后对数据的处理(可能会考虑本地用户操作习惯的问题,待加)
 * @param url
 * @param merCode  商户唯一ID
 * @returns {IterableIterator<*>}
 */
export function* requestCoupon(url, merCode) {
    try {



        // let couponData = yield call(fetchRequest, url, 'GET');
        // let allCouponList = couponData.availableCouponList;
        //
        // yield put(actions_coupon.getCouponList(allCouponList)); //分发网络请求中拿到的所有数据
        //
        // let singleParkList = getSingleParkList(allCouponList);//取出所有不重复的停车场格式为{parkName: parkNameItem, isSelected: true}
        //
        // let allParkFromSchema = getAllParkFromSchema(merCode);//从数据库中取出存储的不重复停车场
        //
        // let selectedParkNameList;//取出所有选中的不重复的停车场名
        // if (singleParkList.length === allParkFromSchema.length) {
        //     selectedParkNameList = getSelectedParkNameList(allParkFromSchema);
        //     yield put(actions_coupon.getSelectedPark(allParkFromSchema, selectedParkNameList));//分发所有不重复的停车场
        // } else {
        //     //若最新加载的数据跟数据库长度不同 则用最新的数据且重写数据库
        //     selectedParkNameList = getSelectedParkNameList(singleParkList);
        //     setResetAllParkList(merCode, singleParkList);
        //     yield put(actions_coupon.getSelectedPark(singleParkList, selectedParkNameList));//分发所有不重复的停车场
        // }


        // // todo  以下可能会考虑本地数据有缓存的情况
        // //优惠券界面用到的数据
        //
        // //配置界面用到的数据(配置界面的数据改变会改变优惠券的界面)
        // console.log(singleParkList);
        //
        //
        // let showCouponList = getShowCouponList(allCouponList, selectedParkNameList);
        // console.log(showCouponList);
        // yield put(actions_coupon.getShowCouponList(showCouponList));


    } catch (error) {
        console.log('网络故障' + error);
        ToastUtil.showShort('网络故障' + error);
    }
}

/**
 * 点击退出到登录界面时处理缓存数据(清空)
 * @param allCouponList
 * @param parkList
 * @returns {IterableIterator<*>}
 */
export function* dealWithDataAfterBack() {
    try {
        console.log('tuichu saga');

        // let selectedParkNameList = getSelectedParkNameList(parkList);
        // yield put(actions_coupon.getSelectedPark(parkList, selectedParkNameList));
        //
        // console.log(allCouponList);
        // console.log(parkList);
        // let showCouponList = getShowCouponList(allCouponList, selectedParkNameList);
        // yield put(actions_coupon.getShowCouponList(showCouponList));

    } catch (error) {
        console.log(error);
        ToastUtil.showShort('发生错误' + error);
    }
}

export function* watchSettingBack2Main() {
    while (true) {
        const {
        } = yield take(Types.ACTION_SETTING_BACK_2_MAIN);
        yield fork(dealWithDataAfterBack);
    }
}

