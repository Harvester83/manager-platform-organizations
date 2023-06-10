export const mockUsers = [
  {
    id: 1,
    organization_id: 18,
    organization_name: "GasCompany",
    phone: "+709289028",
    address: "Narimanov district",
    username: "Jhon",
    email: "jhon@gmail.com",
    password: "123456",
    role: "user",
    lastName: "Surname1",
  },
  {
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
    id: 4,
    organization_id: 12,
    organization_name: "ConstructionCo",
    phone: "+707777777",
    address: "Industrial Zone",
    username: "Mike",
    email: "mike@gmail.com",
    password: "qwerty",
    role: "admin",
    lastName: "Surname4",
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
    organization_id: 10,
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
    id: 8,
    organization_id: 27,
    organization_name: "E-commerceCo",
    phone: "+708888888",
    address: "Online",
    username: "David",
    email: "david@gmail.com",
    password: "easypassword",
    role: "user",
    lastName: "Surname8",
  },
  {
    id: 9,
    organization_id: 3,
    organization_name: "HealthClinic",
    phone: "+706666666",
    address: "Medical Avenue",
    username: "Emily",
    email: "emily@gmail.com",
    password: "health123",
    role: "user",
    lastName: "Surname9",
  },
  {
    id: 10,
    organization_id: 20,
    organization_name: "EducationCenter",
    phone: "+711111111",
    address: "Learning Street",
    username: "Daniel",
    email: "daniel@gmail.com",
    password: "learn123",
    role: "admin",
    lastName: "Surname10",
  },
];

export const mockTasks = [
  {
    id: 11,
    task_organization_id: 23,
    name: "Building area",
    description: "Building area description something...",
    deadline: "25.06.2023",
    status: "Done",
    employee_assigned: [24],
  },
  {
    id: 12,
    task_organization_id: 24,
    name: "Project Management",
    description: "Project Management description something...",
    deadline: "30.06.2023",
    status: "In Progress",
    employee_assigned: [18, 24],
  },
  {
    id: 13,
    task_organization_id: 24,
    name: "Marketing Campaign",
    description: "Marketing Campaign description something...",
    deadline: "12.06.2023",
    status: "Pending",
    employee_assigned: [12, 18, 24],
  },
  {
    id: 14,
    task_organization_id: 24,
    name: "Product Development",
    description: "Product Development description something...",
    deadline: "11.05.2023",
    status: "In Progress",
    employee_assigned: [5, 24],
  },
  {
    id: 5,
    task_organization_id: 24,
    name: "Sales Strategy",
    description: "Sales Strategy description something...",
    deadline: "2023-07-31",
    status: "Pending",
    employee_assigned: [8, 18],
  },
  {
    id: 6,
    task_organization_id: 24,
    name: "Customer Support",
    description: "Customer Support description something...",
    deadline: "",
    status: "Done",
    employee_assigned: [3, 5, 24],
  },
  {
    id: 7,
    task_organization_id: 24,
    name: "Quality Assurance",
    description: "Quality Assurance description something...",
    deadline: "2023-08-15",
    status: "In Progress",
    employee_assigned: [10, 12, 24],
  },
  {
    id: 8,
    task_organization_id: 24,
    name: "Research and Development",
    description: "Research and Development description something...",
    deadline: "2023-09-30",
    status: "Pending",
    employee_assigned: [3, 10, 18],
  },
  {
    id: 9,
    task_organization_id: 24,
    name: "Financial Analysis",
    description: "Financial Analysis description something...",
    deadline: "2023-07-31",
    status: "In Progress",
    employee_assigned: [5, 10, 18, 24],
  },
  {
    id: 10,
    task_organization_id: 23,
    name: "Event Planning",
    description: "Event Planning description something...",
    deadline: "2023-08-15",
    status: "Pending",
    employee_assigned: [12, 18],
  },
];
