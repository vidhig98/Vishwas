export interface Position {
  _id?: string;
  avatar?: string;
  profile: string;
  department: string;
  salary: number;
  qualification: string;
  experience: number;
  openings: number;
  posted_by?: string;
  createdAt?: Date;
  updatedAt: Date;
}

export class Position {
  constructor(position: {
    _id?: string;
    profile: string;
    department: string;
    salary: number;
    qualification: string;
    experience: number;
    openings: number;
    posted_by?: string;
    createdAt?: Date;
    updatedAt: Date;
  }) {
    this._id = position._id;
    this.profile = position.profile;
    this.department = position.department;
    this.salary = position.salary;
    this.qualification = position.qualification;
    this.experience = position.experience;
    this.openings = position.openings;
    this.posted_by = position.posted_by;
    this.createdAt = position.createdAt;
    this.updatedAt = position.updatedAt;
    this.avatar = `https://ui-avatars.com/api/?name=${position.profile}&size=116&rounded=true`;
  }
}
