/**
 * Created by zerowolf Date: 2018/5/15 Time: 下午3:07
 */
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

    static defaultProps={
        cutLineHeight: 1,
        editable: true,
        style: {},
        keyboardType: 'default',
        value: ''
    }

    render() {
        var params = this.props;
        return (<View>
            <View style={[{
                width,
                height: 50,
                backgroundColor: 'white',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row'
            },params.style]}>
                <Text style={{
                    width: 110,
                    fontSize: 17,
                    paddingLeft: 20,
                    color: '#666',
                    textAlign: 'left'

                }}>{params.title}</Text>
                <TextInput
                    //ref={refs=>params.ref =refs}
                    style={{
                    flex: 1, fontSize: 16,
                    color: 'grey', backgroundColor: 'transparent'
                }}
                           keyboardType={params.keyboardType}
                           editable={params.editable}
                           underlineColorAndroid={'transparent'}
                           onChangeText={(text) => {
                               params.onChangeText(text)
                           }}
                           value={params.value}/>


            </View>
            <View style={{
                width: width - 20,
                height: params.cutLineHeight,
                backgroundColor: 'grey',
                opacity: 0.1,
                alignSelf: 'flex-end'
            }}/>
        </View>);



    }
}
Item.propTypes = {
    title: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    style : PropTypes.object,
    cutLineHeight: PropTypes.number,
    editable: PropTypes.bool,
    keyboardType: PropTypes.string,
    value:PropTypes.string.isRequired
};
