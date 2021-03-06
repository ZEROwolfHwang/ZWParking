/**
 * Created by zerowolf Date: 2018/5/3 Time: 上午11:28
 */

import Realm from 'realm';
import realm from "./MyRealm";

export class CardSchema extends Realm.Object {

}

CardSchema.schema = {
    name: 'Card',
    properties: {
        loginPhone: 'string',   //登录手机号
        bankPhone: 'string',   //预留手机号
        bankCard: {type: 'string', default: '62284'},//银行卡号
        bank: {type: 'string', default: '招商银行'},//所属银行
        cardType: {type: 'int', default: 0},//0  支付卡     1 储蓄卡
        cardDefault: {type: 'int', default: 0},//0  其他卡     1 默认卡
    }
};

/**
 * 拿到支付卡
 * @returns {Realm.Results<T>}
 * @param loginPhone
 */
const getPayCardList = (loginPhone) => {
    let cardPayList = [];
    let allCard = realm.objects('Card');
    console.log(allCard);
    let filterList = allCard.filtered(`cardType == 0 and loginPhone == '${loginPhone}'`);
    for (const t of filterList) {
        let cardBean = new CardSchema(t.loginPhone, t.bankPhone,t.bankCard, t.bank, t.cardType, t.cardDefault);
        cardPayList.push(cardBean);
    }
    return cardPayList;
};

/**
 * 拿到结算卡   cardType  1  表示结算卡
 * @returns {Realm.Results<T>}
 */
const getDebitCardList = (loginPhone) => {
    let cardDebitList = [];
    let allCard = realm.objects('Card');
    console.log(allCard);
    let filterList = allCard.filtered(`cardType == 1 and loginPhone == '${loginPhone}'`);
    for (const t of filterList) {
        let cardBean = new CardSchema(t.loginPhone,t.bankPhone, t.bankCard, t.bank, t.cardType, t.cardDefault);
        cardDebitList.push(cardBean);
    }
    return cardDebitList;
};

/**
 * 拿到默认结算卡   cardType  1  表示结算卡
 * @returns {Realm.Results<T>}
 */
const getDebitCardDefault = (loginPhone) => {
    // let cardDebitList = [];
    let allCard = realm.objects('Card');
    console.log(allCard);
    let filterList = allCard.filtered(`cardType == 1 and cardDefault == 1 and loginPhone == '${loginPhone}'`);
    // for (const t of filterList) {
        let cardBean = new CardSchema(filterList[0].loginPhone,filterList[0].bankPhone, filterList[0].bankCard,
            filterList[0].bank, filterList[0].cardType, filterList[0].cardDefault);
        // cardDebitList.push(cardBean);
    // }
    return cardBean;
};

/**
 * 拿到默认支付卡   cardType  0  表示支付卡
 * @returns {Realm.Results<T>}
 */
const getPayCardDefault = (phone) => {
    // let cardDebitList = [];
    let allCard = realm.objects('Card');
    console.log(allCard);
    let filterList = allCard.filtered(`cardType == 0 and cardDefault == 1 and loginPhone == '${phone}'`);
    // for (const t of filterList) {
        let cardBean = new CardSchema(filterList[0].loginPhone, filterList[0].bankPhone,filterList[0].bankCard,
            filterList[0].bank, filterList[0].cardType, filterList[0].cardDefault);
        // cardDebitList.push(cardBean);
    // }
    return cardBean;
};
/**
 * 拿到支付卡
 * @param phone
 * @returns {Realm.Results<T>}
 */
const getCardList = (phone) => {
    let allCard = realm.objects('Card');
    console.log(allCard);
    let filterList = allCard.filtered(`loginPhone == '${phone}'`);
    // for (const t of filterList) {
    //     console.log(t);
    // }
    return filterList;
};

const payCardIsNull = (phone)=>{
    let allCard = realm.objects('Card');
    console.log(allCard);
    let filterList = allCard.filtered(`loginPhone == '${phone}' and cardType == 0`);
    if (filterList.length > 0) {
        return true;
    } else {
        return false;
    }

}




export {
    getCardList,
    getPayCardList,
    getDebitCardList,
    getDebitCardDefault,
    getPayCardDefault,
    payCardIsNull
}
