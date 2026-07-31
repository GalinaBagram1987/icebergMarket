import { createSlice } from '@reduxjs/toolkit';

/**
 * временный слайс для подключения redux
 * удалть когда появится состояние
 */

const testSlice = createSlice({
  name: 'test',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = testSlice.actions;
export default testSlice.reducer;
