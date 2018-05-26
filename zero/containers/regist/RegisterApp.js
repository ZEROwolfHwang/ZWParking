/**
 * Created by zerowolf Date: 2018/5/11 Time: 上午10:51
 */
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
    StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyTabView from "../../views/MyTabView";
import BaseComponent from "../../views/BaseComponent";
import MyTextInput from "../../views/MyTextInput";
import MyButtonView from "../../views/MyButtonView";
import LinearGradient from "react-native-linear-gradient";
import RegisterMerchant from "./RegisterMerchant";
import {fetchRequest} from "../../utils/FetchUtil";
import ToastUtil from "../../utils/ToastUtil";
import MyTextInputWithIcon from "../../views/MyTextInputWithIcon";
import {actions_global} from "../../reduces/globalReduce";
import MerchantInfo from "../Mine/merchantInfo/MerchantInfo";
import {checkIsNull, checkMobile} from "../../utils/CheckUitls";
import NavigationUtil from "../../utils/NavigationUtil";
import {NavigationActions} from "react-navigation";

const {width, height} = Dimensions.get('window');

class RegisterApp extends BaseComponent {

    //Todo
    constructor(props) {
        super(props);
        this.state = {
            // username: '13244447777',
            username: '13211112222',
            // username: '13262975236',
            // username: '13222223333',
            password: 'qqqqqq',
            // password: '987654'
            // password: '147258'

        }
    }
    componentDidMount(){
        // this.pressLogin();
        console.log(global.zWidth);
        console.log(global.ScreenUtil);
    }




    componentWillMount() {

        var arr = ['a', 'b', 'c', 'd', 'e', 'a', 'e'];

        var arr1 = ['a', 'b', 'c', 'g', 'h','b','c'];

        var array = [];


        console.log(new Set(arr1));

        array.push(...new Set(arr));
        array.push(...new Set(arr1));

        // var arr = [
        //     {name: 'aaa', pwd: '111'},
        //     {name: 'aaa', pwd: '111'},
        //     {name: 'aaa', pwd: '222'},
        //     {name: 'ccc', pwd: '111'},
        //     {name: 'ccc', pwd: '111'},
        //     {name: 'eee', pwd: '111'},
        //     {name: 'fff', pwd: '111'},
        // ]


        console.log(this.unique(array));
    }

    unique(arr) {
        return Array.from(new Set(arr));
        // return [...new Set(arr)];
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <Image source={require('../../../resource/image/back.png')}
                       style={{width, height, position: 'absolute'}}/>

                <View
                    style={{flex: 1, alignItems: 'center'}}>

                    <Image source={require('../../../resource/image/Bitmap.png')}
                           style={{width: 133, height: 66, marginTop: 100}}
                           resizeMode={'contain'}/>


                    <StatusBar
                        hidden={false}
                        translucent={true}
                        barStyle={'light-content'}//'default', 'light-content', 'dark-content'
                        backgroundColor={'#fff6fd00'}
                        networkActivityIndicatorVisible={false}
                    />

                    <MyTextInputWithIcon
                        imageURL={'user_icon'}
                        style={{marginTop: 46}}
                        placeholder={'用户名/手机号'}
                        iconName={'phone'}
                        onChangeText={(text) => {
                            this.setState({
                                username: text
                            })
                        }}
                    />
                    <MyTextInputWithIcon
                        imageURL={'mm_icon'}
                        secureTextEntry={true}
                        placeholder={'登录密码'}
                        onChangeText={(text) => {
                            this.setState({
                                password: text
                            })
                        }}
                    />

                    <View style={{
                        width, height: 40, justifyContent: 'center', alignItems: 'flex-end',
                        paddingRight: (width - 220) / 2
                    }}>


                        <Text
                            style={{
                                fontSize: 14,
                                color: 'white',
                                textAlign: 'right',
                                alignSelf: 'flex-end'
                            }}
                            onPress={this.pressForgetPsw}>{`忘记密码?`}</Text>

                    </View>


                    <MyButtonView style={{marginTop: 5}} title={'登录'}
                                  onPress={this.pressLogin}/>
                    <Text
                        style={{
                            fontSize: 14,
                            color: '#9AB6FC',
                            padding: 10,
                            paddingRight: 30,
                            textAlign: 'center',
                            alignSelf: 'center'
                        }}
                    >{`没有账号? `}<Text style={{color: 'white'}}
                                     onPress={this.pressRegister}>点击注册</Text></Text>

                </View>

            </View>);
    }

    /**
     * 点击登录
     */
    pressLogin = () => {
        if (!checkIsNull('用户名/手机号', this.state.username)) {
            return;
        }

        if (!checkIsNull('登录密码', this.state.password)) {
            return;
        }


        var postJson = {
            loginName: this.state.username,
            password: this.state.password
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

                    // this.props.navigation.navigate('MainTab');
                    // this.props.navigation.navigate('TabCoupon');

                    // NavigationUtil
                    // this.props.navigation.navigate('MainTab');
                    // this.props.navigation.navigate('TabCoupon');
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [  // 栈里的路由信息会从 Home->HomeTwo 变成了 Bill->BillTwo
                            NavigationActions.navigate({routeName: 'MainTab'}),
                            // NavigationActions.navigate({ routeName: 'TabCoupon'})
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);
                } else {
                    console.log(res.errmsg);
                    ToastUtil.showShort(res.errmsg)
                }
            })
            .catch(err => {
                console.log(err);
                ToastUtil.showShort(err)
            })

    };

    /**
     * 忘记密码
     */
    pressForgetPsw = () => {
        this.props.navigation.navigate('ForgetPsw');
    };
    /**
     * 点击注册
     */
    pressRegister = () => {
        this.props.navigation.navigate('RegisterMerchant');
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterApp);

