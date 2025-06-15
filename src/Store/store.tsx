import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import authorizedUserSlice from "./slices/authorizedUserSlice";
import storage from "redux-persist/lib/storage";
import roomSlice from "./slices/roomSlice.tsx";

const persistConfig = {
  key: "userSession",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, authorizedUserSlice);
const persistRoomsReducer = persistReducer(persistConfig, roomSlice);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    rooms: persistRoomsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };