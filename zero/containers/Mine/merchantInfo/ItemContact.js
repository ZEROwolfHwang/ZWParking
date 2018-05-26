/**
 * Created by zerowolf Date: 2018/5/15 Time: 下午3:07
 */
const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
    TextInput
} from 'react-native';

export default class Item extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {
        cutLineHeight: 1,
        editable: true,
        style: {},
        keyboardTypeUser: 'default',
        keyboardTypePhone: 'default',
        titleUser: '联系人',
        titlePhone: '联系电话',
        valueUser: '',
        valuePhone: '',

    }

    render() {
        var params = this.props;
        // console.log(params.key);
        return (<View style={[{backgroundColor: 'white', marginTop: 10}, params.style]}>

                <View style={{
                    width,
                    height: 50,
                    backgroundColor: 'white',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        width: 110,
                        fontSize: 17,
                        paddingLeft: 20,
                        color: '#666',
                        textAlign: 'left'

                    }}>{params.titleUser}</Text>
                    <TextInput
                        style={{
                        flex: 1, fontSize: 16,
                        color: 'grey', backgroundColor: 'transparent'
                    }}
                               keyboardType={params.keyboardTypeUser}
                               editable={params.editable}
                               underlineColorAndroid={'transparent'}
                               onChangeText={(text) => {
                                   params.onChangeTextUser(text)
                               }}
                               value={params.valueUser}
                    />

                    {params.count > 1 ?

                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={() => {
                                              params.onPressDelete()
                                          }}>

                        <Image source={{uri: 'delete'}}
                               resizeMode={'contain'}
                               style={{
                                   width: 20,
                                   height: 20,
                                   marginRight: 20,
                                   backgroundColor: 'transparent'
                               }}/>

                        </TouchableOpacity>


                        : null}
                </View>
                <View style={{
                    width: width - 20,
                    height: params.cutLineHeight,
                    backgroundColor: 'grey',
                    opacity: 0.1,
                    alignSelf: 'flex-end'
                }}/>


                <View style={{
                    width,
                    height: 50,
                    backgroundColor: 'white',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        width: 110,
                        fontSize: 17,
                        paddingLeft: 20,
                        color: '#666',
                        textAlign: 'left'

                    }}>{params.titlePhone}</Text>
                    <TextInput style={{
                        flex: 1, fontSize: 16,
                        color: 'grey', backgroundColor: 'transparent'
                    }}
                               keyboardType={params.keyboardTypePhone}
                               maxLength={11}
                               editable={params.editable}
                               underlineColorAndroid={'transparent'}
                               onChangeText={(text) => {
                                   params.onChangeTextPhone(text)
                               }}
                               value={params.valuePhone}
                    />

                </View>
            </View>
        );


    }
}
Item.propTypes = {
    titleUser: PropTypes.string,
    titlePhone: PropTypes.string,
    // valueUser: PropTypes.string.isRequired,
    // valuePhone: PropTypes.string.isRequired,
    onChangeTextUser: PropTypes.func.isRequired,
    onChangeTextPhone: PropTypes.func.isRequired,
    onPressDelete: PropTypes.func,
    style: PropTypes.object,
    cutLineHeight: PropTypes.number,
    editable: PropTypes.bool,
    keyboardTypeUser: PropTypes.string,
    keyboardTypePhone: PropTypes.string,

};
