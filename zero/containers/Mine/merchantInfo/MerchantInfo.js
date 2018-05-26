/**
 * Created by zerowolf Date: 2018/5/13 Time: 下午4:05
 */
import Item from "./Item";

const {width, height} = Dimensions.get('window');
import BaseComponent from "../../../views/BaseComponent";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
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
    TextInput, FlatList, ScrollView
} from 'react-native';
import MyTabView from "../../../views/MyTabView";
import MyButtonView from "../../../views/MyButtonView";
import ItemContact from "./ItemContact";
import ToastUtil from "../../../utils/ToastUtil";
import {fetchRequest} from "../../../utils/FetchUtil";
import {fetchRequestToken} from "../../../utils/FetchUtilToken";
import ItemFixPhone from "./ItemFixPhone";
import {checkFixPhone, checkIsNull, checkMobile} from "../../../utils/CheckUitls";
import Region from "./region";

let globalInfo;

class MerchantInfo extends BaseComponent {

    constructor(props) {
        super(props);

        globalInfo = this.props.globalInfo;

        this.state = {

            visible: false,
            editable: false,

            merName: "",
            fixPhone: "",
            fixPhoneLeft: "",
            fixPhoneRight: "",
            province: "广东省",
            city: "深圳市",
            district: "福田区",
            address: "",
            contactList: [],
            contactCount: 1
        }

        this.renderContact = this._renderContact.bind(this)
    }


    componentWillMount() {
        fetchRequest(`/biz/queryBizMerDetail?merCode=${globalInfo.merCode}`, "GET")
            .then(res => {
                console.log(res);
                if (res.ret === 0) {
                    let bizMer = res.bizMer;
                    let splitList = bizMer.fixPhone.split('-');

                    let contactList = bizMer.contactList;

                    let contactCount = contactList.length;
                    if (contactCount === 0) {
                        contactCount = 1;
                        contactList = [{'contactName': '', 'staffPhone': ''}]
                    }
                    console.log(contactCount);
                    contactCount;
                    this.setState({
                        merName: bizMer.merName,
                        fixPhoneLeft: splitList[0] ? splitList[0] : '',
                        fixPhoneRight: splitList[1] ? splitList[1] : '',
                        fixPhone: bizMer.fixPhone,
                        province: bizMer.province,
                        city: bizMer.city,
                        district: bizMer.district,
                        address: bizMer.address,
                        contactList: contactList,
                        contactCount: contactCount
                    })
                } else {
                    console.log(res.errmsg);
                }
            })
            .catch(err => {
                console.log(err);
            });

        console.log(this.state.contactList);
    }


    _renderContact(count, contactList) {
        console.log(contactList);

        var contactRow = [];
        for (let i = 0; i < count; i++) {

            contactRow.push(
                <ItemContact
                    editable={this.state.editable}
                    key={i} count={count}
                             keyboardTypePhone={'numeric'}
                             onChangeTextUser={(text) => {
                                 contactList[i].contactName = text;
                                 this.setState({
                                     contactList: contactList
                                 })
                             }}
                             onChangeTextPhone={(text) => {
                                 contactList[i].staffPhone = text;
                                 this.setState({
                                     contactList: contactList
                                 })
                             }}
                             onPressDelete={() => {
                                 console.log(i);
                                 this.onPressDelete(i, contactList[i])
                             }}
                             valueUser={contactList[i] ? contactList[i].contactName : ''}
                             valuePhone={contactList[i] ? contactList[i].staffPhone : ''}
                />
            );
        }

        return <View>
            {contactRow}
        </View>
    }

    onPressDelete(index, contactItem) {
        console.log(index);
        console.log(contactItem);
        let contactArr = this.state.contactList;
        contactArr.splice(index, 1);
        this.setState({
            contactCount: this.state.contactCount - 1,
            contactList: contactArr
        })
        console.log(this.state.contactList);
    }


    chooseRegion() {
        this.setState({
            visible: true
        })
    }

    cancled() {
        this.setState({
            visible: false
        });
        console.log(this.state.visible);
    }

    setChoosed(p, c, a) {
        this.setState({
            province: p,
            city: c,
            district: a,
            visible: false
        });
    }

