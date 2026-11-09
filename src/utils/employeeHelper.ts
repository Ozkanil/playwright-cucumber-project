//Helper method for safely generating employee unique id. 
// First name and last name are hardcoded for simplicity. 
// In a real world scenario, these can be generated randomly as well if uniquness is needed.

export type EmployeeData = {
  firstName: string;
  lastName: string;
  employeeId: string;
};

export const generateEmployeeId = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateEmployeeData = (): EmployeeData => ({
  firstName: 'John',
  lastName: 'Doe',
  employeeId: generateEmployeeId(),
});
