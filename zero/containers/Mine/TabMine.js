/**
 * Created by zerowolf Date: 2018/5/11 Time: 上午10:56
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView
} from 'react-native';
import BaseComponent from "../../views/BaseComponent";
import MyTabView from "../../views/MyTabView";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import {BoxShadow} from 'react-native-shadow'
import ItemIconTextIconView from "../../views/ItemIconTextIconView";
import MerchantInfo from "./merchantInfo/MerchantInfo";
import CouponRecord from "./couponRecord/CouponRecord";
import {NavigationActions} from "react-navigation";


var globalInfo = null;
class TabMine extends BaseComponent {

    constructor(props) {
        super(props);

        globalInfo = this.props.globalInfo;
        console.log(globalInfo);
    }

    viewUserInfo() {
        let phone = globalInfo.phone;
        let phoneFirst = phone.substr(0, 4);
        let phoneLast = phone.substr(phone.length - 4);
        return (
            <View style={{
                width,
                height: 76,
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                elevation:2,
                shadowOffset:{width:5,height:5},
                shadowColor: '#ff5a4f',
                shadowOpacity: 0.6,
                shadowRadius: 2,
            }}>

                <Image source={{uri:'user_setting'}}
                       resizeMode={'contain'}
                       style={{width: 60, height: 60, marginLeft: 10,}}/>


                <View style={{
                    marginLeft: 10,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: 'black',
                        alignSelf: 'flex-start',
                        textAlign: 'left'
                    }}>{`${globalInfo.loginName}`}</Text>
                    <Text
                        style={{
                            fontSize: 14,
                            color: 'grey',
                            alignSelf: 'flex-start',
                            textAlign: 'left'
                        }}>{`${phoneFirst}****${phoneLast}`}</Text>
                </View>

            </View>
        )
    }

    render() {
        const shadowOpt = {
            width: width,
            height: 80,
            color: "black",
            border: 2,
            radius: 3,
            opacity: 1,
            x: 10,
            y: 5,
            // style:{marginVertical:5}
        }
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView title={'商户'}
                           leftView={false}
                           navigation={this.props.navigation}/>

                {this.viewUserInfo()}

                <ItemIconTextIconView title={'商户信息'} imageName={'information_icon'} onPress={
                    this.pressBusinessInfo
                }/>
                <ItemIconTextIconView title={'优惠券记录'} imageName={'record_icon'} onPress={
                    this.pressCouponRecord
                }/>

                <ItemIconTextIconView title={'设置'} imageName={'setting'} onPress={
                    this.pressSetting
                }/>


            </View>)
    }

    /**
     * 商户信息
     */
    pressBusinessInfo = () => {
        console.log('dianji');
        this.props.navigation.navigate('MerchantInfo');
    }

    /**
     * 优惠券记录
     */
    pressCouponRecord = () => {
        console.log('dianji1');

        this.props.navigation.navigate('CouponRecord');

        // const resetAction = NavigationActions.reset({
        //     index: 0,
        //     actions: [  // 栈里的路由信息会从 Home->HomeTwo 变成了 Bill->BillTwo
        //         // NavigationActions.navigate({ routeName: 'MainTab'}),
        //         NavigationActions.navigate({ routeName: 'MerchantInfo'})
        //     ]
        // });
        // this.props.navigation.dispatch(resetAction);
    }

    /**
     * 设置
     */
    pressSetting = () => {
        this.props.navigation.navigate('PageSetting');
    }


}
const mapStateToProps = (state) => {
    return {
        nav:state.nav,
        globalInfo:state.globalInfo.data
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TabMine);