    render() {

        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView title={'商户信息'} navigation={this.props.navigation} hasRight={true}
                           rightView={
                               <TouchableOpacity activeOpacity={0.5}
                                                 style={{
                                                     width: width / 3,
                                                     justifyContent: 'center',
                                                     alignItems: 'flex-end',
                                                     paddingRight: 15
                                                 }}
                                                 onPress={() => {
                                                     this.setState({
                                                         editable: true
                                                     })
                                                 }}>
                                   <Icon size={20} name={'edit'}
                                         style={{
                                             color: 'white',
                                             backgroundColor: 'transparent'
                                         }}/>

                               </TouchableOpacity>
                           }/>
                <ScrollView style={{flex: 1,}}
                            keyboardShouldPersistTaps={'always'}
                            contentContainerStyle={{
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                    <Item editable={this.state.editable}
                          title={'商户名称:'} onChangeText={(text) => {
                        this.setState({
                            merName: text
                        })
                    }}
                          value={this.state.merName}/>


                    <View style={[{
                        width,
                        height: 50,
                        backgroundColor: 'white',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }]}>
                        <Text style={{
                            width: 110,
                            fontSize: 17,
                            paddingLeft: 20,
                            color: '#666',
                            textAlign: 'left'

                        }}>所在地区</Text>
                        <TouchableOpacity activeOpacity={0.9}
                                          style={{
                                              flex: 1,
                                              backgroundColor: 'transparent',
                                              flexDirection: 'row',
                                              justifyContent: 'space-between',
                                              alignItems: 'center'
                                          }}
                                          onPress={this.chooseRegion.bind(this)}
                        >

                            <Text style={{
                                flex: 1, fontSize: 16,
                                color: 'grey', backgroundColor: 'transparent', textAlign: 'left'
                            }}>
                                {this.state.province + this.state.city + this.state.district}

                            </Text>

                            <Icon size={20} name={'angle-right'}
                                  style={{
                                      color: 'grey',
                                      marginRight: 20,
                                      backgroundColor: 'transparent'
                                  }}/>
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        width: width - 20,
                        height: 1,
                        backgroundColor: 'grey',
                        opacity: 0.1,
                        alignSelf: 'flex-end'
                    }}/>

                    <Item editable={this.state.editable} title={'详细地址:'} onChangeText={(text) => {
                        this.setState({
                            address: text
                        })
                    }}
                          value={this.state.address}/>


                    <ItemFixPhone
                        editable={this.state.editable}
                        onChangeTextLeft={(text) => {
                            this.setState({
                                fixPhoneLeft: text,
                                fixPhone: text + '-' + this.state.fixPhoneRight
                            })
                        }}
                        onChangeTextRight={(text) => {
                            this.setState({
                                fixPhoneRight: text,
                                fixPhone: this.state.fixPhoneLeft + '-' + text
                            })
                        }}
                        valueLeft={this.state.fixPhoneLeft}
                        valueRight={this.state.fixPhoneRight}
                    />


                    {this.renderContact(this.state.contactCount, this.state.contactList)}

                    {this.state.editable ?
                        <Text style={{
                            fontSize: 16,
                            margin: 10,
                            marginLeft: 20,
                            color: 'blue',
                            alignSelf: 'flex-start',
                            textAlign: 'left'
                        }}
                              onPress={() => this.pressAddContact(this.state.contactCount, this.state.contactList)}>+
                            添加联系人</Text> : null

                    }

                    {this.state.editable ?
                        <MyButtonView style={{width: width / 1.3, marginBottom: 20}}
                                      title={'保存'}
                                      onPress={this.pressSaveInfo}/> : null}
                </ScrollView>


                <Region visible={this.state.visible} setChoosed={this.setChoosed.bind(this)}
                        cancled={this.cancled.bind(this)}/>


                {this.state.editable ?
                    null
                    : <View style={{
                        width,
                        height,
                        backgroundColor: '#b2aebd99',
                        top: 60,
                        position: 'absolute'
                    }}/>
                }
            </View>
        );

    }

    /**
     * 添加联系人条目
     */
    pressAddContact = (contactCount, contactList) => {
        if (contactCount < 3) {
            contactList.push({'contactName': '', 'staffPhone': ''});
            this.setState({
                contactCount: contactCount + 1,
                contactList: contactList
            });
        } else {
            ToastUtil.showShort('最多只能添加三个联系人')
        }
    }

    /**
     * 点击保存,提交修改后的商户信息
     */
    pressSaveInfo = () => {
        console.log(this.state);



        if (!checkIsNull('商户名称', this.state.merName)) {
            return
        }

        if (!checkIsNull('所在地区', this.state.province)) {
            return
        }

        if (!checkIsNull('详细地址', this.state.address)) {
            return
        }


        if (!checkFixPhone(this.state.fixPhone)) {
            return;
        }

        let contactList = this.state.contactList;
        for (const contactItem of contactList) {
            if (!checkIsNull('联系人', contactItem.contactName)) {
                return
            }
            if (!checkMobile(contactItem.staffPhone)) {
                return;
            }
        }


        var dataJson = {
            merCode: globalInfo.merCode,
            merName: this.state.merName,
            fixPhone: this.state.fixPhone,
            province: this.state.province,
            city: this.state.city,
            district: this.state.district,
            address: this.state.address,
            contactList: contactList
        }
        fetchRequestToken('/biz/addOrUpdateBizMerchant', 'POST', globalInfo.token, dataJson)
            .then(res => {
                if (res.ret === 0) {
                    this.setState({
                        editable: false
                    })
                    ToastUtil.showShort('保存成功');
                } else {
                    console.log(res.errmsg);
                    ToastUtil.showShort(res.errmsg);
                }
            })
            .catch(err => {
                console.log(err);
                ToastUtil.showShort(err)
            })
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        globalInfo: state.globalInfo.data
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantInfo);
