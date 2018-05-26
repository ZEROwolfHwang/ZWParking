/**
 * Created by zerowolf Date: 2018/5/15 Time: 下午1:51
 */
import MyTextInput from "../../../../views/MyTextInput";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
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
    TextInput
} from 'react-native';
export default class Item extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {
        style: {},
        textStyle: {},
        textInputStyle: {},
        title: '',
        placeholder: '',
        onChangeText: null,
        secureTextEntry:false,
        maxLength:21,
    }


    render() {
        var params  = this.props;
        return (
            <View style={{marginTop:10}}>
                <Text style={[{
                    fontSize: 16,
                    color: 'grey'
                },params.textStyle]}>{params.title}</Text>


                <TextInput
                    secureTextEntry={params.secureTextEntry}
                    maxLength={params.maxLength}
                    keyboardType={params.keyboardType}
                    underlineColorAndroid={'transparent'}
                    style={[{width: width - 40,height:40, borderBottomWidth: 1, borderColor:'lightgrey', alignSelf:'flex-end'}, params.textInputStyle]}
                    placeholder={params.placeholder}
                    placeholderTextColor={'lightgrey'}
                    onChangeText={(text) => {
                        params.onChangeText(text)
                    }}/>

            </View>)
    }
}
Item.propTypes = {
    style: PropTypes.object,
    maxLength: PropTypes.number,
    secureTextEntry: PropTypes.bool,
    textStyle: PropTypes.object,
    textInputStyle: PropTypes.object,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
}
