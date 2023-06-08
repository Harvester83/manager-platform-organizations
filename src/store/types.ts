export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  // Тип задачи
  export interface Task {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    status: string;
  }