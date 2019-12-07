export interface Lead {
  _id?: string;
  company_name: string;
  contact_person: string;
  comments?: any[];
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

export class Lead {
  constructor(lead: {
    _id?: string;
    company_name: string;
    contact_person: string;
    comments?: any[];
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
    this._id = lead._id;
    this.company_name = lead.company_name;
    this.contact_person = lead.contact_person;
    this.comments = lead.comments;
    this.phone = lead.phone;
    this.email = lead.email;
    this.website = lead.website;
    this.source = lead.source;
    this.order = lead.order;
    this.added_by = lead.added_by;
    this.organization = lead.organization;
    this.createdAt = lead.createdAt;
    this.updatedAt = lead.updatedAt;
    this.avatar = `https://ui-avatars.com/api/?name=${this.company_name}&size=64&rounded=true`;
  }
}
