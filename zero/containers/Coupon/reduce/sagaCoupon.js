/**
 * Created by zerowolf Date: 2018/5/18 Time: 下午3:06
 */
/**
 * Created by zerowolf Date: 2018/5/11 Time: 下午6:09
 */

import {fork, take, put, call, race, cancel} from "redux-saga/effects";
import {delay} from "redux-saga";
import {actions_coupon, Types} from "./reducesCoupon";
import {fetchRequest} from "../../../utils/FetchUtil";
import {getSelectedParkNameList, getShowCouponList, getSingleParkList} from "./dataUtil";
import ToastUtil from "../../../utils/ToastUtil";
import {
    getAllParkFromSchema,
    setAllParkIsFalse, setAllParkIsTrue, setChangeItemParkList,
    setResetAllParkList
} from "../../../storage/schema_cusHabit";


// import {race} from "redux-saga";


/**
 * 网络请求通过过后对数据的处理(可能会考虑本地用户操作习惯的问题,待加)
 * @param url
 * @param merCode  商户唯一ID
 * @returns {IterableIterator<*>}
 */
export function* requestCoupon(url, merCode) {
    try {
        let couponData = yield call(fetchRequest, url, 'GET');
        let allCouponList = couponData.availableCouponList;

        yield put(actions_coupon.getCouponList(allCouponList)); //分发网络请求中拿到的所有数据

        let singleParkList = getSingleParkList(allCouponList);//取出所有不重复的停车场格式为{parkName: parkNameItem, isSelected: true}

        console.log(singleParkList);

        let allParkFromSchema = getAllParkFromSchema(merCode);//从数据库中取出存储的不重复停车场

        console.log(allParkFromSchema);

        // 处理不同的用户保存的信息不一致的问题
        for (const ParkListNetItem of singleParkList) {
            for (const parkListSchemaItem of allParkFromSchema) {

                if (parkListSchemaItem.parkName === ParkListNetItem.parkName) {
                    ParkListNetItem.isSelected = parkListSchemaItem.isSelected;
                }
            }
        }

        setResetAllParkList(merCode, singleParkList);                       //重置数据库

        console.log(singleParkList);
        let selectedParkNameList = getSelectedParkNameList(singleParkList);//取出所有选中的不重复的停车场名
        yield put(actions_coupon.getSelectedPark(singleParkList, selectedParkNameList));//分发所有不重复的停车场


        // todo  以下可能会考虑本地数据有缓存的情况
        //优惠券界面用到的数据

        //配置界面用到的数据(配置界面的数据改变会改变优惠券的界面)

        console.log(selectedParkNameList);
        let showCouponList = getShowCouponList(allCouponList, selectedParkNameList);
        // console.log(showCouponList);
        yield put(actions_coupon.getShowCouponList(showCouponList));


    } catch (error) {
        console.log('网络故障' + error);
        ToastUtil.showShort('网络故障' + error);
    }
}

/**
 * 通过所有的优惠券以及选中的优惠券返回要显示的优惠券
 * @param merCode
 * @param allCouponList
 * @param parkList
 * @param showAll
 * @returns {IterableIterator<*>}
 */
// export function* getCouponShowList_all(merCode,allCouponList,parkList, showAll,action) {
export function* getCouponShowList_all(propsData, showAll) {
    try {
        // console.log(action);
        //全选
        console.log(showAll);

        let parkList = propsData.selectedParkList;
        let merCode = propsData.globalInfo.merCode;
        let allCouponList = propsData.allCouponList;


        for (const parkItem of parkList) {
            parkItem.isSelected = showAll;
        }
        if (showAll) {

            setAllParkIsTrue(merCode);
        } else {
            setAllParkIsFalse(merCode);

        }

        console.log(parkList);

        let selectedParkNameList = getSelectedParkNameList(parkList);

        let showCouponList = getShowCouponList(allCouponList, selectedParkNameList);
        console.log(showCouponList);
        yield put(actions_coupon.getSelectedPark(parkList, selectedParkNameList));

        yield put(actions_coupon.getShowCouponList(showCouponList));


    } catch (error) {
        console.log(error);
        ToastUtil.showShort('点击全选数据处理错误' + error);
    }
}

