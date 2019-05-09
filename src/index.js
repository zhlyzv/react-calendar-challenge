import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as serviceWorker from './serviceWorker';
import Calendar from './components/Calendar';
import rootReducer from './store/reducers/rootReducer';
import GlobalStyle from './styles';

const store = createStore(rootReducer, composeWithDevTools());

const app = (
    <Provider store={store}>
        <GlobalStyle />
        <Calendar />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
