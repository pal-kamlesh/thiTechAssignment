import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import userReducer, { handleLogout } from "./user/userSlice.js";

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const tokenMiddleware = (store) => (next) => async (action) => {
  if (action.type.endsWith("/rejected")) {
    const { statusCode } = action.payload || {};
    if (statusCode === 401) {
      store.dispatch(handleLogout());
    }
  }
  return next(action);
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(tokenMiddleware),
});

export const persistor = persistStore(store);
