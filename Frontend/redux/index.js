import { userSlice } from "./userSlice";
import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {persistReducer,persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage/session";
import { chatSlice } from "./chatSlice";
import { UsersSlice } from "./usersSlice";

const rootReducer=combineReducers({
    user:userSlice.reducer,
    chat:chatSlice.reducer,
    users:UsersSlice.reducer,
})

const persistConfig={
    key:"newKey",
    storage,
    version:1
}

const persistedState=persistReducer(persistConfig,rootReducer)

export const store=configureStore({
    reducer:persistedState,
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck:{ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],}
    })
})

export const persistor= persistStore(store)
