import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  task_organization_id: number;
  name: string;
  description: string;
  deadline: string;
  status: string;
  employee_assigned: Array<number> | null;
}

export interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export const TaskSlice = createSlice({
  name: "task",
  initialState,

  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        id: number;
        task_organization_id: number;
        name: string;
        description: string;
        deadline: string;
        status: string;
        employee_assigned: Array<number> | null;
      }>
    ) => {
      state.tasks.push({
        id: Date.now(),
        name: action.payload.name,
        task_organization_id: action.payload.task_organization_id,
        description: action.payload.description,
        deadline: action.payload.deadline,
        status: action.payload.status,
        employee_assigned: action.payload.employee_assigned,
      });
    },

    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    saveTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },

    editTask: (
      state,
      action: PayloadAction<{
        id: number;
        task_organization_id: number;
        name: string;
        description: string;
        deadline: string;
        status: string;
        employee_assigned: Array<number> | null;
      }>
    ) => {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );

      //console.log('redux', action.payload);

      state.tasks[taskIndex] = {
        id: action.payload.id,
        name: action.payload.name,
        task_organization_id: action.payload.task_organization_id,
        description: action.payload.description,
        deadline: action.payload.deadline,
        status: action.payload.status,
        employee_assigned: action.payload.employee_assigned,
      };
    },
  },
});

export default TaskSlice.reducer;
export const { addTask, editTask, deleteTask, saveTasks } = TaskSlice.actions;
