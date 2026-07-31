import { configureStore, combineReducers } from '@reduxjs/toolkit';
import testReducer from '@/features/test/model/testSlice';

/**
 * Корневой редьюсер приложения.
 * Объединяет редьюсеры отдельных сущностей и функциональностей
 * в единое состояние Redux.
 */

const rootReducer = combineReducers({
  // Сюда в будущем добавятся редюсеры
  test: testReducer,
});

/**
 * Создаёт новый экземпляр Redux-хранилища.
 *
 * Используется в ReduxProvider для создания отдельного хранилища
 * для каждого экземпляра приложения.
 *
 * @returns Настроенный экземпляр Redux store.
 */

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

/** Тип экземпляра Redux-хранилища, создаваемого функцией makeStore.*/
export type AppStore = ReturnType<typeof makeStore>;
/**  Тип корневого состояния Redux-хранилища. */
export type RootState = ReturnType<typeof rootReducer>;
/** Тип функции dispatch текущего Redux-хранилища. */
export type AppDispatch = AppStore['dispatch'];
