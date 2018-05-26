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
    Dimensions, Image
} from 'react-native';

const {width, height} = Dimensions.get('window')
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MyTextInputWithIcon extends Component {
    constructor(props) {
        super(props);

    }

    static defaultProps = {
        keyboardType: 'default',
        style: {},
        textInputStyle: {},
        value: null,
        placeholder: '请输入内容',
        iconName: 'phone',
        iconColor: 'white',
        placeholderTextColor: '#cecbd7',
        maxLength: 21,
        imageSize: 20,
        secureTextEntry:false
    };


    render() {
        var param = this.props;
        return (
            <View style={[{
                marginTop: 20,
                width: 220,
                height: 42,
                flexDirection: 'row',
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#FFFFFFFF',
                borderWidth: 1,
                borderRadius: 6,
            }, param.style]}

            >

                <View style={{width:42,height:42,padding:10}}>

                {param.imageURL ?
                    <Image style={{width: param.imageSize, height: param.imageSize,
                        backgroundColor: 'transparent'}}
                           source={{uri: param.imageURL}}
                           resizeMode={'contain'}/>
                    :
                    <Icon size={param.imageSize} name={param.iconName}
                          style={{
                              color: param.iconColor,

                              backgroundColor: 'transparent'
                          }}/>
                }
                </View>


                <TextInput
                    secureTextEntry={param.secureTextEntry}
                    keyboardType={param.keyboardType}
                    underlineColorAndroid={'transparent'}
                    style={[styles.textInputStyle_01, param.textInputStyle]}
                    placeholder={param.placeholder}
                    placeholderTextColor={param.placeholderTextColor}
                    maxLength={param.maxLength}
                    onChangeText={(text) => {
                        param.onChangeText(text)
                    }}
                    value={param.value}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInputStyle_01: {
        flex: 1,
        color: 'white',
        height: 50,
        backgroundColor: 'transparent',
        textAlign: 'left',
    }
})


MyTextInputWithIcon.propTypes = {
    style: PropTypes.object,
    keyboardType: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    placeholderTextColor: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    textInputStyle: PropTypes.object,
    secureTextEntry: PropTypes.bool,
    iconName: PropTypes.string,
    imageURL: PropTypes.string,
    imageSize: PropTypes.number,
    iconColor: PropTypes.string,
    maxLength: PropTypes.number
};
