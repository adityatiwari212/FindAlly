import { userSlice } from "./userSlice";
import {combineReducers, configureStore} from "@reduxjs/toolkit"
import { version } from "react";
import {persistReducer,persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage";


const rootReducer=combineReducers({
    user:userSlice.reducer
})

const persistConfig={
    key:"root",
    storage,
    version:1
}

const persistedState=persistReducer(persistConfig,rootReducer)

export const store=configureStore({
    reducer:persistedState,
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck:false,
    })
})

export const persistor= persistStore(store)
