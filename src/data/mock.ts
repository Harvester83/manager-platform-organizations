import axios from "axios";
import MockAdapter from "axios-mock-adapter";

export const apiLogin = axios.create();
export const apiUsers = axios.create();

const mockAdapterLogin = new MockAdapter(apiLogin);
const mockAdapterUsers = new MockAdapter(apiUsers);

mockAdapterLogin.onPost("/api/login").reply(200, {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
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

mockAdapterUsers.onGet("/users", { params: { organization_id: 24 } }).reply(200, {
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

