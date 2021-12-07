import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import {createBrowserHistory} from 'history';
import createSagaMiddleware from 'redux-saga';
import rootReducer, {rootSaga} from '@store';

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
    context: {
        history: customHistory
    }
}); // 사가 미들웨어를 만듭니다.

const store = createStore(
    rootReducer,
    // logger 를 사용하는 경우, logger가 가장 마지막에 와야합니다.
    composeWithDevTools(
        applyMiddleware(
            ReduxThunk.withExtraArgument({history: customHistory}),
            sagaMiddleware, // 사가 미들웨어를 적용하고
            logger
        )
    )
);

sagaMiddleware.run(rootSaga); // 루트 사가를 실행해줍니다.
// 주의: 스토어 생성이 된 다음에 위 코드를 실행해야합니다.

export const getCustomHistory = () => {
    return customHistory;
};

export default store;
