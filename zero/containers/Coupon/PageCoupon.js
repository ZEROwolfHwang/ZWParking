/**
 * Created by zerowolf Date: 2018/5/11 Time: 上午10:56
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    StatusBar,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView,
    SectionList, Modal, FlatList, ScrollView, ImageBackground, BackHandler, RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BaseComponent from "../../views/BaseComponent";
import MyTabView from "../../views/MyTabView";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchRequestToken} from "../../utils/FetchUtilToken";
import {fetchRequest} from "../../utils/FetchUtil";
import {actions_coupon, Types} from "./reduce/reducesCoupon";
import MyProgressBar from "../../views/MyProgressBar";
import MyTextInputWithIcon from "../../views/MyTextInputWithIcon";
import {showModal} from "../../utils/ModalUtil";
import Ionicons from 'react-native-vector-icons/Ionicons'
import {cusColors} from "../../styles/cusColor";
import {parkIsAllSelect} from "./reduce/dataUtil";
import MyRealm from "../../storage/MyRealm";
import {
    setAllParkIsFalse,
    setAllParkIsTrue, setParkListItemStatus,
} from "../../storage/schema_cusHabit";
// import QRCode from "react-native-qrcode";

import QRCode from 'react-native-qrcode';
import ToastUtil from "../../utils/ToastUtil";
import CountdownUtil from "../../utils/CountdownUtil";
import * as Api from "../../utils/Api";
import MyButtonView from "../../views/MyButtonView";

const {width, height} = Dimensions.get('window');
let barHeight = StatusBar.cutLineHeight;
// var parkList = [];
let globalInfo;

class PageCoupon extends BaseComponent {

    constructor(props) {
        super(props);
        this.positionStyle = null
        // this.props.navigation.dispatch({type:Types.ACTION_COUPON_PAGE_STATUS,isShowQRCode:false});

        this.props.initCouponPageStatus(false,100);

        this.navigation = this.props.navigation;

        console.log(this.navigation);

        globalInfo = this.props.globalInfo;
        console.log(globalInfo);

        let isAllSelect = parkIsAllSelect(this.props.selectedParkList);

        this.state = {
            showModal: false,
            isShowQRCode: false,
            // parkList: parkList,
            isAllSelect: isAllSelect,
            curTime: '',
            QRCodeUrl: '',
            countDownTime: '2分00秒',
            isCounting: false,
            isRefreshing: false,
        }

        console.log(StatusBar.cutLineHeight);
        console.log(this.state.parkList);
        console.log(this.props.dataShowCoupon);
    }


    componentDidMount(){

    }

    /*  componentDidMount() {
          BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
      }

      componentWillUnmount() {
          BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
      }

      onBackPress = () => {
          return true;
      };
  */
    _renderItem = (info) => {
        let couponItem = info.item.couponItem;

        let couponName = couponItem.couponName;
        let count = couponItem.count;
        let merCode = couponItem.merCode;
        let couponStatus = couponItem.couponStatus;
        let couponDiscount = couponItem.couponDiscount;     //折扣券
        let couponSendCode = couponItem.couponSendCode;
        let couponDuration = couponItem.couponDuration;  // 时长券
        let couponCode = couponItem.couponCode;
        let couponAmount = couponItem.couponAmount;     //优惠券 金额
        let couponType = couponItem.couponType;         //700 优惠券  701 时长券   702 折扣券
        let surplusCount = couponItem.surplusCount;
        let validFrom = couponItem.validFrom;
        let validTo = couponItem.validTo;


        //对折扣专门做些显示的处理
        let couponDiscountFirst = null;
        let couponDiscountLast = null;
        if (couponDiscount !== 0) {
            if (couponDiscount.toString().length > 1) {
                let couponDiscountSplit = couponDiscount.toString().split('.');
                couponDiscountFirst = couponDiscountSplit[0];
                couponDiscountLast = couponDiscountSplit[1];

            } else {
                couponDiscountFirst = couponDiscount;
            }
        }

        return <TouchableOpacity activeOpacity={0.9} style={{
            width,
            height: 120,
            paddingTop: 10,
            paddingBottom: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            elevation: 3,
            shadowOffset: {width: 5, height: 5},
            shadowColor: 'lightgrey',
            shadowOpacity: 0.6,
            shadowRadius: 2,
            marginTop: 5,
            marginBottom: 5,
        }} onPress={() => {
            this.pressCouponItem(couponSendCode)
        }}>

            <ImageBackground
                source={{uri: couponType === 700 ? 'back_money_left' : couponType === 701 ? 'back_time_left' : 'back_discount_left'}}
                resizeMode={'cover'}
                style={{
                    width: 160, //长大概是宽的1.6倍
                    height: 100,
                    justifyContent: 'space-around',
                    alignItems: 'flex-start',
                    backgroundColor: 'transparent',
                    paddingTop: 20,
                    paddingLeft: 20,
                    paddingBottom: 10,
                }}>

                <Text style={{
                    fontSize: 24,
                    color: 'white'
                }}>{`${couponType === 700 ? '优惠券' : couponType === 701 ? '时长券' : '折扣券'}`}</Text>
                <Text style={{fontSize: 12, color: 'white'}}>{`${validFrom}-${validTo}`}</Text>

            </ImageBackground>

            <ImageBackground
                source={{uri: couponType === 700 ? 'back_money_right' : couponType === 701 ? 'back_time_right' : 'back_discount_right'}}
                resizeMode={'contain'}
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'
                }}>
                <Text style={{
                    fontSize: 45,
                    fontWeight: 'bold',
                    color: couponType === 700 ? cusColors.coupon_money : couponType === 701 ? cusColors.coupon_time : cusColors.coupon_discount
                }}>
                    {`${couponType === 700 ? couponAmount : couponType === 701 ? couponDuration : couponDiscountFirst}`}
                    {couponDiscountLast ?
                        <Text style={{fontSize: 20}}>{`.${couponDiscountLast}`}</Text> : null}
                    <Text
                        style={{fontSize: 16}}>{`${couponType === 700 ? '¥' : couponType === 701 ? 'h' : '折'}`}</Text>
                </Text>

            </ImageBackground>

        </TouchableOpacity>
    };

    _renderSectionHeader = (info) => {
        var txt = info.section.key;
        return <Text
            style={{
                height: 50,
                width,
                textAlign: 'left',
                marginLeft: 20,
                fontSize: 18,
                textAlignVertical: 'center',
                color: cusColors.main_default,
            }}>{txt}</Text>
    }
    _keyExtractor = (item, index) => {
        return '' + index;
    }

    _onRefresh = () => {
        this.setState({isRefreshing: true});

        this.props.navigation.dispatch({
            type: Types.ACTION_COUPON_FETCH_ENTER,
            url: `/appCoupon/availableCoupon?token=${globalInfo.token}&&merCode=${globalInfo.merCode}`,
            merCode:globalInfo.merCode
        });
        var timer = setTimeout(() => {
            // let cardList1 = getAllCard(this.globalInfo.phone);
            this.setState({
                isRefreshing: false,
            });
            clearTimeout(timer);
        }, 3000);
    }

    render() {
        let dataShowCoupon = this.props.dataShowCoupon;
        // console.log(dataShowCoupon);

        let parkNameList = this.props.parkNameList;

        var sections = [];
        for (const index in parkNameList) {

            var datas = [];
            for (const ShowCouponItem of dataShowCoupon) {
                if (ShowCouponItem.parkName === parkNameList[index]) {
                    datas.push(ShowCouponItem)
                }
            }
            sections.push({key: parkNameList[index], data: datas});
        }


        let parkList = this.props.selectedParkList;
        console.log(parkList);
        // console.log(this.props.parkNameList);


        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>


                <MyTabView
                    ref={refs => this.tabRefs = refs}
                    titleColor={'black'} title={'优惠券'}
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
                                                 onPress={this.pressModalBottom}>

                        <Image source={{uri: 'funnel'}}
                               resizeMode={'contain'}
                               style={{
                                   width: 25,
                                   height: 25,
                                   backgroundColor: 'transparent'
                               }}/>

                    </TouchableOpacity>}/>

                <View style={{flex: 1}}>

                   <SectionList style={{flex:1,width,backgroundColor:'transparent'}}
                                sections={sections}
                                                   renderItem={this._renderItem}
                                                   renderSectionHeader={this._renderSectionHeader}
                                                   keyExtractor={this._keyExtractor}
                                                   refreshing={this.state.isRefreshing}
                                                   onRefresh={()=>{this._onRefresh()}}
                        >

                        </SectionList>


                    {this.viewModal(parkList, this.state.isAllSelect)}
                    {this.viewQRCodeModal()}

                </View>
            </View>);
    }

    /**
     * 点击弹出Modal下拉框
     * @param title
     */
    pressModalBottom = () => {
        this.setState({
            showModal: true
        })
    };

    /**
     * Modal弹出对话框的的视图
     */
    viewModal(parklist, isAllSelect) {

        // console.log(singleParkList);
        return <Modal
            animationType='fade'
            transparent={true}
            visible={this.state.showModal}
            onRequestClose={() => this.setState({showModal: false})}
        >
            {/*{this.viewParkList(singleParkList, this.positionStyle.top)}*/}
            {this.viewParkList(parklist, isAllSelect)}
        </Modal>
    }


    /**
     * 点击单个的优惠券,弹出二维码框
     * @param countDownTime
     */
    viewQRCodeModal() {
        // console.log(this.props.isShowQRCode);
        // console.log(this.props.isScanSuccess);


        // this.setState({
        //     logText:'--------'+this.state.QRCodeUrl
        // })
        // if (this.props.isScanSuccess) {
        //     CountdownUtil.stop();
        //     this.props.navigation.navigate('PageScanSuccess');
        // }
        // console.log(this.state.isCounting);
        // if (this.props.isShowQRCode) {
        //     CountdownUtil.stop();
        //     this.props.navigation.dispatch({type:Types.ACTION_COUPON_PAGE_STATUS,isShowQRCode:false});
        //
        //         this.props.navigation.navigate('PageScanSuccess');
        //         // this.setState({
        //             // isShowQRCode: false,
        //             // isCounting: false
        //         // });
        //     // setTimeout(() => {
        //     //     this.props.navigation.navigate('PageScanSuccess');
        //     // }, 2000);
        // }

        // if (!this.props.isShowQRCode) {
        //     this.navigation.navigate('PageScanSuccess');
        //
        // }

        return <Modal
            animationType='fade'
            transparent={true}
            visible={this.state.isShowQRCode}
            // onRequestClose={() => {
            //     this.setState({isShowQRCode: false, isCounting: false, countDownTime: '2分00秒'})
            // }}
            onRequestClose={() => {
            }}
        >
            <View style={{
                height: height - 35,
                width,
                marginTop: 35,
                paddingBottom: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#5d5c6199'
            }}>
                <View style={{
                    width: 240,
                    marginBottom: 80,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <View style={{
                        width: 240,
                        height: 55,
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10
                    }}>

                        <Text style={{
                            flex: 1,
                            marginLeft: 55,
                            fontSize: 20,
                            color: 'white',
                            textAlign: 'center'
                        }}>{`扫码领券`}</Text>
                        <TouchableOpacity activeOpacity={0.9}
                                          style={{
                                              width: 55,
                                              height: 55,
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              backgroundColor: 'transparent',
                                          }}
                                          onPress={this.pressCloseQRCodeModal}>
                            <Ionicons size={25} name={'md-close'}
                                      style={{
                                          color: 'white',
                                          backgroundColor: 'transparent'
                                      }}/></TouchableOpacity>
                    </View>


                    <View style={{padding: 15, backgroundColor: 'white', borderRadius: 10}}>

                        <QRCode
                            value={this.state.QRCodeUrl}
                            size={200}
                            bgColor='black'
                            fgColor='white'/>
                    </View>
                    <View style={{
                        width,
                        height: 50,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 18,
                            color: 'white',
                            textAlign: 'center'
                        }}>{`扫码有效倒计时: `}</Text>
                        <Text
                            style={{
                                fontSize: 18,
                                color: cusColors.main_light,
                                textAlign: 'center'
                            }}>{this.state.countDownTime}</Text>
                    </View>
                </View>
            </View>
        </Modal>;
    }

    /**
     * @param parkList
     */
    viewParkList(parkList) {

        // parkList = singleParkList

        var parkRow = [];
        for (const index in parkList) {
            let itemData = parkList[index];
            parkRow.push(<TouchableOpacity
                key={index}
                activeOpacity={1}
                style={{
                    width: width / 1.3,
                    height: 45,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}
                onPress={() => {
                    this.pressModalItem(itemData,parkList)
                }}>

                <Icon size={30} name={itemData.isSelected ? 'circle' : 'circle-thin'}
                      style={{
                          color: itemData.isSelected ? cusColors.main_light : cusColors.main_default,
                          backgroundColor: 'transparent'
                      }}/>

                <Text style={{
                    flex: 1,
                    height: 50,
                    marginLeft: 10,
                    backgroundColor: 'transparent',
                    textAlignVertical: 'center',
                    color: 'grey',
                    fontSize: 16,
                    textAlign: 'left'
                }} numberOfLines={1}>{itemData.parkName}</Text>
            </TouchableOpacity>)
        }
        return <TouchableOpacity activeOpacity={1}
                                 style={{
                                     height: height - 35,
                                     width,
                                     marginTop: 35,
                                     justifyContent: 'flex-start',
                                     alignItems: 'flex-end',
                                     backgroundColor: cusColors.modalBackColor
                                 }} onPress={() => this.setState({
            showModal: false
        })}>

            <View style={{flex: 1, width: width / 1.3, backgroundColor: 'transparent'}}>
                {/*<View style={{width: width / 1.3, height: 10}}/>*/}

                <ImageBackground source={{uri: 'bounced'}}
                                 resizeMode={'contain'}
                                 style={{
                                     paddingTop: 20,
                                     flex: 1,
                                     width: width / 1.3,
                                     backgroundColor: 'transparent',
                                     justifyContent: 'center',
                                     alignItems: 'flex-start',
                                     paddingLeft: 20,
                                     paddingBottom: 30,
                                     paddingRight: 20
                                 }}>
                    <TouchableOpacity activeOpacity={1}
                                      style={{
                                          width,
                                          height: 45,
                                          backgroundColor: 'transparent',
                                          flexDirection: 'row',
                                          justifyContent: 'flex-start',
                                          alignItems: 'center'
                                      }} onPress={()=>{this.pressAllSelect(parkList)}}>

                        <Image
                            source={{uri: this.state.isAllSelect ? 'all_options' : 'all_options_not'}}
                            resizeMode={'contain'}
                            style={{
                                width: 25,
                                height: 25,
                                backgroundColor: 'transparent'
                            }}/>
                        <Text style={{
                            fontSize: 16,
                            color: cusColors.main_light,
                            textAlign: 'center',
                            margin: 10,
                        }}>{`全选`}</Text>

                    </TouchableOpacity>
                    <View style={{
                        width: width / 1.3,
                        height: 1,
                        backgroundColor: 'lightgrey',
                        opacity: 0.5,
                    }}/>

                    <ScrollView
                        style={{flex: 1, backgroundColor: 'transparent'}}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                        // data={singleParkList}
                    >
                        {parkRow}
                    </ScrollView>
                </ImageBackground>
                <View style={{flex: 1}}/>
            </View>
        </TouchableOpacity>
    }

    /**
     * 对弹出窗口中的单个条目进行的点击事件
     * @param itemData
     * @param parkList
     */
    pressModalItem = (itemData,parkList) => {

        // //修改数据库
        // setParkListItemStatus(globalInfo.merCode, itemData);

        console.log('askdasda');
        itemData.isSelected = !itemData.isSelected;

        let isAllSelect = parkIsAllSelect(parkList);
        console.log(isAllSelect);
        this.setState({
            isAllSelect: isAllSelect
        });

        this.props.navigation.dispatch({
            type: Types.ACTION_COUPON_SHOW_ITEM_ENTER,
            merCode: this.props.globalInfo.merCode,
            allCouponList: this.props.allCouponList,
            parkList: parkList,
            parkName: itemData.parkName
        })
    };
    /**
     * 全选 / 全不选的 点击事件
     */
    pressAllSelect = (parkList) => {

        if (this.state.isAllSelect) {
            // let currentParkList = this.state.parkList;
            for (const currentParkItem of parkList) {
                currentParkItem.isSelected = false;
            }
            // console.log(currentParkList);
            this.setState({
                // parkList: currentParkList,
                isAllSelect: false
            });

            this.props.navigation.dispatch({
                type: Types.ACTION_COUPON_SHOW_ALL_ENTER,
                propsData: this.props,
                showAll: false
            })
        } else {
            //全部选中

            // let currentParkList = this.state.parkList;
            for (const currentParkItem of parkList) {
                currentParkItem.isSelected = true;
            }
            // console.log(currentParkList);
            this.setState({
                // parkList: currentParkList,
                isAllSelect: true
            });

            this.props.navigation.dispatch({
                type: Types.ACTION_COUPON_SHOW_ALL_ENTER,
                propsData: this.props,
                showAll: true,
            })
        }
    };
    /**
     * 点击每张券的点击事件 主要为了弹出二维码
     * @param couponSendCode
     */
    pressCouponItem = (couponSendCode) => {
        console.log(couponSendCode);
        // this.setState({
        //     isShowQRCode: true,
        // })

        fetchRequest(`${Api.getQRCode}?couponSendCode=${couponSendCode}&&token=${globalInfo.token}`, 'GET')
            .then(res => {
                if (res.ret === 0) {

                    this.scanTimer = setInterval(() => {
                        // console.log(this.props.scanStatus);
                        // if (this.props.scanStatus === 1) {
                        //     this.props.navigation.navigate('PageScanSuccess');
                        //     clearInterval(this.scanTimer);
                        // } else if (this.props.scanStatus === 0) {
                        //     // clearInterval(this.scanTimer);
                        // }
                        //
                        fetchRequest(`${Api.polling}?token=${globalInfo.token}&&recordId=${res.recordId}`,'GET')
                            .then(res=>{
                                if (res.received) {
                                 this.setState({
                                     isShowQRCode: false,
                                 })
                                    this.props.navigation.navigate('PageScanSuccess');
                                        clearInterval(this.scanTimer);
                                }
                            }).catch(err=>{

                        })
                    }, 3000);



                    this.recordId = res.recordId;
                    this.props.navigation.dispatch({
                        type: Types.ACTION_COUPON_PAGE_STATUS,
                        isShowQRCode: true,
                    });
                    // this.props.initCouponPageStatus(true,0);
                    this.setState({
                        isShowQRCode: true,
                        QRCodeUrl: res.url,
                        recordId: res.recordId,
                        // isCounting: true,

                    });


                    let countdownDate = new Date(new Date().getTime() + 40 * 1000);


                    CountdownUtil.setTimer(countdownDate, (time) => {
                        // this.setState({
                        //     isCounting: true
                        // })
                        let min = time.min;
                        let sec = time.sec;

                        console.log(sec);

                        this.setState({
                            countDownTime: min > 0 ? `${min}分${CountdownUtil.leadingZeros(sec)}秒` : `${sec}秒`
                        })

                        //每隔一秒做一次网络请求; 请求成功则隐藏二维码,关闭计时器 , 请求失败则继续请求,知道计时结束(catch以及else中继续请求)
                        if (time === 0) {
                            // this.props.navigation.dispatch({type:Types.ACTION_COUPON_PAGE_STATUS,isShowQRCode:false})
                            clearInterval(this.scanTimer);
                            this.props.initCouponPageStatus(false,100)

                            this.props.initCouponStopPolling();

                            this.setState({
                                isShowQRCode: false,
                                // isCounting: false,
                                countDownTime: '2分00秒'
                            });

                            // this.props.navigation.dispatch({type: Types.ACTION_COUPON_POLLING_OVER});
                            // this.props.navigation.navigate('PageScanSuccess');
                        }

                    });
                    // this.props.navigation.dispatch({
                    //     type: Types.ACTION_COUPON_POLLING_ENTER,
                    //     navigation: this.navigation,
                    //     url: `${Api.polling}?token=${globalInfo.token}&&recordId=${this.state.recordId}`
                    // })

                } else {
                    ToastUtil.showShort(res.errmsg);
                }
            }).catch(err => {

        })

    }
    /**
     * 点击二维码上的Modal上的关闭按钮,关闭二维码Modal并做处理
     */
    pressCloseQRCodeModal = () => {
        CountdownUtil.stop();

        // this.props.navigation.dispatch({type: Types.ACTION_COUPON_POLLING_OVER});
        this.props.initCouponPageStatus(false,-1);
        this.props.initCouponStopPolling();
        // this.sec = null;
        this.setState({
            // isShowQRCode: false,
        //     // isCounting: false,
            countDownTime: '2分00秒'
        })
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data,
        allCouponList: state.coupon.dataCoupon,
        dataShowCoupon: state.coupon.dataShowCoupon,
        selectedParkList: state.coupon.parkList,            //格式  所有不重复的停车场
        parkNameList: state.coupon.parkNameList,
        // isShowQRCode: state.coupon.isShowQRCode,
        // scanStatus: state.coupon.scanStatus,
    };

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initCouponPageStatus: actions_coupon.setCouponPageStatus,
        initCouponStopPolling: actions_coupon.stopCouponPolling,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageCoupon);
