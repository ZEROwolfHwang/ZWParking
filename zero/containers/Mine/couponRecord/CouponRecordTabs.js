/**
 * Created by zerowolf Date: 2018/5/25 Time: 下午4:37
 */
import {TabNavigator,TabBarTop} from "react-navigation";
import PageRecordGet from "./PageRecordGet";
import PageRecordSend from "./PageRecordSend";
import {Platform} from "react-native";
import {cusColors} from "../../../styles/cusColor";

export default CouponRecordTabs = TabNavigator({
    PageRecordGet: {
        screen: PageRecordGet,
        navigationOptions: {
            tabBarLabel: '领券记录',
        }
    },

    PageRecordSend: {
        screen: PageRecordSend,
        navigationOptions: {
            tabBarLabel: '发券纪录',
        }
    }
},{ // activeBackgroundColor:'transparent',
    // inactiveBackgroundColor:'transparent',
    initialRouteName: 'PageRecordGet',
    tabBarOptions: {
        backgroundColor: 'white',
        activeTintColor: 'red',
        inactiveTintColor: 'grey',
        activeBackgroundColor: 'black',
        inactiveBackgroundColor: 'yellow',
        labelStyle: {
            fontSize: 12,
            paddingVertical: 0,
            marginTop: Platform.OS === 'android' ? 0 : 0,
        },
        style: {
            backgroundColor: 'white',
            elevation: 0
        },

        // iconStyle: {
        //     marginTop: 10
        // },
        tabStyle: {
            backgroundColor: 'transparent',
        },
        indicatorStyle: {
            // height: 10 , // 如TabBar下面显示有一条线，可以设高度为0后隐藏
            backgroundColor: 'red'
        },
    },
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
})