/**
 * 通过所有的优惠券以及选中的优惠券返回要显示的优惠券
 * @param merCode
 * @param allCouponList
 * @param parkList          修改过后的列表
 * @param parkName
 * @returns {IterableIterator<*>}
 */
// export function* getCouponShowList_all(merCode,allCouponList,parkList, showAll,action) {
export function* getCouponShowList_item(merCode, allCouponList, parkList, parkName) {
    try {
        console.log(parkList);

        let selectedParkNameList = getSelectedParkNameList(parkList);

        let showCouponList = getShowCouponList(allCouponList, selectedParkNameList);
        console.log(showCouponList);
        yield put(actions_coupon.getSelectedPark(parkList, selectedParkNameList));

        yield put(actions_coupon.getShowCouponList(showCouponList));

        setChangeItemParkList(merCode, parkName)

        // setResetAllParkList(merCode,parkList)

    } catch (error) {
        console.log(error);
        ToastUtil.showShort('点击条目数据处理错误' + error);
    }
}


export function* watchCouponFetch() {
    while (true) {
        const {
            url, merCode
        } = yield take(Types.ACTION_COUPON_FETCH_ENTER);
        yield fork(requestCoupon, url, merCode);
    }
}

// export function* watchCouponShowChange() {
//     while (true) {
//         const {
//             allCouponList, parkList
//         } = yield take(Types.ACTION_COUPON_SHOW_ITEM_ENTER);
//         yield fork(getCouponShowList, allCouponList, parkList);
//     }
// }

export function* watchCouponShowAllChange() {
    while (true) {
        const {
            // merCode,allCouponList,parkList, showAll, action
            propsData, showAll
        } = yield take(Types.ACTION_COUPON_SHOW_ALL_ENTER);// yield fork(getCouponShowList_all,merCode, allCouponList, parkList,showAll,action);
        yield fork(getCouponShowList_all, propsData, showAll);

    }
}

export function* watchCouponShowItemChange() {
    while (true) {
        const {
            merCode, allCouponList, parkList, parkName
        } = yield  take(Types.ACTION_COUPON_SHOW_ITEM_ENTER);
        yield fork(getCouponShowList_item, merCode, allCouponList, parkList, parkName);
    }
}


// function delay(millis) {
//     // const promise = new Promise(resolve => {
//     //     setTimeout(() =>
//     //         resolve(true), millis)
//     // });
//     // return promise;
//     return new Promise(resolve => {
//         setTimeout(resolve, millis);
//     });
// }
/*

export function* getCouponPolling(navigation,url) {
    try {
        while (true) {
            let result = yield call(fetchRequest, url, 'GET');
                yield put({type:Types.ACTION_LOG_DATA,log:result.received})
            if (result.received) {

                CountdownUtil.stop();
                // Alert.alert(navigation.toString())
                console.log(navigation);
                console.log(JSON.stringify(navigation));
                // ToastUtil.showLong(JSON.stringify(navigation))


                yield put(actions_coupon.setCouponPageStatus(false,1));
                // navigation.navigate('PageScanSuccess');

                yield put({type: Types.ACTION_COUPON_POLLING_OVER});
            } else {
                yield put(actions_coupon.setCouponPageStatus(true,0));

            }
            yield call(delay, 3000);
        }


    } catch (error) {
        console.log(error);
        ToastUtil.showShort('优惠券轮询错误' + error);

    } finally {

    }
}

/!**
 * 轮询操作监听优惠券是否被领取成功
 * @returns {IterableIterator<*>}
 *!/
export function* watchCouponPolling() {
    // while (true) {
    while (true) {
        const {
           navigation, url
        } = yield  take(Types.ACTION_COUPON_POLLING_ENTER);
        // yield fork(getCouponPolling, isPolling, url);

        // yield race({
        //     tasks: call(getCouponPolling, url),
        //     cancel: take(Types.ACTION_COUPON_POLLING_OVER)
        // });
        const sycn = yield fork(getCouponPolling,navigation, url);

        yield take(Types.ACTION_COUPON_POLLING_OVER);

        yield cancel(sycn);

    }
}
*/


