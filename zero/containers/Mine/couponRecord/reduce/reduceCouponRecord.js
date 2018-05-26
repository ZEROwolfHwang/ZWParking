/**
 * Created by zerowolf Date: 2018/5/25 Time: 下午3:57
 */
export const TypesRecord = {
    COUPON_RECORD_NAV: 'COUPON_RECORD_NAV',
    COUPON_RECORD_GET_DATA_ENTER: 'COUPON_RECORD_GET_DATA_ENTER',
    COUPON_RECORD_SEND_DATA_ENTER: 'COUPON_RECORD_SEND_DATA_ENTER',
    COUPON_RECORD_GET_DATA: 'COUPON_RECORD_GET',
    COUPON_RECORD_SEND_DATA: 'COUPON_RECORD_SEND',
};

export const coupon_record = (state = {}, action) => {
    switch (action.type) {
        case TypesRecord.COUPON_RECORD_NAV:
            console.log(action.nav);
            return Object.assign(
                {},
                action,
                {recordNav: action.nav}
            );
            case TypesRecord.COUPON_RECORD_GET_DATA:
            console.log(action.data);
            return Object.assign(
                {},
                action,
                {record_get: action.data}
            );
        case TypesRecord.COUPON_RECORD_SEND_DATA:
            return Object.assign(
                {},
                action,
                {record_send: action.data}
            );
        default :
            return state;
    }
};

export const actions_conpon_record = {
    putCouponRecord_Get: (data) => ({type: TypesRecord.COUPON_RECORD_GET_DATA, data}),
    putCouponRecord_Send:(data)=>({type:TypesRecord.COUPON_RECORD_GET_DATA, data}),
    putCouponRecord_nav:(nav)=>({type:TypesRecord.COUPON_RECORD_NAV, nav})
}
