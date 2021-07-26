import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('tasklist')) || [],
  editingItem: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    deleteTask: (state, action) => {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      console.log(newItems);
      state.items = [...newItems];
    },
    findTask: (state, action) => {
      const editingTask = state.items.find(
        (item) => item.id === action.payload
      );

      state.editingItem = {
        title: editingTask.input,
        id: editingTask.id,
      };
    },
    editTask: (state, action) => {
      const newItemsArr = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );

      state.items = [...newItemsArr];
      state.editingItem = null;
    },
  },
});

export const { addTask, deleteTask, findTask, editTask } = taskSlice.actions;
export const selectTask = (state) => state.task.items;
export const selectEditingItem = (state) => state.task.editingItem;

export default taskSlice.reducer;
