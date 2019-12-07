export interface Position {
  _id?: string;
  avatar?: string;
  item_name: string;
  party_name: string;
  UIN: number;
  width: number;
  length: number;
  GSM: number;
  sq_mtr: number;
  weight: number;
  impression: string;
  posted_by?: string;
  createdAt?: Date;
  updatedAt: Date;
}

export class Position {
  constructor(position: {
    _id?: string;
    item_name: string;
    party_name: string;
    UIN: number;
    width: number;
    length: number;
    GSM: number;
    sq_mtr: number;
    weight: number;
    impression: string;
    posted_by?: string;
    createdAt?: Date;
    updatedAt: Date;
  }) {
    this._id = position._id;
    this.item_name = position.item_name;
    this.party_name = position.party_name;
    this.UIN = position.UIN;
    this.width = position.width;
    this.length = position.length;
    this.GSM = position.GSM;
    this.sq_mtr = position.sq_mtr;
    this.weight = position.weight;
    this.impression = position.impression;
    this.posted_by = position.posted_by;
    this.createdAt = position.createdAt;
    this.updatedAt = position.updatedAt;
    this.avatar = `https://ui-avatars.com/api/?name=${position.item_name}&size=116&rounded=true`;
  }
}
