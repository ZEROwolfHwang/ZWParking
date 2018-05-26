import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView
} from 'react-native';
import BaseComponent from "../../views/BaseComponent";
import MyTabView from "../../views/MyTabView";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyTextInput from "../../views/MyTextInput";
import LinearGradient from "react-native-linear-gradient";
import MyButtonView from "../../views/MyButtonView";
import RegisterSuccess from "./RegisterSuccess";
import RegisterMerchantNext from "./RegisterMerchantNext";
import ToastUtil from "../../utils/ToastUtil";
import MyTextInputWithIcon from "../../views/MyTextInputWithIcon";
import {checkIsNull, checkMobile, checkPassword} from "../../utils/CheckUitls";

const {width, height} = Dimensions.get('window');
class RegisterMerchant extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            passwordSure: '',
        }
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>

                <Image source={require('../../../resource/image/back.png')}
                       style={{width, height, position: 'absolute'}}/>

                <MyTabView title={'注册商户'} backgroundColor={'transparent'} cutLineHeight={0.5}
                           isTransparent={true}
                           navigation={this.props.navigation}/>


                <MyTextInputWithIcon
                    style={{marginTop: 110}}
                    placeholder={'用户名'}
                    imageURL={'user_icon'}
                    onChangeText={(text) => {
                        this.setState({
                            username: text
                        })
                    }}
                />
                <MyTextInputWithIcon
                    secureTextEntry={true}
                    placeholder={'密码'}
                    imageURL={'mm_icon'}
                    onChangeText={(text) => {
                        this.setState({
                            password: text
                        })
                    }}
                />
                <MyTextInputWithIcon
                    secureTextEntry={true}
                    placeholder={'确认密码'}
                    imageURL={'mm_icon'}
                    onChangeText={(text) => {
                        this.setState({
                            passwordSure: text
                        })
                    }}
                />
                <MyButtonView title={'下一步'}
                              onPress={this.pressNext}/>
            </View>
        )
    }

    /**
     * 密码大于六位且不能有汉字
     *
     */
    pressNext = () => {

        if (!checkIsNull('用户名',this.state.username)) {
            return;
        }

        var pattern = /^(((13[0-9]{1})|15[0-9]{1}|18[0-9]{1}|)+\d{8})$/;
        if (pattern.test(this.state.username)) {
            ToastUtil.showShort('避免用户名与登录手机号冲突,请使用手机号之外的格式创建用户名');
            return;
        }


        if (!checkPassword(this.state.password, this.state.passwordSure)) {
            return;
        }

        this.props.navigation.navigate('RegisterMerchantNext', {
            username: this.state.username,
            password: this.state.password
        });

    }
}
const mapStateToProps = (state) => {
    return {
        nav:state.nav
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterMerchant);

