/**
 * Created by zerowolf Date: 2018/5/23 Time: 下午2:52
 */


export const Types = {
    ACTION_SETTING_BACK_2_MAIN: 'ACTION_SETTING_BACK_2_MAIN',  //退出主界面的逻辑
};

export const setting = (state = {}, action) => {
    switch (action.type) {
        case Types.ACTION_SETTING_BACK_2_MAIN:
            // console.log(action.data);
            return Object.assign(
                {},
                state,
                {data: action.data}
            );
        default:
            return state;
    }
};

export const actions_setting = {
    // back2Main: (data) => ({type: Types.ACTION_SETTING_BACK_2_MAIN, data}),
};
