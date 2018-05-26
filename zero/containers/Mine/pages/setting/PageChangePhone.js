/**
 * Created by zerowolf Date: 2018/5/13 Time: 下午4:40
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
import MyTextInput from "../../../../views/MyTextInput";
import MyButtonView from "../../../../views/MyButtonView";
import {fetchRequest} from "../../../../utils/FetchUtil";
import CountdownUtil from "../../../../utils/CountdownUtil";
import ToastUtil from "../../../../utils/ToastUtil";
import PageChangePhoneNext from "./PageChangePhoneNext";
import {fetchRequestToken} from "../../../../utils/FetchUtilToken";
import {pressVerify} from "../../../../utils/verifyUtil";
import {cusColors} from "../../../../styles/cusColor";

var globalInfo = null;

class PageChangePhone extends BaseComponent {

    constructor(props) {
        super(props);

        globalInfo = this.props.globalInfo;

        this.state = {
            verifyCode: '',
            isSentVerify: true,
            timerTitle: '发送验证码'
        }
    }

    render() {
        let phone = globalInfo.phone;
        let phoneFirst = phone.substr(0, 4);
        let phoneLast = phone.substr(phone.length - 4);
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView style={{
                    elevation: 5,
                    shadowOffset: {width: 5, height: 5},
                    shadowColor: '#ff5a4f',
                    shadowOpacity: 0.6,
                    shadowRadius: 2,
                }} title={'修改手机号码'} navigation={this.props.navigation}/>

                <View style={{
                    width,
                    height: 120,
                    marginTop: 20,
                    padding: 20,
                    backgroundColor: 'white',
                    elevation: 5,
                    shadowOffset: {width: 5, height: 5},
                    shadowColor: '#ff5a4f',
                    shadowOpacity: 0.6,
                    shadowRadius: 2,
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: 'grey'
                    }}>{`验证码(发送至(${phoneFirst + '****' + phoneLast})`}</Text>

                    <View style={{
                        width: width, height: 40, marginTop: 0, flexDirection: 'row'
                    }}>

                        <MyTextInput
                            maxLength={6}
                            style={{width: 120, height: 40, borderWidth: 0, marginTop: 0,
                                borderBottomWidth:1, borderColor:'lightgrey'}}
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
                                          onPress={()=>{
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


                </View>
                <MyButtonView style={{width: width / 1.3, marginTop: 80}} title={'下一步'}
                              onPress={this.pressNext}/>
            </View>)
    }


    // componentWillUnmount(){
    //     CountdownUtil.stop();
    // }

    /**
     * 下一步
     */
    pressNext = () => {

        var postJson = {
            phone: globalInfo.phone,
            msgCode: this.state.verifyCode
        };
        console.log(globalInfo.token);

        fetchRequestToken('/register/validateUserPhone', 'POST', globalInfo.token, postJson)
            .then(res => {
                console.log(res);
                if (res.ret === 0) {
                    console.log('旧手机验证通过');
                    CountdownUtil.stop();
                    this.props.navigation.navigate('PageChangePhoneNext');
                } else {
                    console.log(res.errmsg);
                    ToastUtil.showShort(res.errmsg)
                }
            })
            .catch(err => {
                console.log(err);
                ToastUtil.showShort(err)
            })

    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageChangePhone);
