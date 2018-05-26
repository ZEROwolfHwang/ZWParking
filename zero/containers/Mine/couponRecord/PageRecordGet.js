/**
 * Created by zerowolf Date: 2018/5/25 Time: 下午4:39
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
    ListView, ScrollView
} from 'react-native';
import {TypesRecord} from "./reduce/reduceCouponRecord";
import MyProgressBar from "../../../views/MyProgressBar";
import PageRecordDetail from "./PageRecordDetail";

let globalInfo;
let navigation;
class PageRecordGet extends BaseComponent {

    constructor(props) {
        super(props);

        globalInfo = this.props.globalInfo;

        navigation = this.props.navigation;

        this.props.navigation.dispatch({
            type: TypesRecord.COUPON_RECORD_GET_DATA_ENTER,
            url: `/appCoupon/merGetRecord?token=${globalInfo.token}&&merCode=${globalInfo.merCode}`
        })

    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>

                {this.props.recordDataGet ?
                    this.viewRecordGet():
                    <MyProgressBar/>
                }
            </View>
        )
    }

    viewRecordGet() {
        let dataGet = this.props.recordDataGet;
        var recordViewRow = [];

        for (const index in dataGet) {
            let recordItemData = dataGet[index];
            let count = recordItemData.count;
            let couponAmount = recordItemData.couponAmount;
            let couponDiscount = recordItemData.couponDiscount;
            let couponDuration = recordItemData.couponDuration;
            let couponName = recordItemData.couponName;
            let couponStatus = recordItemData.couponStatus;
            let couponType = recordItemData.couponType;
            let surplusCount = recordItemData.surplusCount;
            let validFrom = recordItemData.validFrom;
            let validTo = recordItemData.validTo;
            let parkList = recordItemData.parkList;


            recordViewRow.push(<TouchableOpacity key={index}
                                                 activeOpacity={0.9}
                                                 style={{width,height:100,backgroundColor:'white',marginTop:10,elevation:5,
                                                 shadowOffset:{width:5,height:5},
                                                 shadowColor: 'lightgrey',
                                                 shadowOpacity: 0.6,
                                                 shadowRadius: 2}}
                                                 onPress={()=>{
                                                     this.pressRecordItem(recordItemData);
                                                 }}>

                <Text>{couponName}</Text>
                <Text>{validFrom+'-'+validTo}</Text>

            </TouchableOpacity>)
        }

        return <ScrollView style={{flex:1,width}}
                           contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
                           showsVerticalScrollIndicator={false}>
            {recordViewRow}
        </ScrollView>;
    }
    pressRecordItem=(recordItemData)=>{
        console.log(recordItemData);
        console.log(this.props.navigation);
        console.log(navigation);
        navigation.navigate('PageRecordDetail',{couponDetail:recordItemData});
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data,
        navigation: state.coupon_record.recordNav,
        recordDataGet: state.coupon_record.record_get
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageRecordGet);
