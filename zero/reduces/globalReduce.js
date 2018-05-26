/**
 * Created by zerowolf Date: 2018/5/14 Time: 上午10:49
 */

const Types = {
    GLOBAL_INFO: 'GLOBAL_INFO'
};

export const globalInfo = (state = {}, action) => {
    switch (action.type) {
        case Types.GLOBAL_INFO:
            return Object.assign(
                {},
                state,
                {data: action.data}
            )
        default:
            return state;
    }
};

export const actions_global ={
    getGlobalInfo:(data)=>({type:Types.GLOBAL_INFO,data})
}
