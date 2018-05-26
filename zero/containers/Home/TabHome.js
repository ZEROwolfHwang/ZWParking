/**
 * Created by zerowolf Date: 2018/5/11 Time: 上午10:56
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView
} from 'react-native';
import BaseComponent from "../../views/BaseComponent";
import MyTabView from "../../views/MyTabView";
import TabCoupon from "../Coupon/TabCoupon";
import {NavigationActions} from "react-navigation";
const {width, height} = Dimensions.get('window');
export default class TabHome extends BaseComponent {

    constructor(props) {
        super(props);

    }


    componentWillMount() {

    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} title={'首页'}
                           leftView={false}
                           navigation={this.props.navigation}/>
             <TouchableOpacity activeOpacity={0.8} style={{width,height:60, backgroundColor:'lightcoral',justifyContent:'center',alignItems:'center', borderRadius:5,elevation:5, shadowOffset:{width:5,height:5}, shadowColor: '#ff5a4f', shadowOpacity: 0.6, shadowRadius: 2,}}
                                                onPress={()=>{
                                                    console.log('press');
                                                    // this.props.navigation.navigate('MainTab');
                                                    // this.props.navigation.navigate('TabMine');
                                                    //
                                                    // this.props.navigation.navigate('MerchantInfo');

                                                    const resetAction = NavigationActions.navigate({
                                                        index: 1,
                                                        actions: [  // 栈里的路由信息会从 Home->HomeTwo 变成了 Bill->BillTwo
                                                            NavigationActions.navigate({ routeName: 'TabMine'}),
                                                            NavigationActions.navigate({ routeName: 'MerchantInfo'})
                                                        ]
                                                    });
                                                    this.props.navigation.dispatch(resetAction);
                                                }}>
                                  <Text style={{fontSize:16, color:'blue',textAlign:'center'}}>{`onPress`}</Text>
                              </TouchableOpacity>


            </View>)
    }
}
