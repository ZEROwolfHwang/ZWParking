import {Dimensions, StyleSheet} from "react-native";

export const showModal=(dropDownHeight,touchBtn,boxStyle,callback)=> {
    if (touchBtn && touchBtn.measure) {
        touchBtn.measure((fx, fy, width, height, px, py) => {
            console.log(fx);
            console.log(fy);
            console.log(width);
            console.log(height);
            console.log(px);
            console.log(py);
            this._buttonFrame = {x: px, y: py, w: width, h: height};

            var boxStyleObj = StyleSheet.flatten(boxStyle);

            console.log(boxStyleObj);

            const dimensions = Dimensions.get('window');
            const windowWidth = dimensions.width;
            const windowHeight = dimensions.height;

            // const dropDownHeight = height;


            const bottomSpace = windowHeight - this._buttonFrame.y - this._buttonFrame.h;
            const rightSpace = windowWidth - this._buttonFrame.x;
            const showInBottom = bottomSpace >= dropDownHeight || bottomSpace >= this._buttonFrame.y;
            const showInLeft = rightSpace >= this._buttonFrame.x;

            const positionStyle = {
                height: dropDownHeight,
                top: showInBottom ? this._buttonFrame.y + this._buttonFrame.h -20: Math.max(0, this._buttonFrame.y - dropDownHeight),
            };

            if (showInLeft) {
                positionStyle.left = this._buttonFrame.x;

            } else {
                positionStyle.right = rightSpace - this._buttonFrame.w;
            }
            const dropDownWidth = boxStyleObj.width;
            if (dropDownWidth !== -1) {
                positionStyle.width = dropDownWidth;
            }

            callback(positionStyle);
        });
    }
}
