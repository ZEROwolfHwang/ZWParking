/**
 *
 * Created by zerowolf on 2017/11/14.
 */
import Realm from 'realm';
import MyRealm from './MyRealm';

export class HabitSchema extends Realm.Object {

}

HabitSchema.schema = {
    name: 'Habits',
    properties: {
        merCode: 'string',
        parkName: 'string',
        isSelected: {type: 'bool', default: true}
    }
};

const getAllParkFromSchema = (merCode) => {
    // var dataList = [];
    let allParkList = MyRealm.objects('Habits');
    let ts = allParkList.filtered(`merCode == '${merCode}'`);
    var allParkRows = [];
    if (ts.length > 0) {
        for (const item of ts) {
            allParkRows.push({
                parkName: item.parkName,
                isSelected: item.isSelected
            })
        }
    }
    console.log(allParkRows);
    return allParkRows;
};

/**
 * 将当前商户所有的停车场选择项全部设为false
 * @param merCode
 */
const setAllParkIsFalse = (merCode) => {

    MyRealm.write(() => {
        let objects = MyRealm.objects('Habits');
        let filterList = objects.filtered(`merCode == '${merCode}'`);
        for (const parkItem of filterList) {
            parkItem.isSelected = false;
        }
    });
};

/**
 * 将当前商户所有的停车场选择项全部设为false
 * @param merCode
 */
const setAllParkIsTrue = (merCode) => {

    MyRealm.write(() => {
        let objects = MyRealm.objects('Habits');
        let filterList = objects.filtered(`merCode == '${merCode}'`);
        for (const parkItem of filterList) {
            parkItem.isSelected = true;
        }
    });
};

// Todo 停车场智能用户习惯 没有了的停车场 删除用户习惯  有的添加
/**
 * 将当前商户所有的停车场选择项全部设为false
 * @param merCode
 * @param parkList
 */
const setResetAllParkList= (merCode,parkList) => {
    console.log(parkList);
    MyRealm.write(() => {
        let objects = MyRealm.objects('Habits');
        let filterList = objects.filtered(`merCode == '${merCode}'`);
        MyRealm.delete(filterList);

        for (const parkItem of parkList) {
            MyRealm.create('Habits',{
                merCode:merCode,
                parkName:parkItem.parkName,
                isSelected: parkItem.isSelected
            })
        }
    });

    let objects = MyRealm.objects('Habits');
    let filterList = objects.filtered(`merCode == '${merCode}'`);
    for (let i in filterList) {
        console.log(filterList[i]);
    }

};
/**
 * 当前商户停车场条目被点击时  修改数据库
 * @param merCode
 * @param parkName
 */
const setChangeItemParkList= (merCode,parkName) => {
    console.log(parkName);
    MyRealm.write(() => {
        let objects = MyRealm.objects('Habits');
        for (let objectsKey in objects) {
            console.log(objects[objectsKey]);
        }

        let filterList = objects.filtered(`merCode == '${merCode}' and parkName == '${parkName}'`);

        console.log(filterList.length);
        console.log(filterList[0]);

        if (filterList.length > 0) {
            filterList[0].isSelected = !filterList[0].isSelected;
        }
    });
};


/**
 * 根据传递过来的选择状态修改商户的停车场选择项数据
 * @param merCode
 */
const setParkListItemStatus = (merCode,itemData) => {
    let parkName = itemData.parkName;
    MyRealm.write(() => {
        let objects = MyRealm.objects('Habits');
        let filterList = objects.filtered(`merCode == '${merCode}' and parkName = '${parkName}'`);

        if (filterList.length > 0) {
            filterList[0].isSelected = !filterList[0].isSelected
        }
    });
};



export {
    getAllParkFromSchema,
    setAllParkIsFalse,
    setAllParkIsTrue,
    setParkListItemStatus,
    setResetAllParkList,
    setChangeItemParkList
};

