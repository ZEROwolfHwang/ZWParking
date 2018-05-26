/**
 * Created by zerowolf Date: 2018/5/11 Time: 上午10:56
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
    SectionList, Modal, FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BaseComponent from "../../views/BaseComponent";
import MyTabView from "../../views/MyTabView";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchRequestToken} from "../../utils/FetchUtilToken";
import {fetchRequest} from "../../utils/FetchUtil";
import {Types} from "./reduce/reducesCoupon";
import MyProgressBar from "../../views/MyProgressBar";
import PageCoupon from "./PageCoupon";
import Ionicons from 'react-native-vector-icons/Ionicons'
const {width, height} = Dimensions.get('window');

var singleParkList = [];
class TabCoupon extends BaseComponent {

    constructor(props) {
        super(props);

        let globalInfo = this.props.globalInfo;
        console.log(globalInfo);

        this.props.navigation.dispatch({
            type: Types.ACTION_COUPON_FETCH_ENTER,
            url: `/appCoupon/availableCoupon?token=${globalInfo.token}&&merCode=${globalInfo.merCode}`,
            merCode:globalInfo.merCode
        });

    }


    render() {
        return (
                <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>

                {this.props.dataShowCoupon ? <PageCoupon
                        navigation={this.props.navigation}/>
                    : <View>
                        <MyTabView titleColor={'black'} title={'优惠券'}
                                   leftView={false}
                                   navigation={this.props.navigation}
                                   hasRight={true}
                                   rightView={<TouchableOpacity activeOpacity={0.5}
                                                                style={{
                                                                    width: width / 3,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'flex-end',
                                                                    paddingRight: 15
                                                                }}
                                                                onPress={() => {
                                                                    // Alert.alert('更多')
                                                                    this.setState({
                                                                        filterPark: true
                                                                    })
                                                                }}>
                                       <Image source={{uri: 'funnel'}}
                                              resizeMode={'contain'}
                                              style={{
                                                  width: 25,
                                                  height: 25,
                                                  backgroundColor: 'transparent'
                                              }}/>

                                   </TouchableOpacity>}/>
                    <MyProgressBar/>
                    </View>
                }

            </View>);
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data,
        // allCouponList: state.coupon.dataCoupon,
        dataShowCoupon: state.coupon.dataShowCoupon,
        // selectedParkList: state.coupon.parkList,
        // parkNameList: state.coupon.parkNameList,
    };

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TabCoupon);
