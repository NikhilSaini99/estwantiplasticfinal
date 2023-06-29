import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "@/features/formSlice"
import SignupReducer from "@/features/SignupSlice"
import RTRReducer from "@/features/RTRformslice"
import loggedInReducer from "@/features/authSlice"
import validateRTRReducer from "@/features/filledRtrCheckSlice"
// import storage from 'redux-persist/lib/storage';
import createWebStorage from "redux-persist/lib/storage/createWebStorage"
import thunk from "redux-thunk";
import {
  persistReducer, persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';


const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
}

const storage = typeof window !== "undefined"
  ? createWebStorage("local")
  : createNoopStorage();

const persistConfig = {
  key: 'root',
  version: 1,
  storage,

}

const reducer = combineReducers({
  loginForm: loginReducer,
  SignupForm: SignupReducer,
  rtrForm: RTRReducer,
  auth:loggedInReducer,
  validateRTR:validateRTRReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})


export const persistor = persistStore(store);