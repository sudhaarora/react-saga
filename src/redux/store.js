import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";
import rootReducer from "./rootReducer";
import rootSaga from "./usersagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

// eslint-disable-next-line no-undef
if(process.env.NODE_ENV == "development"){
    middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;