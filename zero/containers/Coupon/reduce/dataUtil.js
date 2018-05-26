/**
 * Created by zerowolf Date: 2018/5/18 Time: 下午4:23
 * @param couponList
 * @return {Array}
 * 拿到去重的所有停车场的对象,包含状态
 */
const getSingleParkList = (couponList) => {
    console.log(couponList);

    this.packList = [];

    this.parkNameList = [];
    for (const couponItem of couponList) {
        this.packList.push(...couponItem.parkList);
        for (const parkItem of couponItem.parkList) {
            this.parkNameList.push(parkItem.parkName)
        }
    }
    var parkList = [];
    let parkNameList = new Set(this.parkNameList);

    for (const parkNameItem of parkNameList) {
        parkList.push({
            parkName: parkNameItem,
            isSelected: true
        })
    }

    // let parkList = Array.from(new Set(this.parkNameList));

    return parkList;

};

/**
 * 被选中的不重复的停车场名称的集合
 * @param parkList
 * @returns {Array}
 */
const getSelectedParkNameList = (parkList) => {
    var parkNameList = [];
    for (const parkItem of parkList) {
        if (parkItem.isSelected) {
            parkNameList.push(parkItem.parkName);
        }
    }
    return parkNameList;
}


/**
 * 通过选中的停车场确定应该显示哪些优惠券并返回
 * @param allCouponList
 * @param parkNameList
 */
const getShowCouponList = (allCouponList, parkNameList) => {

    var showCouponList = [];

    for (const parkName of parkNameList) {
        for (const couponItem of allCouponList) {
            for (const parkItem of couponItem.parkList) {
                let parkNameNew = parkItem.parkName;
                if (parkName === parkNameNew) {
                    showCouponList.push({
                        parkName: parkName,
                        couponItem: couponItem
                    });
                    break;
                }
            }
        }
    }

    console.log(showCouponList);
    return showCouponList;
};
/**
 * 当前的停车场是否全部选中
 * @param parkList
 * @returns {boolean}
 */
const parkIsAllSelect = (parkList)=>{
    var isAllSelect = [];
    for (const parkItem of parkList) {
        // isAllSelect = isAllSelect + parkItem.isSelected;
        isAllSelect.push(parkItem.isSelected)
    }
    console.log(isAllSelect);
    console.log(isAllSelect.toString());
    if (isAllSelect.toString().indexOf('false')===-1) {
        return true;
    } else {
        return false
    }
}

export {
    parkIsAllSelect,
    getSingleParkList,
    getSelectedParkNameList,
    getShowCouponList
};
