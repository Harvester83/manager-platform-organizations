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
    saveTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export default TaskSlice.reducer;
export const { saveTasks } = TaskSlice.actions;
