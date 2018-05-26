/**
 * Created by zerowolf Date: 2018/5/22 Time: 下午4:30
 */
import MyTabView from "../../views/MyTabView";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Platform,
    StyleSheet,
    TextInput,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView,
    StatusBar
} from 'react-native';
import BaseComponent from "../../views/BaseComponent";
import MyButtonView from "../../views/MyButtonView";
class PageScanSuccess extends BaseComponent {

    constructor(props) {
        super(props);

    }

    render() {
        return (<View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
            <Image source={require('../../../resource/image/background.png')}
                   style={{width, height, position: 'absolute'}}/>

            <StatusBar
                hidden={false}
                translucent={true}
                barStyle={'light-content'}//'default', 'light-content', 'dark-content'
                backgroundColor={'#fff6fd00'}
                networkActivityIndicatorVisible={false}
            />


            <View style={{
                width: width,
                marginTop:110,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 30,
                    color: 'white',
                    textAlign: 'center',
                    marginBottom: 40
                }}>{`扫码成功`}</Text>
            </View>

            <View style={{flex:1}}/>

            <MyButtonView style={{marginBottom:70}} title={'完成'} onPress={this.pressSuccess}/>

        </View>)
    }

    pressSuccess = () => {

        this.props.navigation.pop();
        // this.props.navigation.goBack();
        // this.props.navigation.navigate('TabCoupon');
    };
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

export default connect(mapStateToProps, mapDispatchToProps)(PageScanSuccess);
