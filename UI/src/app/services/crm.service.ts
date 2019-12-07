import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Lead } from "../pages/crm/leads/lead/lead";
import { Customer } from "../pages/crm/customers/customer/customer";

@Injectable({
  providedIn: "root"
})
export class CrmService {
  constructor(private http: HttpClient) {}

  addLead(lead: any) {
    return this.http.post(`${environment.API_URL}/crm/leads`, lead);
  }

  getLeads() {
    return this.http.get(`${environment.API_URL}/crm/leads`).pipe(
      map((leads: any) => {
        return leads.map(lead => {
          return new Lead(lead);
        });
      })
    );
  }

  getLead(leadID: string) {
    return this.http.get(`${environment.API_URL}/crm/leads/${leadID}`);
  }

  updateLead(leadID: string, lead: Lead) {
    return this.http.put(`${environment.API_URL}/crm/leads/${leadID}`, lead);
  }

  getLeadComments(leadID: string) {
    return this.http.get(`${environment.API_URL}/crm/leads/${leadID}/comments`);
  }

  addLeadComment(leadID: string, text: string) {
    return this.http.post(
      `${environment.API_URL}/crm/leads/${leadID}/comments`,
      new HttpParams().set("text", text)
    );
  }

  editLeadComment(leadID: string, commentID: string, text: string) {
    return this.http.patch(
      `${environment.API_URL}/crm/leads/${leadID}/comments/${commentID}`,
      new HttpParams().set("text", text)
    );
  }

  removeLeadComment(leadID: string, commentID: string) {
    return this.http.delete(
      `${environment.API_URL}/crm/leads/${leadID}/comments/${commentID}`
    );
  }

  addCustomer(customer: any) {
    return this.http.post(`${environment.API_URL}/crm/customers`, customer);
  }

  getCustomers() {
    return this.http.get(`${environment.API_URL}/crm/customers`).pipe(
      map((customers: any) => {
        return customers.map(customer => {
          return new Customer(customer);
        });
      })
    );
  }

  getCustomer(customerID: string) {
    return this.http.get(`${environment.API_URL}/crm/customers/${customerID}`);
  }

  updateCustomer(customerID: string, customer: Customer) {
    return this.http.put(
      `${environment.API_URL}/crm/customers/${customerID}`,
      customer
    );
  }

  getCustomerComments(customerID: string) {
    return this.http.get(
      `${environment.API_URL}/crm/customers/${customerID}/comments`
    );
  }

  addCustomerComment(customerID: string, text: string) {
    return this.http.post(
      `${environment.API_URL}/crm/customers/${customerID}/comments`,
      new HttpParams().set("text", text)
    );
  }

  editCustomerComment(customerID: string, commentID: string, text: string) {
    return this.http.patch(
      `${environment.API_URL}/crm/customers/${customerID}/comments/${commentID}`,
      new HttpParams().set("text", text)
    );
  }

  removeCustomerComment(customerID: string, commentID: string) {
    return this.http.delete(
      `${environment.API_URL}/crm/customers/${customerID}/comments/${commentID}`
    );
  }
}
