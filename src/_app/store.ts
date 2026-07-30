import { configureStore, combineReducers } from '@reduxjs/toolkit';
import testReducer from '@/features/test/model/testSlice';

const rootReducer = combineReducers({
  // Сюда в будущем добавятся редюсеры
  test: testReducer,
});

export const makeStore = () => {
  // создает чистое хранилище для кажд ползователя
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // отключает проверку на сложные объекты JS
      }),
  });
};

// ОБЯЗАТЕЛЬНО: экспортируем тип AppStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
