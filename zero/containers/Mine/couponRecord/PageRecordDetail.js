/**
 * Created by zerowolf Date: 2018/5/25 Time: 下午5:41
 */
import MyTabView from "../../../views/MyTabView";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform, StyleSheet, TextInput,Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView
} from 'react-native';
import BaseComponent from "../../../views/BaseComponent";

let couponDetail;
class PageRecordDetail extends BaseComponent {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        couponDetail = this.props.navigation.state.params.couponDetail;

    }


    render() {
        let count = couponDetail.count;
        let couponAmount = couponDetail.couponAmount;
        let couponDiscount = couponDetail.couponDiscount;
        let couponDuration = couponDetail.couponDuration;
        let couponName = couponDetail.couponName;
        let couponStatus = couponDetail.couponStatus;
        let couponType = couponDetail.couponType;
        let surplusCount = couponDetail.surplusCount;
        let validFrom = couponDetail.validFrom;
        let validTo = couponDetail.validTo;
        let parkList = couponDetail.parkList;
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
               <MyTabView title={'优惠券详情'} navigation={this.props.navigation}/>

                <View style={{width,height:60,flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                    <Text>优惠券名</Text>
                    <Text>{couponName}</Text>
                </View>

                <View style={{width,height:60,flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                    <Text>有限期</Text>
                    <Text>{validFrom+'-'+validTo}</Text>
                </View>

                <View style={{width,height:60,flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                    <Text>优惠券类型</Text>
                    <Text>{couponType}</Text>
                </View>


            </View>)
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

export default connect(mapStateToProps, mapDispatchToProps)(PageRecordDetail);
