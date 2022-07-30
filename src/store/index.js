import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga/";
import auth from "./auth/slice";
import galleries from "./galleries/slice";
import sagas from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
      auth,
      galleries,
    },
    middleware: [...getDefaultMiddleware(), sagaMiddleware], 
    
});

for (const saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}

export default store;