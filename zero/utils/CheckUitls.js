/**
 * Created by zerowolf Date: 2018/5/16 Time: 下午3:24
 */
import ToastUtil from "./ToastUtil";

const checkFixPhone = (phone) => {
    if (phone != '') {
        var pattern = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
        if (pattern.test(phone) == false) {
            ToastUtil.showShort("请正确填写办公电话!");
            return false;
        } else {
            return true;
        }
    } else {
        ToastUtil.showShort('固定电话不能为空')
        return false;
    }
};
const checkMobile = (mobile) => {
    console.log(mobile);
    if (mobile != '') {
        var pattern = /^(((13[0-9]{1})|15[0-9]{1}|18[0-9]{1}|)+\d{8})$/;
        if (pattern.test(mobile) == false) {
            ToastUtil.showShort(`手机号 ${mobile} 格式错误`);
            console.log('手机格式错误');
            return false;
        } else {
            console.log('手机格式正确');
            return true;
        }
    } else {
        ToastUtil.showShort('手机号码不得为空')
        return false
    }
};

const checkIsNull = (title, content) => {
    if (content != '' && content.length > 0) {
        return true;
    } else {
        ToastUtil.showShort(`${title}不得为空`);
        return false;
    }
};
const checkPassword = (newPassword, passwordSure) => {

    var reg = /^[\w]{6,21}$/

    if (newPassword.match(reg)) {
        if (newPassword === passwordSure) {
            return true;
        } else {
            ToastUtil.showShort('两次输入密码不统一')
            return false
        }
    } else {
        ToastUtil.showShort('密码格式错误,密码由字母,数字和下划线_组成且不小于6位数');
        return false;
    }
};

export {
    checkFixPhone,
    checkMobile,
    checkIsNull,
    checkPassword
};
