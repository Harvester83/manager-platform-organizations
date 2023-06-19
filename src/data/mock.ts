import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { token } from "./";
import { User } from "../store/user/slice";
import { Task } from "../store/task/slice";

export const apiLogin = axios.create();
export const apiSignUp = axios.create();
export const apiUsers = axios.create();
export const apiTasks = axios.create();

const mockAdapterLogin = new MockAdapter(apiLogin);
const mockAdapterSignUp = new MockAdapter(apiSignUp);
const mockAdapterUsers = new MockAdapter(apiUsers);
const mockAdapterTasks = new MockAdapter(apiTasks);

mockAdapterLogin.onPost("/api/login").reply(200, {
  token,
  user: {
    id: 2,
    organization_id: 24,
    organization_name: "TechSolutions",
    phone: "+712345678",
    address: "Central district",
    username: "Romo",
    email: "romo@gmail.com",
    password: "123456",
    role: "admin",
    lastName: "Surname2",
  },
});

mockAdapterSignUp.onPost("/api/signup").reply(200, {
  message: true,
  token,
});

mockAdapterUsers
  .onGet("/api/users", { params: { organization_id: 24 } })
  .reply(200, {
    users: [
      {
        id: 3,
        organization_id: 24,
        organization_name: "FoodDelivery",
        phone: "+701234567",
        address: "City Center",
        username: "Emma",
        email: "emma@gmail.com",
        password: "abc123",
        role: "user",
        lastName: "Surname3",
      },
      {
        id: 5,
        organization_id: 24,
        organization_name: "FashionStore",
        phone: "+700000000",
        address: "Shopping Mall",
        username: "Sarah",
        email: "sarah@gmail.com",
        password: "pass1234",
        role: "user",
        lastName: "Surname5",
      },
      {
        id: 6,
        organization_id: 24,
        organization_name: "SoftwareTech",
        phone: "+704444444",
        address: "Tech Park",
        username: "Alex",
        email: "alex@gmail.com",
        password: "securepass",
        role: "user",
        lastName: "Surname6",
      },
      {
        id: 7,
        organization_id: 24,
        organization_name: "FitnessCenter",
        phone: "+703333333",
        address: "Gym Street",
        username: "Jessica",
        email: "jessica@gmail.com",
        password: "strong123",
        role: "admin",
        lastName: "Surname7",
      },
      {
        id: 9,
        organization_id: 24,
        organization_name: "HealthClinic",
        phone: "+706666666",
        address: "Medical Avenue",
        username: "Emily",
        email: "emily@gmail.com",
        password: "health123",
        role: "user",
        lastName: "Surname9",
      },
    ],
  });

mockAdapterUsers.onPost("/api/users").reply((config) => {
  const user = JSON.parse(config.data);
  const addedUser: User = {
    id: Number(new Date()),
    organization_id: Number(new Date()),
    organization_name: user.organization_name,
    phone: user.phone,
    address: user.address,
    username: user.username,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    role: user.role,
  };

  return [201, addedUser];
});

mockAdapterUsers.onPut(/\/api\/users\/\d+/).reply((config) => {
  const user = JSON.parse(config.data);
  const editedUser: User = {
    id: user.id,
    organization_id: user.organization_id,
    organization_name: user.organization_name,
    phone: user.phone,
    address: user.address,
    username: user.username,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    role: user.role,
  };

  return [200, editedUser];
});

mockAdapterUsers.onDelete(/\/api\/users\/\d+/).reply((config) => {
  const userId = Number(config?.url?.split("/").pop());
  return [204];
});

mockAdapterTasks
  .onGet("/api/tasks", { params: { organization_id: 24 } })
  .reply(200, {
    tasks: [
      {
        id: 11,
        task_organization_id: 24,
        name: "Building area",
        description: "Building area description something...",
        deadline: "25.06.2023",
        status: "Done",
        employee_assigned: [3],
      },
      {
        id: 12,
        task_organization_id: 24,
        name: "Project Management",
        description: "Project Management description something...",
        deadline: "30.06.2023",
        status: "In Progress",
        employee_assigned: [2, 3],
      },
      {
        id: 13,
        task_organization_id: 24,
        name: "Marketing Campaign",
        description: "Marketing Campaign description something...",
        deadline: "12.06.2023",
        status: "Pending",
        employee_assigned: [7, 9],
      },
      {
        id: 14,
        task_organization_id: 24,
        name: "Product Development",
        description: "Product Development description something...",
        deadline: "11.05.2023",
        status: "In Progress",
        employee_assigned: [6, 8],
      },
      {
        id: 5,
        task_organization_id: 24,
        name: "Sales Strategy",
        description: "Sales Strategy description something...",
        deadline: "2023-07-31",
        status: "Pending",
        employee_assigned: [8],
      },
      {
        id: 6,
        task_organization_id: 24,
        name: "Customer Support",
        description: "Customer Support description something...",
        deadline: "",
        status: "Done",
        employee_assigned: [3, 5, 9],
      },
      {
        id: 7,
        task_organization_id: 24,
        name: "Quality Assurance",
        description: "Quality Assurance description something...",
        deadline: "2023-08-15",
        status: "In Progress",
        employee_assigned: [9],
      },
      {
        id: 8,
        task_organization_id: 24,
        name: "Research and Development",
        description: "Research and Development description something...",
        deadline: "2023-09-30",
        status: "Pending",
        employee_assigned: [3],
      },
      {
        id: 9,
        task_organization_id: 24,
        name: "Financial Analysis",
        description: "Financial Analysis description something...",
        deadline: "2023-07-31",
        status: "In Progress",
        employee_assigned: [2, 3, 5, 7, 9],
      },
    ],
  });

mockAdapterTasks.onPost("/api/tasks").reply((config) => {
  const task = JSON.parse(config.data);
  const addedTask: Task = {
    id: Date.now(),
    task_organization_id: Date.now() * 2,
    name: task.name,
    description: task.description,
    deadline: task.deadline,
    status: task.status,
    employee_assigned: task.employee_assigned,
  };

  return [201, addedTask];
});

mockAdapterTasks.onDelete(/\/api\/tasks\/\d+/).reply((config) => {
  const taskId = Number(config?.url?.split("/").pop());
  return [204];
});
