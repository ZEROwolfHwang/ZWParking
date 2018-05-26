/**
 * Created by zerowolf Date: 2018/5/16 Time: 下午2:57
 */
const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
    ListView
} from 'react-native';

export default class ItemFixPhone extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {};

    render() {
        var params = this.props;
        return (
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

                }}>固定电话</Text>
                <TextInput
                    editable={params.editable}
                    style={{
                        width: 45, fontSize: 16,
                        marginRight: 5,
                        color: 'grey', backgroundColor: 'transparent',
                        textAlign: Platform.OS==='ios'?'left':'right',
                    }}
                    keyboardType={'numeric'}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text) => {
                        params.onChangeTextLeft(text)
                    }}
                    value={params.valueLeft}
                />

                <View style={{
                    width: 12,
                    height: 1.5,
                    backgroundColor: 'grey'
                }}/>
                <TextInput
                    editable={params.editable}
                    style={{
                        flex: 1, fontSize: 16,
                        color: 'grey', backgroundColor: 'transparent',
                        textAlign: 'left'
                    }}
                    keyboardType={'numeric'}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text) => {
                        params.onChangeTextRight(text);
                    }}
                    value={params.valueRight}
                />

            </View>)
    }
}
ItemFixPhone.propTypes = {
    onChangeTextLeft: PropTypes.func.isRequired,
    onChangeTextRight: PropTypes.func.isRequired,
    valueLeft: PropTypes.string.isRequired,
    valueRight: PropTypes.string.isRequired,
    editable: PropTypes.bool
};
