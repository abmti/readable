
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'

//import promise from 'redux-promise'
import thunk from 'redux-thunk'
import multi from 'redux-multi'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducers from './reducers/index'
import App from './containers/App'

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const routerMiddlewareHistory = routerMiddleware(history)

const middleware = [multi, thunk, routerMiddlewareHistory];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(
    reducers, composeWithDevTools(applyMiddleware(...middleware))
)

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker();
