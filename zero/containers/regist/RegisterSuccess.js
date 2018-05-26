import {fetchRequest} from "../../utils/FetchUtil";

/**
 * Created by zerowolf Date: 2018/5/11 Time: 下午3:07
 */
const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView,
    StatusBar
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BaseComponent from "../../views/BaseComponent";
import LinearGradient from "react-native-linear-gradient";
import MyButtonView from "../../views/MyButtonView";
import ToastUtil from "../../utils/ToastUtil";
import {actions_global} from "../../reduces/globalReduce";

class RegisterSuccess extends BaseComponent {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        //type:0 //忘记密码  1 // 注册成功
        this.params = this.props.navigation.state.params;
        // this.params = {type: 1, username: '13244447777',password: '147258'};
        console.log(this.params.type);
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <Image source={require('../../../resource/image/background.png')}
                       style={{width, height, position: 'absolute'}}/>

                <StatusBar
                    hidden={false}
                    translucent={true}
                    barStyle={'light-content'}//'default', 'light-content', 'dark-content'
                    backgroundColor={'#fff6fd00'}
                    networkActivityIndicatorVisible={false}
                />


                <View style={{
                    width: width,
                    marginTop:110,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 30,
                        color: 'white',
                        textAlign: 'center',
                        marginBottom: 40
                    }}>{`${this.params.type === 0 ? '密码修改成功' : '注册成功'}`}</Text>
                </View>

                <View style={{flex:1}}/>

                <MyButtonView style={{marginBottom:70}} title={'完成'} onPress={this.pressSuccess}/>

            </View>)
    }

    pressSuccess = () => {
        if (this.params.type === 1) {
            var postJson = {
                loginName: this.params.username,
                password: this.params.password
            }

            fetchRequest('/login/bizMerLogin', 'POST', postJson)
                .then(res => {
                    console.log(res);
                    if (res.ret === 0) {
                        console.log('登陆成功');
                        var globalInfo = {
                            token: res.token,
                            merCode: res.merCode,
                            roleIds: res.roleIds,
                            loginName: res.loginName,
                            phone: res.phone
                        }
                        this.props.initGlobalInfo(globalInfo)

                        this.props.navigation.navigate('MainTab');
                        // this.props.navigation.navigate('MerchantInfo');


                    } else {
                        console.log(res.errmsg);
                        ToastUtil.showShort(res.errmsg)
                    }
                })
                .catch(err => {
                    console.log(err);
                    ToastUtil.showShort(err)
                })

        } else {
            this.props.navigation.navigate('RegisterApp');
        }

    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initGlobalInfo: actions_global.getGlobalInfo
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterSuccess);

