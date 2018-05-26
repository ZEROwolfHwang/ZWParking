/**
 * Created by zerowolf on 2017/12/6.
 */
import React, {Component} from 'react';
import {
    Platform, Image
} from 'react-native';
import {TabNavigator, StackNavigator, TabBarTop, NavigationActions} from 'react-navigation';
import TabHome from "../containers/Home/TabHome";
import TabCoupon from "../containers/Coupon/TabCoupon";
import TabMine from "../containers/Mine/TabMine";
import {cusColors} from "../styles/cusColor";

const MainTab = TabNavigator({
    TabHome: {
        screen: TabHome, navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({tintColor, focused}) => (
                <Image source={{uri: focused ? 'tab_home_icon' : 'tab_home_nor_icon'}}
                       resizeMode={'contain'}
                       style={{width: 20, height: 20, backgroundColor: 'transparent'}}/>)
        }
    },

    TabCoupon: {
        screen: TabCoupon, navigationOptions: {
            tabBarLabel: '优惠券',
            tabBarIcon: ({tintColor, focused}) => (
                <Image source={{uri: focused ? 'tab_coupon_icon' : 'tab_coupon_nor_icon'}}
                       style={{width: 20, height: 20, backgroundColor: 'transparent'}}/>
            )
        }
    },

    TabMine: {
        screen: TabMine, navigationOptions: {
            tabBarLabel: '商户',
            tabBarIcon: ({tintColor, focused}) => (
                <Image source={{uri: focused ? 'tab_merchant_icon' : 'tab_merchant_nor_icon'}}
                       style={{width: 20, height: 20, backgroundColor: 'transparent'}}/>

            )
        }
    },
}, {
    tabBarPosition: 'bottom',
    lazy: true, // 是否懒加载,
    swipeEnabled: true,
    animationEnabled: false,
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'TabCoupon',
    // initialRouteName: 'TabMine',
    tabBarOptions: {
        showIcon: true,
        pressOpacity: 0.8,
        activeTintColor: cusColors.main_light, // 文字和图片选中颜色
        inactiveTintColor: cusColors.main_default, // 文字和图片默认颜色

        style: {
            height: 50,
            backgroundColor: 'white',
            zIndex: 0,
            position: 'relative'
        },

        labelStyle: {
            fontSize: 12,
            paddingVertical: 0,
            marginTop: Platform.OS === 'android' ? 0 : 0
        },

        tabStyle: {
            backgroundColor: 'white',
        },

        indicatorStyle: {
            height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
    }
});


import RegisterApp from '../containers/regist/RegisterApp';
import ForgetPsw from "../containers/regist/ForgetPsw";
import RegisterMerchant from "../containers/regist/RegisterMerchant";
import RegisterSuccess from "../containers/regist/RegisterSuccess";
import RegisterMerchantNext from "../containers/regist/RegisterMerchantNext";
import MerchantInfo from "../containers/Mine/merchantInfo/MerchantInfo";
import PageSetting from "../containers/Mine/pages/PageSetting";
import PageChangePhone from "../containers/Mine/pages/setting/PageChangePhone";
import PageChangePsw from "../containers/Mine/pages/setting/PageChangePsw";
import PageChangePhoneNext from "../containers/Mine/pages/setting/PageChangePhoneNext";
import CouponRecord from "../containers/Mine/couponRecord/CouponRecord";
import PageAddressSelect from "../containers/Mine/pages/PageAddressSelect";
import PageScanSuccess from "../containers/Coupon/PageScanSuccess";
import PageRecordDetail from "../containers/Mine/couponRecord/PageRecordDetail";


const mine = {

    PageAddressSelect: {screen: PageAddressSelect},
    PageSetting: {screen: PageSetting},
    PageChangePsw: {screen: PageChangePsw},
    PageChangePhone: {screen: PageChangePhone},
    PageChangePhoneNext: {screen: PageChangePhoneNext},

    PageRecordDetail: {screen: PageRecordDetail},
}


const SNavigator = StackNavigator({

        RegisterApp: {screen: RegisterApp},
        PageScanSuccess: {screen: PageScanSuccess},
        TabMine: {screen: MainTab, path: 'TabMine'},
        TabCoupon: {screen: MainTab, path: 'TabCoupon'},
        TabHome: {screen: MainTab, path: 'TabHome'},
        RegisterSuccess: {screen: RegisterSuccess},
        RegisterMerchant: {screen: RegisterMerchant},
        ForgetPsw: {screen: ForgetPsw},
        RegisterMerchantNext: {screen: RegisterMerchantNext},
        MerchantInfo: {screen: MerchantInfo},

        CouponRecord: {screen: CouponRecord},


        MainTab: {screen: MainTab},

        // Tab: {screen: TabNavigation},
        ...mine
    },
);


export {
    SNavigator
}

