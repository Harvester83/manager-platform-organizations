export const data = {
  users: [
    {
      id: 1,
      organization_name: "Gas Company",
      phone: "+9289027",
      address: "Narimanov district",
      user_name: "Rashad",
      email: "rashad@gmail.com",
      password: "123456",
      employees: [
        {
          employee_id: 1,
          employee_name: "Tural",
          employee_surname: "Abbaslı",
          employee_email: "tural@gmail.com",
          employee_password: "123456",
          is_admin: true,
        },
        {
          employee_id: 2,
          employee_name: "Yalchin",
          employee_surname: "Zeynalov",
          employee_email: "yalchin@gmial.com",
          employee_password: "123456",
          is_admin: false,
        },
      ],
      tasks: [
        {
          task_id: 1,
          task_name: "Building area",
          task_description: "Building area description something...",
          task_start: "",
          task_end: "",
          task_status: "Done",
          task_employees: [
            {
              employee_id: 2,
              employee_name: "Yalchin",
              employee_surname: "Zeynalov",
              employee_email: "yalchin@gmial.com",
              employee_password: "123456",
              is_admin: false,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      organization_name: null,
      phone: "+9289027",
      address: "Narimanov district",
      user_name: "Tural",
      email: "tural@gmail.com",
      password: "123456",
      employees: null,
      tasks: [
        {
          task_id: 1,
          task_name: "Building area",
          task_description: "Building area description something...",
          task_start: "",
          task_end: "",
          task_status: "Done",
          task_employees: [
            {
              employee_id: 2,
              employee_name: "Yalchin",
              employee_surname: "Zeynalov",
              employee_email: "yalchin@gmial.com",
              employee_password: "123456",
              is_admin: false,
            },
          ],
        },
      ],
    },
  ],
};
