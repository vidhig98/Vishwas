import * as uuid from "uuid/v4";

export interface Employee {
  _id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  designation: string;
  gender: string;
  dob: Date;
  department: string;
  phone: string;
  work_email: string;
  personal_email: string;
  role?: string;
  organization?: string;
  tasks?: { assigned: []; completed: [] };
  createdAt?: Date;
  updatedAt?: Date;
}

export class Employee implements Employee {
  constructor(emp: {
    _id: string;
    first_name: string;
    last_name: string;
    designation: string;
    gender: string;
    dob: Date;
    department: string;
    phone: string;
    work_email: string;
    personal_email: string;
    role?: string;
    organization?: string;
    tasks?: { assigned: []; completed: [] };
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = emp._id;
    this.first_name = emp.first_name;
    this.last_name = emp.last_name;
    this.gender = emp.gender;
    this.dob = emp.dob;
    this.department = emp.department;
    this.designation = emp.designation;
    this.phone = emp.phone;
    this.work_email = emp.work_email;
    this.personal_email = emp.personal_email;
    this.avatar = `https://ui-avatars.com/api/?name=${emp.first_name}+${emp.last_name}&size=116&rounded=true`;
    this.role = emp.role;
    this.organization = emp.organization;
    this.tasks = emp.tasks;
    this.createdAt = emp.createdAt;
    this.updatedAt = emp.updatedAt;
  }
}
