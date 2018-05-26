import { AppRegistry } from 'react-native';
console.ignoredYellowBox = ['Remote debugger'];

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


YellowBox.ignoreWarnings(['Class RCTCxxModule']);

import App from './App';
// import App from './zwTest/Root';


AppRegistry.registerComponent('Parking', () => App);
