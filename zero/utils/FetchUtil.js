import ToastUtil from "./ToastUtil";

let common_url = 'http://dev.phtonspark.com/app/v1';  //服务器地址
/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @return 返回Promise
 */

export const fetchRequest = (url, method, params) => {

    let header = {
        "Content-Type": "application/json",
        // ;charset=UTF-8
        // "Content-Type": "multipart/form-data;charset=UTF-8",
        // "accesstoken": token  //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
    };

    console.log('request url:', url, method,params);  //打印请求参数
    if (!params) {   //如果网络请求中没有参数
        return new Promise(function (resolve, reject) {
            fetch(common_url+url, {
                method: method,
                headers:header
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);  //网络请求成功返回的数据
                    resolve(responseData);
                })
                .catch((err) => {
                    ToastUtil.showShort(err);
                    console.log(err);
                    reject(err);
                });

        });
    } else {   //如果网络请求中带有参数
        return new Promise(function (resolve, reject) {
            fetch(common_url + url, {
                method: method,
                headers:header,
                body:JSON.stringify(params)//body参数，通常需要转换成字符串后服务器才能解析
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);   //网络请求成功返回的数据
                    resolve(responseData);
                })
                .catch((err) => {
                    ToastUtil.showShort(err);
                    console.log(err);   //网络请求失败返回的数据
                    reject(err);
                });
        });
    }
};
