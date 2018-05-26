/**
 * Created by zerowolf Date: 2018/5/26 Time: 上午10:09
 */
import {Dimensions, Platform, PixelRatio} from 'react-native'

const ScreenUtil={
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    onePixel: 1 / PixelRatio.get(),
    STATUSBAR_HEIGHT: (Platform.OS === 'ios' ? 20 : 0),
    APPBAR_HEIGHT: (Platform.OS === 'ios' ? 44 : 56),
}


global.ScreenUtil = ScreenUtil;
global.zWidth = ScreenUtil.width;
global.zHeight = ScreenUtil.height;
