/**
 * Created by zerowolf Date: 2018/5/13 Time: 下午3:48
 */
const {width, height} = Dimensions.get('window');
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ItemIconTextIconView extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {
        title: '条目',
        globalColor: 'grey',  //title字体的颜色
        imageName: 'home',
        imageSize: 20,
        onPress: null,
        style: {}
    }

    render() {
        var params = this.props;
        return <TouchableOpacity activeOpacity={0.8} style={[{
            width,
            height: 45,
            marginTop: 20,
            flexDirection: 'row',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 2,
            shadowOffset: {width: 5, height: 5},
            shadowColor: '#ff5a4f',
            shadowOpacity: 0.6,
            shadowRadius: 2,
        }, params.style]}
                                 onPress={() => {
                                     params.onPress();
                                 }}>
            <Image source={{uri: params.imageName}}
                   resizeMode={'contain'}
                   style={{
                       width: params.imageSize,
                       height: params.imageSize,
                       margin: 10,
                       backgroundColor: 'transparent'
                   }}/>
            <Text style={{
                flex: 1, fontSize: 16, color: params.globalColor, textAlign: 'left',
            }}>{params.title}</Text>
            <Icon size={20} name={'angle-right'}
                  style={{color: 'lightgrey', marginRight: 20, backgroundColor: 'transparent'}}/>
        </TouchableOpacity>


    }
}
ItemIconTextIconView.propTypes = {
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
    globalColor: PropTypes.string,
    imageName: PropTypes.string.isRequired,
    imageSize: PropTypes.number,
    onPress: PropTypes.func.isRequired,
}

