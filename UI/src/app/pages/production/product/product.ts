export interface Position {
  _id?: string;
  avatar?: string;
  machine_no: string;
  customer: string;
  UIN: number;
  width: number;
  length: number;
  expected_rolls: number;
  actual_rolls: number;
  sq_mtr: number;
  posted_by?: string;
  createdAt?: Date;
  updatedAt: Date;
}

export class Position {
  constructor(position: {
    _id?: string;
    machine_no: string;
    customer: string;
    UIN: number;
    width: number;
    length: number;
    expected_rolls: number;
    actual_rolls: number;
    sq_mtr: number;
    posted_by?: string;
    createdAt?: Date;
    updatedAt: Date;
  }) {
    this._id = position._id;
    this.machine_no = position.machine_no;
    this.customer = position.customer;
    this.UIN = position.UIN;
    this.width = position.width;
    this.length = position.length;
    this.expected_rolls = position.expected_rolls;
    this.sq_mtr = position.sq_mtr;
    this.actual_rolls = position.actual_rolls;
    this.posted_by = position.posted_by;
    this.createdAt = position.createdAt;
    this.updatedAt = position.updatedAt;
    this.avatar = `https://ui-avatars.com/api/?name=${position.customer}&size=116&rounded=true`;
  }
}
