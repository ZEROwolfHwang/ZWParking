/**
 * Created by zerowolf Date: 2018/5/18 Time: 上午11:35
 */
import BaseComponent from "../../../views/BaseComponent";

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
    ListView, ScrollView, FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyTabView from "../../../views/MyTabView";
import MyProgressBar from "../../../views/MyProgressBar";
import {actions_coupon, Types} from "../../Coupon/reduce/reducesCoupon";

var singleParkList = [];

class PageAddressSelect extends BaseComponent {

    constructor(props) {
        super(props);
        // this.params = null;
        // this.state ={
        //     parkList: []
        // }
        singleParkList = this.props.selectedParkList;
        console.log(singleParkList);


        this.state = {
            parkList: singleParkList
        }
    }

    componentWillMount() {

    }


    _renderItem = (item) => {
        let itemData = item.item;
        return <TouchableOpacity activeOpacity={0.8}
                                 style={{
                                     width,
                                     height: 50,
                                     paddingLeft: 20,
                                     backgroundColor: 'white',
                                     flexDirection: 'row',
                                     justifyContent: 'flex-start',
                                     alignItems: 'center'
                                 }}
                                 onPress={() => {
                                     console.log('askdasda');
                                     itemData.isSelected = !itemData.isSelected;
                                     this.setState({
                                         parkList: singleParkList
                                     })

                                     console.log(this.state.parkList);

                                     // this.props.initSelectedPark(this.state.parkList);

                                     this.props.navigation.dispatch({
                                         type: Types.ACTION_COUPON_SHOW_ENTER,
                                         allCouponList: this.props.allCouponList,
                                         parkList:this.state.parkList
                                     })

                                 }}>

            <Icon size={30} name={itemData.isSelected ? 'circle' : 'circle-thin'}
                  style={{
                      color: itemData.isSelected ? 'blue' : 'black',
                      backgroundColor: 'transparent'
                  }}/>
            <Text style={{
                flex: 1,
                width,
                height: 50,
                marginLeft: 10,
                backgroundColor: 'transparent',
                textAlignVertical: 'center',
                color: 'grey',
                fontSize: 16,
                textAlign: 'left'
            }}>{itemData.parkName}</Text>
        </TouchableOpacity>
    }


    _separator = () => {
        return <View style={{height: 1, backgroundColor: 'lightgrey', opacity: 0.5}}/>;
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView title={'停车场配置'} navigation={this.props.navigation}/>

                <FlatList
                    ref={(flatList) => this._flatList = flatList}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    data={this.state.parkList}>
                </FlatList>
            </View>)
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        allCouponList: state.coupon.dataCoupon,
        selectedParkList: state.coupon.parkList,
        parkNameList: state.coupon.parkNameList
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initSelectedPark: actions_coupon.getSelectedPark
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageAddressSelect);
