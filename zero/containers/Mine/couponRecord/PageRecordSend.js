/**
 * Created by zerowolf Date: 2018/5/25 Time: 下午4:40
 */
import BaseComponent from "../../../views/BaseComponent";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform, StyleSheet, TextInput,Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView
} from 'react-native';
class PageRecordSend extends BaseComponent {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>


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

export default connect(mapStateToProps, mapDispatchToProps)(PageRecordSend);
