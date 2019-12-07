export interface Customer {
  _id?: string;
  company_name: string;
  contact_person: string;
  comments: any[];
  phone: number;
  email: string;
  website: string;
  source: string;
  order: string;
  avatar?: string;
  added_by?: string;
  organization?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Customer {
  constructor(customer: {
    _id?: string;
    company_name: string;
    contact_person: string;
    comments: any[];
    phone: number;
    email: string;
    website: string;
    source: string;
    order: string;
    avatar?: string;
    added_by?: string;
    organization?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = customer._id;
    this.company_name = customer.company_name;
    this.contact_person = customer.contact_person;
    this.comments = customer.comments;
    this.phone = customer.phone;
    this.email = customer.email;
    this.website = customer.website;
    this.source = customer.source;
    this.order = customer.order;
    this.added_by = customer.added_by;
    this.organization = customer.organization;
    this.createdAt = customer.createdAt;
    this.updatedAt = customer.updatedAt;
    this.avatar = `https://ui-avatars.com/api/?name=${this.contact_person}&size=64&rounded=true`;
  }
}
