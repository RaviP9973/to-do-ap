import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [], // Array to store tasks
};

const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const { id, title, description, priority, completed ,date, remainder} = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          title,
          description,
          priority,
          completed,
          date,
          remainder,
        };
      }
    }
  },
});

export const { addTask, toggleTask, deleteTask ,updateTask} = toDoSlice.actions;
export default toDoSlice.reducer;
