/**
 * Created by zerowolf Date: 2018/5/18 Time: 下午3:10
 */
/**
 * Created by zerowolf Date: 2018/5/18 Time: 下午2:42
 */
export const Types = {
    ACTION_COUPON_PAGE_STATUS: 'ACTION_COUPON_PAGE_STATUS',  //网络获取优惠券的入口
    ACTION_COUPON_FETCH_ENTER: 'ACTION_COUPON_FETCH_ENTER',  //网络获取优惠券的入口
    ACTION_COUPON_FETCH: 'ACTION_COUPON_FETCH',
    ACTION_SELECTED_PARK: 'ACTION_SELECTED_PARK',           //不重复停车场的被选中状态,含两个参数
    ACTION_COUPON_SHOW: 'ACTION_COUPON_SHOW',               //优惠券界面通过筛选过后显示的
    ACTION_COUPON_SHOW_ITEM_ENTER: 'ACTION_COUPON_SHOW_ITEM_ENTER', //点选单个停车场条目
    ACTION_COUPON_SHOW_ALL_ENTER: 'ACTION_COUPON_SHOW_ALL_ENTER',   //选择全部/或否
    // ACTION_COUPON_POLLING_ENTER: 'ACTION_COUPON_POLLING_ENTER',   //开始与结束的轮询入口
    // ACTION_COUPON_POLLING_OVER: 'ACTION_COUPON_POLLING_OVER',   //开始与结束的轮询结束
    // ACTION_COUPON_POLLING_STATUS: 'ACTION_COUPON_POLLING_STATUS',   //轮询状态
};

// const initialState = {isShowQRCode}

export const coupon = (state = {}, action) => {
    switch (action.type) {
        // case Types.ACTION_COUPON_PAGE_STATUS:
        //     console.log(action.isShowQRCode);
        //     return Object.assign(
        //         {},
        //         state,
        //         {
        //             isShowQRCode:action.isShowQRCode,
        //             scanStatus:action.scanStatus,  // -1 扫码失败   0  正在扫码   1  扫码成功
        //             }
        //     );
        case Types.ACTION_COUPON_FETCH:
            // console.log(action.data);
            return Object.assign(
                {},
                state,
                {dataCoupon: action.data}
            );
        case Types.ACTION_COUPON_SHOW:
            console.log(action.showData);
            return Object.assign(
                {},
                state,
                {dataShowCoupon: action.showData}
            );

        case Types.ACTION_SELECTED_PARK:
            console.log(action.parkList);
            console.log(action.parkNameList);
            return Object.assign(
                {},
                state,
                {
                    parkList: action.parkList,             //所有不重复停车场的名称以及状态
                    parkNameList: action.parkNameList           //所有被选中的停车场的名称
                }
            );
        // case Types.ACTION_COUPON_POLLING_STATUS:
        //     console.log(action.bool);
        //     return Object.assign(
        //         {},
        //         state,
        //         {
        //             isPollingOver: action.bool
        //         }
        //     );

        default:
            return state;
    }
};

export const actions_coupon = {
    // setCouponPageStatus: (isShowQRCode,scanStatus) => ({type: Types.ACTION_COUPON_PAGE_STATUS, isShowQRCode:isShowQRCode,scanStatus:scanStatus}),
    getCouponList: (data) => ({type: Types.ACTION_COUPON_FETCH, data}),
    getSelectedPark: (parkList, parkNameList) => ({
        type: Types.ACTION_SELECTED_PARK,
        parkList,
        parkNameList
    }),
    getShowCouponList: (showData) => ({type: Types.ACTION_COUPON_SHOW, showData}),
    // getCouponPollingStatus: (bool) => ({type: Types.ACTION_COUPON_POLLING_STATUS, bool}),
    // stopCouponPolling:()=>({type: Types.ACTION_COUPON_POLLING_OVER})
    // getCouponFetchStart:(url)=>({type:Types.ACTION_COUPON_FETCH_ENTER,url})

};
