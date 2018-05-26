/**
 * Created by zerowolf Date: 2018/5/13 Time: 下午4:27
 */
import BaseComponent from "../../../views/BaseComponent";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView
} from 'react-native';
import MyTabView from "../../../views/MyTabView";
import ItemIconTextIconView from "../../../views/ItemIconTextIconView";
import NavigationUtil from "../../../utils/NavigationUtil";
import {Types} from "./reduce/reduceSetting";

class PageSetting extends BaseComponent {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView title={'设置'} navigation={this.props.navigation}/>


                <ItemIconTextIconView imageSize={0} title={'修改手机号码'} imageName={'home'}
                                      onPress={this.pressChangePhone}/>

                <ItemIconTextIconView imageSize={0} title={'修改登录密码'} imageName={'home'}
                                      onPress={this.pressChangePsw}/>

                <ItemIconTextIconView imageSize={0} title={'退出'} imageName={'home'}
                                      onPress={this.pressBackUp}/>


            </View>)
    }

    /**
     * 修改手机号码
     */
    pressChangePhone = () => {
        this.props.navigation.navigate('PageChangePhone');
    }
    /**
     * 修改登录密码
     */
    pressChangePsw = () => {
        this.props.navigation.navigate('PageChangePsw');
    }
    /**
     * 退出APP
     */
    pressBackUp = () => {
        this.props.navigation.dispatch({type: Types.ACTION_SETTING_BACK_2_MAIN});
        NavigationUtil.reset(this.props.navigation,'RegisterApp');
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

export default connect(mapStateToProps, mapDispatchToProps)(PageSetting);
