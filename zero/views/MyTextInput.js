/**
 * Created by zerowolf on 2018/1/3.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text, Alert,
    View,
    TextInput,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window')
import PropTypes from 'prop-types';
import SizeUtil from '../utils/SizeUtil';


export default class MyTextInput extends Component {
    constructor(props) {
        super(props);

    }

    static defaultProps = {
        keyboardType: 'default',
        style: {},
        value: null,
        placeholder: '请输入内容',
        underlineColorAndroid:'transparent',
        maxLength:21
    };

    render() {
        var param = this.props;
        return (
            <TextInput
                maxLength={param.maxLength}
                keyboardType={param.keyboardType}
                underlineColorAndroid={param.underlineColorAndroid}
                style={[styles.textInputStyle_01, param.style]}
                placeholder={param.placeholder}
                placeholderTextColor={'lightgrey'}
                onChangeText={(text) => {
                    param.onChangeText(text)
                }}
                value={param.value}/>
        )
    }
}

const styles = StyleSheet.create({
    textInputStyle_01: {
        marginTop: 10,
        width: width - 20,
        height: 60,
        backgroundColor: 'transparent',
        textAlign: 'left',
        borderRadius: 5,
        borderColor:'white',
        borderWidth:1,
    }
})


MyTextInput.propTypes = {
    style: PropTypes.object,
    maxLength: PropTypes.number,
    keyboardType: PropTypes.string,
    underlineColorAndroid: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
};
