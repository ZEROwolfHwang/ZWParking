/**
 * Created by zerowolf on 2018/1/7.
 */
const {width, height} = Dimensions.get('window')
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text, Alert,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import SizeUtil from '../utils/SizeUtil';
import LinearGradient from "react-native-linear-gradient";

export default class MyButtonView extends Component {
    constructor(props) {
        super(props);

    }

    static defaultProps = {
        title: '点击',
        style: {},
        onPress: null,
        color1: '#8B92FF',
        color2: '#777FFF'
    }

    render() {
        var params = this.props;
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    params.onPress()
                }}
            >
                <LinearGradient
                    style={[styles.buttonViewStyle_01, params.style]}
                    start={{x: 0.0, y: 0.0}}
                    end={{x: 0.0, y: 1.0}}
                    locations={[0, 1]}
                    colors={[params.color1, params.color2]}
                >

                    <Text style={{fontSize: 18, color: 'white'}}>
                        {this.props.title}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}
{/*<TouchableOpacity activeOpacity={0.5}*/
}
{/*style={[styles.buttonViewStyle_01, params.style]}*/
}
{/*onPress={() => {*/
}
{/*params.onPress();*/
}
{/*}}>*/
}
{/*</TouchableOpacity>*/
}

MyButtonView.propTypes = {
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
    onPress: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    buttonViewStyle_01: {
        marginTop: 40,
        width: 220,
        height: 44,
        backgroundColor: '#4e73ff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        // elevation: 5,
        // shadowOffset: {width: 5, height: 5},
        // shadowColor: '#ff5a4f',
        // shadowOpacity: 0.6,
        // shadowRadius: 2,
    },
});
