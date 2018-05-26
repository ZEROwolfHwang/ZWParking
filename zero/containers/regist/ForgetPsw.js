/**
 * Created by zerowolf Date: 2018/5/11 Time: 下午2:14
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
    BackHandler
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyTabView from "../../views/MyTabView";
import BaseComponent from "../../views/BaseComponent";
import MyTextInput from "../../views/MyTextInput";
import LinearGradient from "react-native-linear-gradient";
import MyButtonView from "../../views/MyButtonView";
import {fetchRequest} from "../../utils/FetchUtil";
import ToastUtil from "../../utils/ToastUtil";
import MyTextInputWithIcon from "../../views/MyTextInputWithIcon";
import CountdownUtil from "../../utils/CountdownUtil";
import verifyUtil, {pressVerify} from "../../utils/verifyUtil";
import {cusColors} from "../../styles/cusColor";

const {width, height} = Dimensions.get('window');

class ForgetPsw extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            verifyCode: '',
            passwordNew: '',
            passwordSure: '',
            isSentVerify: true,
            timerTitle: '发送验证码'
        }
    }

    // componentDidMount() {
    //     BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    // }
    //
    // componentWillUnmount() {
    //     BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    // }
    //
    // onBackPress = () => {
    //
    //     this.props.navigation.goBack();
    //     return true;
    // };

    render() {
        return (

            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>

                <Image source={require('../../../resource/image/back.png')}
                       style={{ width, height,position:'absolute'}}/>

                <MyTabView title={'忘记密码'} backgroundColor={'transparent'} cutLineHeight={0.5}
                           isTransparent={true}
                           navigation={this.props.navigation}/>

                    <MyTextInputWithIcon
                        style={{marginTop:70}}
                        placeholder={'请输入手机号'}
                        imageURL={'mob_icon'}
                        maxLength={11}
                        keyboardType={'numeric'}
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


                    <MyTextInputWithIcon
                        placeholder={'新密码'}
                        imageURL={'mm_icon'}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({
                                passwordNew: text
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


                    <MyButtonView  title={`确认修改`}
                                  onPress={this.pressSureChange}/>

                </View>
        );

    }

    /**
     * 确认修改
     */
    pressSureChange = () => {
        var dataJson = {
            phone: this.state.phone,
            pwd: this.state.passwordNew,
            msgCode: this.state.verifyCode
        };
        fetchRequest('/register/modifyPwd', 'POST', dataJson)
            .then(res => {
                console.log(res);
                if (res.ret === 0) {
                    CountdownUtil.stop();
                    this.props.navigation.navigate('RegisterSuccess', {type: 0});
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
        nav: state.nav
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPsw);

