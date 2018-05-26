/**
 * Created by zerowolf on 2018/1/16.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform,
    StyleSheet,
    Text, Alert,
    View,
    TouchableOpacity,
    Image, Dimensions, StatusBar
} from 'react-native';

const {width, height} = Dimensions.get('window');
import SizeUtil from '../utils/SizeUtil';
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';

export default class MyTabView extends Component {
    constructor(props) {
        super(props);

    }

    static defaultProps = {
        title: '标题',
        globalTitleColor: 'white',
        backgroundColor: 'transparent',
        style: {},
        leftView: true,
        hasRight: false,
        rightView: null,
        rightIcon: 'md-more',
        cutLineHeight: 0.2,
        isTransparent: false
    }

    render() {
        var params = this.props;
        return (

            <LinearGradient
                start={{x: 0.0, y: 0.0}}
                end={{x: 0.0, y: 1.0}}
                locations={[0, 1]}
                colors={params.isTransparent ? ['transparent', 'transparent'] : ['#8B80FF', '#9773FF']}>

                <View style={[{
                    width: width,
                    height: 60,
                    backgroundColor: params.backgroundColor,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingTop: 20,
                    alignItems: 'center'
                }, params.style]}>

                    {params.leftView ? <TouchableOpacity activeOpacity={0.5}
                                                         style={{
                                                             width: width / 3,
                                                             justifyContent: 'center',
                                                             paddingLeft: 15
                                                         }}
                                                         onPress={() => {
                                                             params.navigation.goBack();
                                                         }}>
                        <Icon size={30} name={'angle-left'}
                              style={{
                                  color: params.globalTitleColor,
                                  backgroundColor: 'transparent'
                              }}/>

                    </TouchableOpacity> : <View style={{width: width / 3}}/>}
                    <StatusBar
                        hidden={false}
                        translucent={true}
                        barStyle={'light-content'}//'default', 'light-content', 'dark-content'
                        backgroundColor={'#fff6fd00'}
                        networkActivityIndicatorVisible={false}
                    />

                    <View style={{
                        flex: 1,
                        width: width / 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <Text style={{
                            fontSize: 16,
                            backgroundColor: 'transparent',
                            color: params.globalTitleColor
                        }}>{params.title}</Text>

                    </View>
                    {params.hasRight ? params.rightView ? params.rightView :
                        <TouchableOpacity activeOpacity={0.5}
                                          style={{
                                              width: width / 3,
                                              justifyContent: 'center',
                                              alignItems: 'flex-end',
                                              paddingRight: 15
                                          }}
                                          onPress={() => {
                                              Alert.alert('更多')
                                          }}>
                            <Ionicons size={20} name={params.rightIcon}
                                      style={{
                                          color: params.globalTitleColor,
                                          backgroundColor: 'transparent'
                                      }}/>

                        </TouchableOpacity> : params.rightView === 2 ? params.rightView :
                        <View style={{width: width / 3}}/>}

                </View>
                <View style={{
                    width: width,
                    height: params.cutLineHeight,
                    backgroundColor: 'lightgrey',
                    alignSelf: 'flex-end'
                }}/>

            </LinearGradient>
        );
    }
}

MyTabView.propTypes = {
    title: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    style: PropTypes.object,
    cutLineHeight: PropTypes.number,
    globalTitleColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    leftView: PropTypes.bool,
    hasRight: PropTypes.bool,
    rightView: PropTypes.object,
    rightIcon: PropTypes.string,
    isTransparent: PropTypes.bool,
}
