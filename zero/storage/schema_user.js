/**
 *
 * Created by zerowolf on 2017/11/14.
 */
import Realm from 'realm';
import realm from './MyRealm';
import ToastUtil from "../utils/ToastUtil";

export class UserSchema extends Realm.Object {

}

UserSchema.schema = {
    name: 'User',
    properties: {
        username: 'string',                 //用户姓名
        CardLen: 'int',                 //用户姓名
        IDCard: 'string',  // 身份证号
        phone: 'string',   //预留手机号

    }
};

const getUserList = (phone) => {
    // var dataList = [];
    let UserList = realm.objects('User');
    let ts = UserList.filtered(`phone == '${phone}'`);
    if (ts.length>0) {
        return ts[0];
    } else {
        return null;
    }
};




export {
    getUserList,
};

