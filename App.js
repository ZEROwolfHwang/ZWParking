import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import AllReducers from './zero/root/AllReducers';
import AppNavigator from './zero/root/AppNavigator';
import createSagaMiddleware from 'redux-saga';

import { middleware } from './zero/root/redux';
import rootSaga from "./zero/root/rootSaga";

// const store = createStore(
//     AllReducers,
//     applyMiddleware(middleware)
// );
const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        AllReducers,
        compose(
            applyMiddleware(sagaMiddleware,middleware)
        )
    )

    sagaMiddleware.run(rootSaga);
    // store.close = () => store.dispatch(END);
    return store;
};
const store = configureStore();


export default class App extends Component<{}> {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            // this.state.showSplash ? <Splash navigation = {this.props.navigation} />
            //     :
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        )
            ;
    }

}
