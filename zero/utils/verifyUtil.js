/**
 * Created by zerowolf Date: 2018/5/14 Time: 下午5:07
 */
import CountdownUtil from "./CountdownUtil";
import ToastUtil from "./ToastUtil";
import {fetchRequest} from "./FetchUtil";
import {checkMobile} from "./CheckUitls";

/**
 * 获取码验证
 */
const pressVerify = (phone, isSentVerify, callBack1, callBack2, callBack3) => {

    if (!checkMobile(phone)) {
        return;
    }

    if (phone.length === 11) {
        if (isSentVerify === true) {
            // 倒计时时间
            let countdownDate = new Date(new Date().getTime() + 60 * 1000);
            // 点击之后验证码不能发送网络请求
            callBack1();

            fetchRequest(`/register/getMessageCode?phone=${phone}&&type=${82}`, 'GET')//80-运行商,81-场库商户,82-商圈商户,83-App用户
                .then(res => {
                    console.log(res);
                    if (res.ret === 0) {

                        CountdownUtil.setTimer(countdownDate, (time) => {
                            // console.log(time.sec);
                            callBack2(time);

                        });
                    } else {
                        callBack3();

                        ToastUtil.showShort(res.errmsg);
                    }
                }).catch(err => {
                callBack3();

                // this.setState({
                //     isSentVerify: true,
                //     timerTitle: '重新获取'
                // })
                console.log(err);
            });

        }
    } else {
        ToastUtil.showShort('请输入正确的手机号');
    }
}

export {
    pressVerify
}
