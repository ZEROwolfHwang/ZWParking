import {NavigationActions} from 'react-navigation';
import {SNavigator} from '../root/SNavigator';

export const nav = (state, action) => {
    switch (action.type) {

        // case 'ShiMing':
        //     return SNavigator.router.getStateForAction(
        //         NavigationActions.navigate({routeName: 'ShiMing'}),
        //         {...state, data: action.data}
        //     );
        default:
            return SNavigator.router.getStateForAction(action, state) || state;
    }
}
