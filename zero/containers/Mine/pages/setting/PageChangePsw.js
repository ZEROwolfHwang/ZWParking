/**
 * Created by zerowolf Date: 2018/5/13 Time: 下午4:42
 */
import MyTabView from "../../../../views/MyTabView";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView
} from 'react-native';
import BaseComponent from "../../../../views/BaseComponent";
import {pressVerify} from "../../../../utils/verifyUtil";
import MyButtonView from "../../../../views/MyButtonView";
import MyTextInput from "../../../../views/MyTextInput";
import {fetchRequest} from "../../../../utils/FetchUtil";
import ToastUtil from "../../../../utils/ToastUtil";
import NavigationUtil from "../../../../utils/NavigationUtil";
import CountdownUtil from "../../../../utils/CountdownUtil";
import Item from "./Item";
import {checkPassword} from "../../../../utils/CheckUitls";
import {cusColors} from "../../../../styles/cusColor";

var globalInfo = null;


class PageChangePsw extends BaseComponent {

    constructor(props) {
        super(props);

        globalInfo = this.props.globalInfo;

        let phone = globalInfo.phone;


        this.phoneFirst = phone.substr(0, 4);
        this.phoneLast = phone.substr(phone.length - 4);
        this.state = {
            phone: '',
            verifyCode: '',
            isSentVerify: true,
            timerTitle: '发送验证码',
            passwordNew: '',
            passwordSure: ''
        }
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView title={'修改登录密码'} navigation={this.props.navigation}/>


                <View style={{
                    width,
                    marginTop: 20,
                    backgroundColor: 'white',
                    padding: 20,
                    elevation: 5,
                    shadowOffset: {width: 5, height: 5},
                    shadowColor: '#ff5a4f',
                    shadowOpacity: 0.6,
                    shadowRadius: 2
                }}>

                    <Text style={{
                        fontSize: 16,
                        color: 'grey'
                    }}>{`验证码(发送至(${this.phoneFirst + '****' + this.phoneLast})`}</Text>

                    <View style={{
                        width: width, height: 40, marginTop: 0, flexDirection: 'row'
                    }}>

                        <MyTextInput
                            style={{
                                width: 120, height: 40, borderWidth: 0, marginTop: 0,
                                borderBottomWidth: 1, borderColor: 'lightgrey'
                            }}
                            maxLength={6}
                            keyboardType={'numeric'} placeholder={'请输入验证码'}
                            onChangeText={(text) => {
                                this.setState({
                                    verifyCode: text
                                })
                            }}/>
                        <TouchableOpacity style={{
                            flex: 1, height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingRight: 20,
                        }}
                                          activeOpacity={this.state.isSentVerify ? 0.5 : 1}
                                          onPress={() => {
                                              pressVerify(globalInfo.phone, this.state.isSentVerify,
                                                  () => {
                                                      console.log('回调1');
                                                      this.setState({
                                                          isSentVerify: false,
                                                      });
                                                  }
                                                  , (time) => {
                                                      console.log(time.sec);
                                                      this.setState({
                                                          timerTitle: time.sec > 0 ? `重新获取(${time.sec}s)` : '重新获取'
                                                      }, () => {
                                                          if (this.state.timerTitle === '重新获取') {
                                                              console.log('回调2');
                                                              this.setState({
                                                                  isSentVerify: true
                                                              })
                                                          }
                                                      })
                                                  }, () => {
                                                      console.log('回调3');
                                                      this.setState({
                                                          isSentVerify: true,
                                                          timerTitle: '重新获取'
                                                      });
                                                  })
                                          }}>
                            <Text
                                style={{
                                    marginLeft: 20,
                                    alignSelf: 'center',
                                    fontSize: 16,
                                    textAlign: 'center',
                                    color: this.state.isSentVerify ? cusColors.verify_light : this.state.timerTitle.indexOf('s')>-1 ? cusColors.verify_dark : cusColors.verify_light
                                }}>{this.state.timerTitle}</Text>

                        </TouchableOpacity>
                    </View>

                    <Item title={'设置新密码'} placeholder={'请输入不小于6位数的新密码'}
                          secureTextEntry={true}
                          onChangeText={(text) => {
                              this.setState({
                                  passwordNew: text
                              })
                          }}/>
                    <Item title={'确认密码'} placeholder={'请再次确认密码'}
                          secureTextEntry={true}
                          onChangeText={(text) => {
                              this.setState({
                                  passwordSure: text
                              })
                          }}/>


                </View>
                <MyButtonView style={{width: width / 1.3, marginTop: 80}} title={'确定'}
                              onPress={this.pressSure}/>
            </View>);
    }

    /**
     * 确认修改密码
     */
    pressSure = () => {

        if (!checkPassword(this.state.passwordNew, this.state.passwordSure)) {
            return;
        }

        var dataJson = {
            phone: globalInfo.phone,
            msgCode: this.state.verifyCode,
            pwd: this.state.passwordNew
        }
        fetchRequest('/register/modifyPwd', 'POST', dataJson)
            .then(res => {
                console.log(res);
                if (res.ret === 0) {
                    CountdownUtil.stop();
                    NavigationUtil.reset(this.props.navigation, 'RegisterApp')
                } else {
                    ToastUtil.showShort(res.errmsg)
                }
            }).then(err => {
            console.log(err);
            ToastUtil.showShort(err)

        });
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data,

    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageChangePsw);
