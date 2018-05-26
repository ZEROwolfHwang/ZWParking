/**
 * Created by zerowolf Date: 2018/5/15 Time: 下午2:41
 */
import MyTabView from "../../../views/MyTabView";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView
} from 'react-native';
import BaseComponent from "../../../views/BaseComponent";
import {fetchRequest} from "../../../utils/FetchUtil";
import CouponRecordTabs from "./CouponRecordTabs";
import {actions_conpon_record, TypesRecord} from "./reduce/reduceCouponRecord";
import MyProgressBar from "../../../views/MyProgressBar";

let globalInfo;

class CouponRecord extends BaseComponent {

    constructor(props) {
        super(props);

        globalInfo = this.props.globalInfo;


        this.props.initRecordNavigation(this.props.navigation);


        fetchRequest(`/appCoupon/merGetRecord?token=${globalInfo.token}&&merCode=${globalInfo.merCode}`, 'GET')
            .then(res => {

            }).catch(err => {
            console.log(err);
        });

    }


    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView title={'优惠券记录'} leftView={true} navigation={this.props.navigation}/>



                    <View style={{flex:1,width}}>
                        <CouponRecordTabs/>
                    </View>

            </View>);
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data,
        recordNav: state.coupon_record.recordNav
        // recordDataGet: state.coupon_record.record_get


    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initRecordNavigation:actions_conpon_record.putCouponRecord_nav
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CouponRecord);
