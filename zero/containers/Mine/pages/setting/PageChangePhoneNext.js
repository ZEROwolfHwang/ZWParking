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
import NavigationUtil from "../../../../utils/NavigationUtil";
import {fetchRequestToken} from "../../../../utils/FetchUtilToken";
import {pressVerify} from "../../../../utils/verifyUtil";
import Item from "./Item";
import {cusColors} from "../../../../styles/cusColor";

var globalInfo = null;

class PageChangePhoneNext extends BaseComponent {

    constructor(props) {
        super(props);

        globalInfo = this.props.globalInfo;

        this.state = {
            phoneNew: '',
            verifyCode: '',
            isSentVerify: true,
            timerTitle: '发送验证码'
        }
    }

    componentWillMount() {

    }

    render() {
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
                    marginTop: 20,
                    backgroundColor: 'white',
                    padding: 20,
                    elevation: 5,
                    shadowOffset: {width: 5, height: 5},
                    shadowColor: '#ff5a4f',
                    shadowOpacity: 0.6,
                    shadowRadius: 2
                }}>

                    <Item title={'新手机号'}
                          maxLength={11}
                          placeholder={'请输入新手机号码'}
                          onChangeText={(text) => {
                              this.setState({
                                  phoneNew: text
                              })
                          }}/>


                    <Text style={{
                        fontSize: 14,
                        marginTop: 10,
                        marginLeft: 5,
                        color: 'grey',
                        textAlign: 'left'
                    }}>{`新手机验证码`}</Text>


                    <View style={{
                        width: width, height: 40, marginTop: 0, flexDirection: 'row'
                    }}>

                        <MyTextInput
                            style={{width: 120, height: 40, borderWidth: 0, marginTop: 0,
                                borderBottomWidth:1, borderColor:'lightgrey'}}
                            keyboardType={'numeric'}
                            maxLength={6}
                            placeholder={'请输入验证码'}
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
                                              pressVerify(this.state.phoneNew, this.state.isSentVerify,
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
                            <View style={{
                                flex: 1,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingRight: 20,
                            }}>
                                <Text
                                    style={{
                                        marginLeft: 20,
                                        alignSelf: 'center',
                                        fontSize: 16,
                                        textAlign: 'center',
                                        color: this.state.isSentVerify ? cusColors.verify_light : this.state.timerTitle.indexOf('s')>-1 ? cusColors.verify_dark : cusColors.verify_light
                                    }}>{this.state.timerTitle}</Text>

                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


                <MyButtonView style={{width: width / 1.3, marginTop: 80}} title={'确定'}
                              onPress={this.pressSure}/>
            </View>)
    }

    /**
     * 确定修改手机号码
     */
    pressSure = () => {
        var postJson = {
            phone: this.state.phoneNew,
            msgCode: this.state.verifyCode
        }

        fetchRequestToken('/register/modifyPhone', 'POST', globalInfo.token,postJson)
            .then(res => {
                console.log(res);
                if (res.ret === 0) {
                    console.log('新手机验证通过');
                    // this.props.navigation.navigate('PageChangePhoneNext');
                    CountdownUtil.stop();
                    NavigationUtil.reset(this.props.navigation, 'RegisterApp');
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

export default connect(mapStateToProps, mapDispatchToProps)(PageChangePhoneNext);
