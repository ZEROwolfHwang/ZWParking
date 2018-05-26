import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Keyboard, Alert, View, TouchableOpacity, Image, Dimensions, ListView
} from 'react-native';
import MyTabView from "../../views/MyTabView";
import LinearGradient from "react-native-linear-gradient";
import MyButtonView from "../../views/MyButtonView";
import MyTextInputWithIcon from "../../views/MyTextInputWithIcon";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ToastUtil from "../../utils/ToastUtil";
import {fetchRequest} from "../../utils/FetchUtil";
import CountdownUtil from "../../utils/CountdownUtil";
import BaseComponent from "../../views/BaseComponent";
import {pressVerify} from "../../utils/verifyUtil";
import {cusColors} from "../../styles/cusColor";

const {width, height} = Dimensions.get('window');

class RegisterMerchantNext extends BaseComponent {

    constructor(props) {
        super(props);

        this.params = null;

        this.state = {
            phone: '',
            verifyCode: '',
            isSentVerify: true,
            timerTitle: '获取验证码'
        }
    }

    componentWillMount() {
        this.params = this.props.navigation.state.params;
        console.log(this.params);
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>

                <Image source={require('../../../resource/image/back.png')}
                       style={{ width, height,position:'absolute'}}/>
                <MyTabView title={'注册商户'} backgroundColor={'transparent'} cutLineHeight={0.5}
                           isTransparent={true}
                           navigation={this.props.navigation}/>

                    <MyTextInputWithIcon
                        style={{width:220,marginTop:130}}
                        keyboardType={'numeric'}
                        placeholder={'绑定手机号'}
                        maxLength={11}
                        imageURL={'mob_icon'}
                        onChangeText={(text) => {
                            this.setState({
                                phone: text
                            })
                        }}
                    />


                    <View style={{
                        width: 220, height: 42, marginTop: 20,
                        borderWidth: 1, borderRadius: 6, borderColor: 'white',
                        backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'
                    }}>
                        <MyTextInputWithIcon
                            style={{flex: 1, height: 42, borderWidth: 0, marginTop: 0}}
                            placeholder={'验证码'}
                            keyboardType={'numeric'}
                            maxLength={6}
                            onChangeText={(text) => {
                                this.setState({
                                    verifyCode: text
                                })
                            }} imageURL={'code_icon'}/>

                        <TouchableOpacity activeOpacity={this.state.isSentVerify ? 0.5 : 1}
                                          onPress={()=>{
                                              pressVerify(this.state.phone, this.state.isSentVerify,
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
                                height: 42,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingRight: 20,
                            }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: this.state.isSentVerify ? cusColors.verify_light : this.state.timerTitle.indexOf('s')>-1 ? cusColors.verify_dark : cusColors.verify_light
                                    }}>{this.state.timerTitle}</Text>

                            </View>
                        </TouchableOpacity>
                    </View>

                    <MyButtonView  title={'注册'} onPress={this.pressRegister}/>
                </View>
        )
    }


    pressRegister = () => {
        Keyboard.dismiss();

        var json = {
            loginName: this.params.username,
            pwd: this.params.password,
            phone: this.state.phone,
            msgCode: this.state.verifyCode
        }
        fetchRequest('/register/addBusinessMerAccount', 'POST', json)
            .then(res => {
                console.log(res);
                if (res.ret === 0) {

                    // ToastUtil.showShort(res.errmsg)
                    CountdownUtil.stop();
                    this.props.navigation.navigate('RegisterSuccess',{type:1,username: this.state.phone,password: this.params.password});
                } else {
                    ToastUtil.showShort(res.errmsg)
                }
            }).then(err => {
            console.log(err);
            ToastUtil.showShort(err)

        });
    };


}

const mapStateToProps = (state) => {
    return {
        nav: state.nav
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterMerchantNext);

